import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import { Form, Select, DatePicker, Checkbox, Button } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const { Option } = Select;

const Reservator = ({ pegs, pegBasePrice, facilities, lakeName }) => {
  const [form] = Form.useForm();
  const [reservations, setReservations] = useState([]);
  const [selectedPegId, setSelectedPegId] = useState(null);
  const [selectedRange, setSelectedRange] = useState([]);
  const [usersQuantity, setUsersQuantity] = useState(null);
  const [extraOptions, setExtraOptions] = useState([]);
  const [daysNumber, setDaysNumber] = useState(0);
  const [agreement, setAgreement] = useState(false);

  const calculateDays = (p1, p2) => {
    setDaysNumber(moment.duration(p2.diff(p1)).asDays());
  };

  useEffect(() => {
    //const values = form.getFieldsValue();
    if (selectedRange[0] && selectedRange[1]) {
      calculateDays(selectedRange[0], selectedRange[1]);
    }
  }, [form, selectedRange]);

  const handleSelectPegChange = (pegId) => {
    if (pegId) {
      setReservations(() => {
        return pegs.find((peg) => peg.pegId === pegId).reservations;
      });
      setSelectedPegId(pegId);
    } else {
      setSelectedPegId(null);
      setReservations([]);
    }
  };
  const handleSelectUserQuantity = (param) => {
    setUsersQuantity(param);
  };

  const dateRanges = reservations.map((res) => {
    return {
      startDate: new Date(res.startDate),
      endDate: new Date(res.endDate),
    };
  });

  const disabledDate = (current) => {
    const [startSelected, endSelected] = selectedRange;
    if (current < moment()) {
      return true;
    }
    for (let i = 0; i < dateRanges.length; i++) {
      const { startDate, endDate } = dateRanges[i];
      if (current >= startDate && current <= endDate) {
        return true;
      }
      if (startSelected && startDate > startSelected && current > startDate) {
        return true;
      }
      if (
        endSelected &&
        !startSelected &&
        endDate < endSelected &&
        current < endDate
      ) {
        return true;
      }
    }
    return false;
  };

  const rangePickerOnChange = (moments, _) => {
    setSelectedRange(moments || []);
  };

  const onOpenChange = (open) => {
    if ((open && selectedRange[1]) || (open && selectedRange[0])) {
      setSelectedRange([]);
      setDaysNumber(0);
      const nameList = form.getFieldsValue();
      if (nameList.daty) {
        setDaysNumber(0);
        form.resetFields(["daty"]);
      }
    }
  };

  const onChangeCheckBoxes = (checkedValues) => {
    setExtraOptions(checkedValues);
  };

  const onFinish = (formValues) => {
    console.log("values", formValues);
    let newReservationData = {
      ...formValues,
      lakeName,
      daysNumber,
      pegBasePrice,
    };
    console.log("newReservationData", newReservationData);
    navigate("/reservation-details", { state: { newReservationData } });
  };

  const getPegNumber = (pegId) => {
    let peg = pegs.find((peg) => peg.pegId === pegId);
    if (peg) {
      return peg.pegNumber;
    }
    return null;
  };

  const getTotalOfextras = () => {
    return (
      extraOptions.reduce((acc, curr) => {
        return acc + curr.basePrice;
      }, 0) * daysNumber
    );
  };

  const handleCheckboxChange = (e) => {
    setAgreement(e.target.checked);
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
                onChange={handleSelectPegChange}
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
              name="osoby"
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
                onChange={handleSelectUserQuantity}
              >
                <Option value="1">1 osoba</Option>
                <Option value="2">2 osoby</Option>
                <Option value="3">3 osoby</Option>
                <Option value="4">4 osoby</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="row row2">
            <Form.Item
              name="daty"
              rules={[
                {
                  required: true,
                  message: "Prosze podaj daty!",
                },
              ]}
            >
              <RangePicker
                initialValues={["", ""]}
                disabled={!selectedPegId}
                className="rangepicker_row2"
                disabledDate={disabledDate}
                onCalendarChange={rangePickerOnChange}
                onOpenChange={onOpenChange}
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
            <h3>
              stanowisko nr {selectedPegId && getPegNumber(selectedPegId)}
            </h3>
            <h3>
              {usersQuantity && pegBasePrice * usersQuantity * daysNumber} zł
            </h3>
            {extraOptions.map((extra) => {
              return (
                <>
                  <h3 style={{ display: "block" }}>
                    {extra.name} x {daysNumber} dni
                  </h3>
                  <h3>{extra.basePrice * daysNumber} zł</h3>
                </>
              );
            })}

            <h2>Łącznie</h2>
            <h2>
              łączna suma:{" "}
              {pegBasePrice * usersQuantity * daysNumber + getTotalOfextras()}
            </h2>
          </div>
          <div className="checkbox checkbox_regulamin">
            <Form.Item
              label=""
              name="agreement"
              valuePropName="checked"
              rules={[{ required: true, message: "Please agree to the terms" }]}
            >
              <Checkbox
                checked={agreement}
                onChange={handleCheckboxChange}
              ></Checkbox>
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
                disabled={!agreement}
                onClick={() => {
                  console.log("form", form.getFieldsError());
                  console.log(form.getFieldsValue("agreement").agreement);
                }}
              >
                PRZEJDŹ DO PŁATNOŚCI
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
