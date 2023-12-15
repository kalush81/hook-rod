import React, { useState, useEffect, useRef } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Form, Select } from 'antd';

import { calculateDays } from '../../utils/calculate-days';
import { getTotalOfextras } from '../../utils/get-total-of-extras';

import dayjs from 'dayjs';
import 'dayjs/locale/pl';

import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from 'dayjs/plugin/objectSupport';

import { ExtraServicesAvailable } from './ExtraServicesAvailable';
import { PaymenthMethod } from './PaymenthMethod';
import { SummaryShort } from './SummaryShort';
import { MyDatePicker } from './MyDatePicker';
import { NumberGuestSelector } from './NumberGuestSelector';
import { PegSelector } from './PegSelector';
import { SubmitReservationButton } from './SubmitReservationButton';

const { Option } = Select;

dayjs.extend(objectSupport);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

dayjs().format('YYYY-MM-DDTHH-mm-ss');

const noon = {
  hour: 12,
  minute: 0,
  second: 0,
};
const beforeNoon = {
  hour: 11,
  minute: 59,
  second: 0,
};
const servicesReservationsDATAMOCK = [
  {
    extraServiceId: '0ba27951-bdfe-4b7c-a966-148f667ff82d',
    extraServiceReservationDto: [
      {
        endDate: '2023-12-15T11:59:00',
        startDate: '2023-12-14T12:00:00',
      },
      {
        endDate: '2023-12-19T11:59:00',
        startDate: '2023-12-16T12:00:00',
      },
    ],
  },
  {
    extraServiceId: '26099044-21a0-4b94-abc4-897067e3bdb9',
    extraServiceReservationDto: [
      {
        endDate: '2023-12-22T11:59:00',
        startDate: '2023-12-21T12:00:00',
      },
      {
        endDate: '2023-12-29T11:59:00',
        startDate: '2023-12-27T12:00:00',
      },
    ],
  },
];

const getUnavailableServices = (existed, requested) => {
  //todo, loop theough objects in "existed" array. If requested dates are within
  //current object's extraServicesReservationsDto, then return extraServiceID of that object. Use redux.
  return [
    ...new Set(
      existed.reduce((acc, curr) => {
        curr.extraServiceReservationDto.map((currentReservation) => {
          if (
            dayjs(currentReservation.endDate).isBetween(
              requested.startDate,
              requested.endDate,
              null,
              '[]'
            ) ||
            dayjs(currentReservation.startDate).isBetween(
              requested.startDate,
              requested.endDate,
              null,
              '[]'
            )
          ) {
            acc.push(curr.extraServiceId);
          }
        });
        //console.log('reduce acc: ', acc);
        return acc;
      }, [])
    ),
  ];
};

const Reservator = ({
  pegs,
  pegBasePrice,
  extraServices,
  lakeName,
  currentPath,
  servicesReservationsDATA,
}) => {
  //console.log('extraServices', extraServices);
  //console.log('servicesReservationsDATA', servicesReservationsDATA);

  const startDateInputRef = useRef(null);
  const [availableServices, setAvailableServices] = useState(extraServices);
  const [unavailableServices, setUnavailableServices] = useState([]);
  const [form] = Form.useForm();
  const [reservations, setReservations] = useState([]);
  const [pegId, setPegId] = useState(null);
  const [range, setRange] = useState([]);
  const [numGuests, setNumGuests] = useState(0);
  const [extraOptions, setExtraOptions] = useState([]);
  const [numDays, setNumDays] = useState(0);

  //console.log('servicesReservationsDATA', servicesReservationsDATA);
  //console.log('availableServices', availableServices);

  useEffect(() => {
    //console.log('requested range changed');
    if (range[0] && range[1]) {
      calculateDays(setNumDays, range[0], range[1]);
    } else {
      setUnavailableServices([]);
    }
  }, [range[0], range[1]]);

  const onFinish = (formValues) => {
    let newReservationData = {
      ...formValues,
      lakeName,
      numDays,
      pegBasePrice,
      currentPath,
      totalPrice:
        pegBasePrice * numGuests * numDays +
        getTotalOfextras(extraOptions, numDays),
    };

    navigate('/reservation-details', { state: { newReservationData } });
  };

  const handleSetNumGuests = (num) => {
    setNumGuests(parseInt(num));
  };

  const handleSelectPeg = (pegId) => {
    if (pegId) {
      setReservations(() => {
        let foundPeg = pegs.find((peg) => peg.pegId === pegId);
        return foundPeg.reservations.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
      });
      setPegId(pegId);
    } else {
      setPegId(null);
      setReservations([]);
    }
  };

  const handleRangeChange = (_, stringDates) => {
    setRange(stringDates || []);
    if (stringDates[0] && !stringDates[1]) {
      let closestReservation = reservations.find(
        (reservation) => reservation.startDate > stringDates[0]
      );
      if (closestReservation) {
        setReservations([closestReservation]);
      } else {
        setReservations([]);
      }
    }
    if (stringDates[0] && stringDates[1]) {
      setUnavailableServices(
        getUnavailableServices(servicesReservationsDATAMOCK, {
          startDate: dayjs(stringDates[0]).set(noon),
          endDate: dayjs(stringDates[1]).set(beforeNoon),
        })
      );
    }
  };

  const disableDate = (current) => {
    //console.log('disabled date fun was defined');
    const now = dayjs();
    if (range[0] && !range[1] && reservations.length === 1) {
      const reservedEnd = dayjs(reservations[0].startDate).add(1, 'day');
      return current.set(noon) > reservedEnd || current < dayjs(range[0]);
    } else {
      for (const { startDate, endDate } of reservations || []) {
        const reservedStart = dayjs(startDate);
        const reservedEnd = dayjs(endDate);
        if (
          current.set(noon).isBetween(reservedStart, reservedEnd, null, '[]')
        ) {
          return true;
        }
      }
      return current.set(noon).diff(now) < 0;
    }
  };

  const onOpenChange = (open) => {
    if ((open && range[0]) || (open && range[1])) {
      setReservations(() => {
        return pegs.find((peg) => peg.pegId === pegId).reservations;
      });
      form.resetFields(['dates']);
      setRange([]);
      setUnavailableServices([]);
      setNumDays(0);
    } else {
      setReservations(() => {
        return pegs.find((peg) => peg.pegId === pegId)?.reservations;
      });
    }
  };

  const handleRangePickerFocus = (e) => {
    if (e.target.placeholder === 'Data końcowa') {
      if (!range[0]) {
        startDateInputRef.current.focus();
      }
    }
  };

  const onChangeCheckBoxes = (checkedValues) => {
    setExtraOptions(checkedValues);
  };

  const getPegNumber = (pegId) => {
    let peg = pegs.find((peg) => peg.pegId === pegId);
    if (peg) {
      return peg.pegNumber;
    }
    return null;
  };

  return (
    <Form form={form} name='register' onFinish={onFinish} scrollToFirstError>
      <CalendarCSS>
        <div className='container'>
          <h3>Cennik: 1 stanowisko / doba od {pegBasePrice} zł</h3>

          <div className='row row1'>
            <PegSelector pegs={pegs} handleSelectPeg={handleSelectPeg} />
            <NumberGuestSelector handleSetNumGuests={handleSetNumGuests} />
          </div>

          <MyDatePicker
            // startDateInputRef={startDateInputRef}
            pegId={pegId}
            disableDate={disableDate}
            handleRangeChange={handleRangeChange}
            onOpenChange={onOpenChange}
            handleRangePickerFocus={handleRangePickerFocus}
          />
          <ExtraServicesAvailable
            availableServices={availableServices}
            unavailableServices={unavailableServices}
            onChangeCheckBoxes={onChangeCheckBoxes}
          />
          <SummaryShort
            pegId={pegId}
            extraOptions={extraOptions}
            numDays={numDays}
            numGuests={numGuests}
            pegBasePrice={pegBasePrice}
            getPegNumber={getPegNumber}
          />
          <PaymenthMethod />
          <SubmitReservationButton />
        </div>
      </CalendarCSS>
    </Form>
  );
};

const CalendarCSS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 18px;

  &.popupPicker {
    &:where(.css-dev-only-do-not-override-1km3mtt).ant-picker-dropdown
      .ant-picker-panel-container
      .ant-picker-panels {
      flex-direction: column !important;
      @media (min-width: 567px) {
        flex-direction: row;
      }
    }
  }
  .container {
    width: 100%;
    background-color: rgba(237, 237, 237);
    box-shadow: 1px 2px 9px rgb(0 0 0 / 40%);
    border-radius: 19px;
    padding: 22px;
    max-width: 300px;
    h1 {
      font-weight: 200;
      letter-spacing: 0.9;
    }
  }

  h2 {
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
  h3 {
    font-size: 12px;
    margin-bottom: 0;
  }
  p {
    font-size: 10px;
  }
  .row {
    margin-top: 5px;
  }
  .row1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .select_row1 {
    width: 100%;
  }
  .row2 {
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(0, 0, 0, 0.3);
  }
  .rangepicker_row2 {
    width: 100%;
  }
  .options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .options_row {
    display: flex;
    align-items: center;
    padding: 1rem 0;
  }
  .ant-form-item {
    margin-bottom: 0px !important;
  }

  .ant-checkbox-wrapper {
    margin-left: 0 !important;
    margin-right: 5px;
  }
  .options_row,
  .checkbox_regulamin {
    display: flex;
  }
  .podsumowanie {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .button_container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    margin-top: 10px;
  }
  .button {
    border-radius: 100px;
    background-color: var(--yellow);
    span {
      font-size: 15px;
      font-weight: 500;
      color: white;
    }
  }
`;

export default Reservator;
