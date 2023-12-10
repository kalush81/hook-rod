import React, { useState, useEffect, useRef, useCallback } from 'react';
import { navigate } from 'gatsby';
import styled from 'styled-components';
import { Form, Select, Button } from 'antd';
import { calculateDays } from '../utils/calculate-days';
import { getTotalOfextras } from '../utils/get-total-of-extras';

import dayjs from 'dayjs';
import 'dayjs/locale/pl';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import objectSupport from 'dayjs/plugin/objectSupport';
import { ExtraServicesAvailable } from './ExtraServicesAvailable';
import { PaymenthMethod } from './PaymenthMethod';
import { SummaryShort } from './SummaryShort';
import { MyDatePicker } from './MyDatePicker';

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
const servicesReservationsDATA = [
  {
    id: '0ba27951-bdfe-4b7c-a966-148f667ff82d',
    reservations: [
      {
        endDate: '2023-11-03T11:59:00',
        startDate: '2023-11-02T12:00:00',
      },
      {
        endDate: '2023-11-06T11:59:00',
        startDate: '2023-11-04T12:00:00',
      },
    ],
  },
  {
    id: '26099044-21a0-4b94-abc4-897067e3bdb9',
    reservations: [
      {
        endDate: '2023-11-03T11:59:00',
        startDate: '2023-11-02T12:00:00',
      },
      {
        endDate: '2023-11-09T11:59:00',
        startDate: '2023-11-08T12:00:00',
      },
    ],
  },
];

const getAvailableServices = (
  existedReservations,
  [
    startDateRequest = dayjs(startDateRequest).set(noon),
    endDateRequest = dayjs(endDateRequest).set(beforeNoon),
  ]
) => {
  return existedReservations.extraServiceReservationsDto
    ?.filter((data) => {
      if (
        dayjs(data.endDate).isBetween(
          startDateRequest,
          endDateRequest,
          null,
          '[]'
        ) ||
        dayjs(data.startDate).isBetween(
          startDateRequest,
          endDateRequest,
          null,
          '[]'
        )
      ) {
        return false;
      } else {
        return true;
      }
    })
    .map((service) => service.id);
};

const Reservator = ({
  pegs,
  pegBasePrice,
  extraServices,
  lakeName,
  currentPath,
  servicesReservationsDATA,
}) => {
  console.log('extraServices', extraServices);
  const startDateInputRef = useRef(null);
  const [availableServices, setAvailableServices] = useState(extraServices);
  const [form] = Form.useForm();
  const [reservations, setReservations] = useState([]);
  const [pegId, setPegId] = useState(null);
  const [range, setRange] = useState([]);
  const [numGuests, setNumGuests] = useState(0);
  const [extraOptions, setExtraOptions] = useState([]);
  const [numDays, setNumDays] = useState(0);

  console.log('servicesReservationsDATA', servicesReservationsDATA);
  console.log('availableServices', availableServices);

  // useEffect(() => {
  //   console.log('requested range changed');
  //   // if (range[0] && range[1]) {
  //   //   calculateDays(setNumDays, range[0], range[1]);
  //   //   console.log(
  //   //     'id available services list',
  //   //     getAvailableServices(servicesReservationsDATA, range)
  //   //   );
  //   // }
  // }, [range[0], range[1]]);

  //on finish doesn't cause rerender
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

  //handleASetNumGuests cause rerender
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
      console.log('teraz implementuj wyciaganie dostepnych serwisów');
    }
  };

  const disableDate = (current) => {
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
            <Form.Item
              name='pegId'
              rules={[
                {
                  required: true,
                  message: 'wybierz stanowisko',
                },
              ]}>
              <Select
                loading={!pegs.length}
                allowClear
                className='select_row1'
                size='medium'
                placeholder='wybierz stanowisko'
                showAction='focus'
                onChange={handleSelectPeg}>
                {pegs.length &&
                  pegs.map((peg) => {
                    return (
                      <Option key={peg.pegId} value={peg.pegId}>
                        {peg.pegName}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name='numGuests'
              rules={[
                {
                  required: true,
                  message: 'Prosze podaj ilość osób!',
                },
              ]}>
              <Select
                allowClear
                className='select_row1'
                size='medium'
                placeholder='Osoby'
                showAction='focus'
                onChange={handleSetNumGuests}>
                <Option value={1}>1 osoba</Option>
                <Option value={2}>2 osoby</Option>
                <Option value={3}>3 osoby</Option>
                <Option value={4}>4 osoby</Option>
              </Select>
            </Form.Item>
          </div>
          <MyDatePicker
            // startDateInputRef={startDateInputRef}
            pegId={pegId}
            disableDate={disableDate}
            // handleRangeChange={handleRangeChange}
            // onOpenChange={onOpenChange}
            // handleRangePickerFocus={handleRangePickerFocus}
          />
          <ExtraServicesAvailable
            availableServices={availableServices}
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

          <div className='button_container'>
            <Form.Item>
              <Button
                className='button'
                size='large'
                type='primary'
                htmlType='submit'
                onClick={() => {}}>
                DODAJ DO KOSZYKA
              </Button>
            </Form.Item>
          </div>
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
