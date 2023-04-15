import React, { useState, useEffect, useRef } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { Form, Select, DatePicker, Checkbox, Button } from "antd";

import dayjs from "dayjs";
import "dayjs/locale/pl";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import objectSupport from "dayjs/plugin/objectSupport";

const { RangePicker } = DatePicker;
const { Option } = Select;

dayjs.extend(objectSupport);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);

dayjs().format("YYYY-MM-DDTHH-mm-ss");

const noon = {
  hour: 12,
  minute: 0,
  second: 0,
};

const getTotalOfextras = (extraOptions, numDays) => {
  return (
    extraOptions.reduce((acc, curr) => {
      return acc + curr.basePrice;
    }, 0) * numDays
  );
};

const Reservator = ({ pegs, pegBasePrice, facilities, lakeName }) => {
  const startDateInputRef = useRef(null);
  const agreementRef = useRef(null);
  const [form] = Form.useForm();

  const [reservations, setReservations] = useState([]);
  const [pegId, setPegId] = useState(null);
  const [range, setRange] = useState([]);
  const [numGuests, setNumGuests] = useState(0);
  const [extraOptions, setExtraOptions] = useState([]);
  const [numDays, setNumDays] = useState(0);

  const calculateDays = (p1, p2) => {
    const start = dayjs(p1);
    const end = dayjs(p2);
    const numDays = end.diff(start, "day");
    setNumDays(numDays);
  };

  useEffect(() => {
    if (range[0] && range[1]) {
      calculateDays(range[0], range[1]);
    }
  }, [form, range]);

  const onFinish = (formValues) => {
    console.log("form reservation values", formValues);
    let newReservationData = {
      ...formValues,
      lakeName,
      numDays,
      pegBasePrice,
      totalPrice:
        pegBasePrice * numGuests * numDays +
        getTotalOfextras(extraOptions, numDays),
    };
    console.log("newReservationData", newReservationData);
    navigate("/reservation-details", { state: { newReservationData } });
  };

  const handleSetNumGuests = (num) => {
    setNumGuests(parseInt(num));
  };

  const handleSelectPeg = (pegId) => {
    if (pegId) {
      setReservations(() => {
        return pegs.find((peg) => peg.pegId === pegId).reservations;
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
      }
    }
  };

  function disableDate(current) {
    const now = dayjs();
    if (range[0] && !range[1] && reservations.length === 1) {
      const reservedEnd = dayjs(reservations[0].startDate).add(1, "day");
      return current.set(noon) > reservedEnd || current < dayjs(range[0]);
    } else {
      for (const { startDate, endDate } of reservations) {
        const reservedStart = dayjs(startDate);
        const reservedEnd = dayjs(endDate);
        if (
          current.set(noon).isBetween(reservedStart, reservedEnd, null, "[]")
        ) {
          return true;
        }
      }
      return current.set(noon).diff(now) < 0;
    }
  }

  const onOpenChange = (open) => {
    if (open && range[0] && open && range[1]) {
      setReservations(() => {
        return pegs.find((peg) => peg.pegId === pegId).reservations;
      });
      form.resetFields(["dates"]);
      setRange([]);
      setNumDays(0);
    }
  };

  const handleRangePickerFocus = (e) => {
    if (e.target.placeholder === "Data końcowa") {
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
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <CalendarCSS>
        <div className="container">
          <h1>Rezerwacja</h1>
          <h3>Cennik: 1 stanowisko / doba - {pegBasePrice}</h3>
          <div className="row row1">
            <Form.Item
              name="pegId"
              rules={[
                {
                  required: true,
                  message: "wybierz stanowisko",
                },
              ]}
            >
              <Select
                allowClear
                showArrow="true"
                className="select_row1"
                size="medium"
                placeholder="wybierz stanowisko"
                showAction="focus"
                onChange={handleSelectPeg}
              >
                {pegs.map((peg) => {
                  return (
                    <Option key={peg.pegId} value={peg.pegId}>
                      {peg.pegName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="numGuests"
              rules={[
                {
                  required: true,
                  message: "Prosze podaj ilość osób!",
                },
              ]}
            >
              <Select
                allowClear
                showArrow="true"
                className="select_row1"
                size="medium"
                placeholder="Osoby"
                showAction="focus"
                onChange={handleSetNumGuests}
              >
                <Option value={1}>1 osoba</Option>
                <Option value={2}>2 osoby</Option>
                <Option value={3}>3 osoby</Option>
                <Option value={4}>4 osoby</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="row row2">
            <Form.Item
              name="dates"
              rules={[
                {
                  required: true,
                  message: "Prosze podaj daty!",
                },
              ]}
            >
              <RangePicker
                ref={startDateInputRef}
                disabledDate={disableDate}
                onCalendarChange={handleRangeChange}
                onOpenChange={onOpenChange}
                onFocus={handleRangePickerFocus}
                allowClear={false}
              />
            </Form.Item>
          </div>
          {facilities.length > 0 && (
            <>
              <h2>Opcje dodatkowe</h2>
              <div className="options">
                <Form.Item name="options">
                  <Checkbox.Group
                    style={{ display: "block" }}
                    onChange={onChangeCheckBoxes}
                  >
                    {facilities.map((f) => {
                      return (
                        <div key={f.name} className="options_row">
                          <Checkbox className="checkbox" value={f}></Checkbox>
                          <h3 style={{ margin: 0 }}>
                            {f.name} {f.basePrice}zł/doba
                          </h3>
                        </div>
                      );
                    })}
                  </Checkbox.Group>
                </Form.Item>
              </div>
            </>
          )}

          <h2>Podsumowanie</h2>
          <div className="podsumowanie">
            <h3>stanowisko nr {pegId && getPegNumber(pegId)}</h3>
            <h3>{numGuests && pegBasePrice * numGuests * numDays} zł</h3>
            {extraOptions.map((extra) => {
              return (
                <>
                  <h3 style={{ display: "block" }}>
                    {extra.name} x {numDays} dni
                  </h3>
                  <h3>{extra.basePrice * numDays} zł</h3>
                </>
              );
            })}

            <h2>Łącznie</h2>
            <h2>
              łączna suma:{" "}
              {pegBasePrice * numGuests * numDays +
                getTotalOfextras(extraOptions, numDays)}
            </h2>
          </div>
          <div className="checkbox checkbox_regulamin">
            <Form.Item
              label=""
              name="agreement"
              valuePropName="checked"
              rules={[{ required: true, message: "Please agree to the terms" }]}
            >
              <Checkbox ref={agreementRef}></Checkbox>
            </Form.Item>
            <p>
              Oświadczam, że zapoznałem/am się z Regulaminem Łowiska i akceptuję
              wszystkie zawarte w nim warunki.*
            </p>
          </div>
          <div className="button_container">
            <Form.Item>
              <Button
                className="button"
                size="large"
                type="primary"
                htmlType="submit"
                // disabled={!agreement}
                onClick={() => {
                  //console.log("form", form.getFieldsError());
                  //console.log(form.getFieldsValue("agreement").agreement);
                }}
              >
                PRZEJDŹ DO PODSUMOWANIA
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
