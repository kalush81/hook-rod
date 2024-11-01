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
        endDate: '2024-12-15T11:59:00',
        startDate: '2024-12-14T12:00:00',
      },
      {
        endDate: '2024-12-19T11:59:00',
        startDate: '2024-12-16T12:00:00',
      },
    ],
  },
  {
    extraServiceId: '26099044-21a0-4b94-abc4-897067e3bdb9',
    extraServiceReservationDto: [
      {
        endDate: '2024-12-22T11:59:00',
        startDate: '2024-12-21T12:00:00',
      },
      {
        endDate: '2024-12-29T11:59:00',
        startDate: '2024-12-27T12:00:00',
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
//const checkins = [1, 4, 6]; // Dni dostępne do zameldowania (poniedziałek, czwartek, sobota)
//const checkouts = [2, 5, 0];
const Reservator = ({
  pegs,
  pegBasePrice,
  extraServices,
  lakeName,
  currentPath,
  servicesReservationsDATA,
  rules,
}) => {
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
  const [selectedRange, setSelectedRange] = useState(null);
  const [isStartDateSelected, setIsStartDateSelected] = useState(false);
  const [dates, setDates] = useState([]);

  const startInputRef = useRef(null);
  const endInputRef = useRef(null);

  const checkins = [];
  const checkouts = [];

  useEffect(() => {
    console.log('selected range', selectedRange);
    if (dates[0] && dates[1]) {
      calculateDays(setNumDays, dates[0], dates[1]);
    } else {
      setUnavailableServices([]);
    }
  }, [dates[0], dates[1]]);

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
    console.log('stringDates', stringDates);
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
    //if (!current) return false; // Zapobiega problemom, jeśli current będzie undefined
    const day = current.day();
    const now = dayjs();
    // Jeśli nie wybrano jeszcze żadnej daty, blokuj wszystkie dni poza checkins
    if (!selectedRange || !selectedRange[0]) {
      return !checkins.includes(day) || current.set(noon).diff(now) < 0; //+ dzien ktory nie jest pomiedzy startdate i enddate
    }

    // Jeśli wybrano datę, blokuj wszystkie dni poza checkouts
    return !checkouts.includes(day) || current.set(noon).diff(now) < 0;
    //console.log('select date, range:', range);
    // const day = current.day();
    // // Blokowanie wszystkich dni oprócz poniedziałków, czwartków i sobót
    // if (![1, 4, 6].includes(day)) {
    //   return true;
    // }
    // if (range[0] && !range[1]) {
    //   return [2, 5, 0].includes(day);
    // }
    // Sprawdzanie warunków dla jednej rezerwacji
    // if (range[0] && !range[1] && reservations.length === 1) {
    //   console.log(
    //     'powinnismy pozostawic odblokownane dni z tablicy rangeEndDay'
    //   );
    //   const reservedEnd = dayjs(reservations[0].startDate).add(1, 'day');
    //   return current.set(noon) > reservedEnd || current < dayjs(range[0]);
    // }
    // // Sprawdzanie, czy data znajduje się w zakresie istniejących rezerwacji
    // for (const { startDate, endDate } of reservations || []) {
    //   const reservedStart = dayjs(startDate);
    //   const reservedEnd = dayjs(endDate);
    //   if (current.set(noon).isBetween(reservedStart, reservedEnd, null, '[]')) {
    //     return true;
    //   }
    // }
    // Blokowanie dat wcześniejszych niż teraz
    //return current.set(noon).diff(now) < 0;
  };

  // const disableDate = (current) => {
  //   const now = dayjs();
  //   if (
  //     dayjs(current).day() !== 4 &&
  //     dayjs(current).day() !== 1 &&
  //     dayjs(current).day() !== 6
  //   ) {
  //     return true;
  //   } else {
  //     if (range[0] && !range[1] && reservations.length === 1) {
  //       const reservedEnd = dayjs(reservations[0].startDate).add(1, 'day');
  //       return current.set(noon) > reservedEnd || current < dayjs(range[0]);
  //     } else {
  //       for (const { startDate, endDate } of reservations || []) {
  //         const reservedStart = dayjs(startDate);
  //         const reservedEnd = dayjs(endDate);
  //         if (
  //           current.set(noon).isBetween(reservedStart, reservedEnd, null, '[]')
  //         ) {
  //           return true;
  //         }
  //       }
  //       return current.set(noon).diff(now) < 0;
  //     }
  //   }
  // };

  const onOpenChange = (open) => {
    // if ((open && range[0]) || (open && range[1])) {
    //   setReservations(() => {
    //     return pegs.find((peg) => peg.pegId === pegId).reservations;
    //   });
    //   form.resetFields(['dates']);
    //   setRange([]);
    //   setUnavailableServices([]);
    //   setNumDays(0);
    // } else {
    //   setReservations(() => {
    //     return pegs.find((peg) => peg.pegId === pegId)?.reservations;
    //   });
    // }
  };

  // const handleFocus = (e, { range }) => {
  //   console.log('handle Focus worked');
  // };

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

  const handleCalendarChange = (dates, dateStrings, info) => {
    //setIsStartDateSelected(true);
    //console.log('dates', dates);
    setDates(dates);
  };
  // const handleBlur = (e, { range }) => {
  //   console.log('on blur worked ', range);
  // };

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
            pegId={pegId}
            //disableDate={disableDate}
            //onOpenChange={onOpenChange}
            //handleFocus={handleFocus}
            onCalendarChange={handleCalendarChange}
            isStartDateSelected={isStartDateSelected}
            value={dates}
            //handleBlur={handleBlur}
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
