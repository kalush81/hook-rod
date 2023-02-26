import React, { useState } from "react";
import styled from "styled-components";
import { Form, Select, DatePicker, Checkbox, Button } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";

// function getDates(startDate, stopDate) {
//   var dateArray = [];
//   var currentDate = moment(startDate, dateFormat);
//   var stopDate = moment(stopDate, dateFormat);
//   while (currentDate <= stopDate) {
//     dateArray.push(moment(currentDate, dateFormat).format(dateFormat));
//     currentDate = moment(currentDate, dateFormat).add(1, "days");
//   }
//   return dateArray;
// }

// const getAllDates = (reservations) => {
//   return reservations
//     .map((r) => {
//       return getDates(r.startDate, r.endDate);
//     })
//     .flat();
// };

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reservator = ({ pegs }) => {
  const [form] = Form.useForm();
  const [reservations, setReservations] = useState([]);
  const [isPegSelected, setIsPegSelected] = useState(false);
  const [selectedRange, setSelectedRange] = useState([]);

  const handleSelectChange = (pegId) => {
    if (pegId) {
      setReservations(() => {
        return pegs.find((peg) => peg.pegId === pegId).reservations;
      });
      setIsPegSelected(true);
    } else {
      setIsPegSelected(false);
      setReservations([]);
    }
  };
  const dateRanges = reservations.map((res) => {
    return {
      startDate: new Date(res.startDate),
      endDate: new Date(res.endDate),
    };
  });
  //console.log("date ranges on lake", dateRanges);
  // const onSelect = (value) => {
  //   const [start, end] = value || [];
  //   // If end date is not selected yet, return
  //   if (!end) {
  //     setSelectedRange(value);
  //     return;
  //   }

  //   let invalidSelection = false;
  //   // Check if end date is after any disabled date range
  //   for (let i = 0; i < dateRanges.length; i++) {
  //     const { startDate, endDate } = dateRanges[i];
  //     if (end > endDate) {
  //       invalidSelection = true;
  //       break;
  //     }
  //   }

  //   // Check if start date is inside a disabled range
  //   for (let i = 0; i < dateRanges.length; i++) {
  //     const { startDate, endDate } = dateRanges[i];
  //     if (start >= startDate && start <= endDate) {
  //       invalidSelection = true;
  //       break;
  //     }
  //   }

  //   if (invalidSelection) {
  //     setSelectedRange([]);
  //   } else {
  //     setSelectedRange(value);
  //   }
  //   console.log("onSelect in RangePicker", value);
  // };
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
  // const disabledDate = (current) => {
  //   const [startSelected, endSelected] = selectedRange;
  //   if (startSelected) {
  //     for (let i = 0; i < dateRanges.length; i++) {
  //       const { startDate } = dateRanges[i];
  //       if (startDate > startSelected && current > startDate) {
  //         return true;
  //       }
  //     }
  //   }
  //   if (endSelected && !startSelected) {
  //     for (let i = 0; i < dateRanges.length; i++) {
  //       const { endDate } = dateRanges[i];
  //       if (endDate < endSelected && current < endDate) {
  //         return true;
  //       }
  //     }
  //   }
  //   if (current < moment()) {
  //     return true;
  //   }
  //   for (let i = 0; i < dateRanges.length; i++) {
  //     const { startDate, endDate } = dateRanges[i];
  //     if (current >= startDate && current <= endDate) {
  //       return true;
  //     }
  //   }
  //   return false;
  // };

  const rangePickerOnChange = (moments, stringDates) => {
    //console.log("moments arr on onChange", moments);
    console.log("stringDates arr on onChange", stringDates);
    setSelectedRange(moments || []);
  };

  const onOpenChange = (open) => {
    console.log("opened picker open?", open);
    console.log("selectedRange", selectedRange);
    if ((open && selectedRange[1]) || (open && selectedRange[0])) {
      console.log("now you should clear inputs");
      setSelectedRange([]);
      const nameList = form.getFieldsValue();
      console.log("nameList", nameList);
      if (nameList.daty) {
        form.resetFields(["daty"]);
      }
    }
  };
  console.log("selected Range", selectedRange);
  const onChangeCheckBoxes = (checkedValues) => {
    console.log("checked = ", checkedValues);
    form.setFieldsValue("options", checkedValues);
  };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    console.log("form: ", form.getFieldsValue());
    form.resetFields(["daty", "options"]);
  };

  return (
    <Form form={form} name="register" onFinish={onFinish} scrollToFirstError>
      <CalendarCSS>
        <div className="container">
          <h1>Rezerwacja</h1>
          <h3>Cennik: 1 stanowisko / doba - 30zł</h3>
          <div className="row row1">
            <Form.Item
              name="stanowisko"
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
                onChange={handleSelectChange}
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
                // defaultValue={"1"}
                required
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
                disabled={!isPegSelected}
                className="rangepicker_row2"
                disabledDate={disabledDate}
                onCalendarChange={rangePickerOnChange}
                onOpenChange={onOpenChange}
              />
            </Form.Item>
          </div>
          <h2>Opcje dodatkowe</h2>
          <div className="options">
            <Form.Item name="options">
              <Checkbox.Group onChange={onChangeCheckBoxes}>
                <div className="options_row">
                  <Checkbox className="checkbox" value="opcja 1"></Checkbox>

                  <h3>Opcja 1</h3>
                </div>
                <div className="options_row">
                  <Checkbox className="checkbox" value="opcja 2"></Checkbox>

                  <h3>Opcja 2</h3>
                </div>
                <div className="options_row">
                  <Checkbox className="checkbox" value="opcja 3"></Checkbox>

                  <h3>Opcja 3</h3>
                </div>
                <div className="options_row">
                  <Checkbox className="checkbox" value="opcja 4"></Checkbox>

                  <h3>Opcja 4</h3>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <h2>Podsumowanie</h2>
          <h3>30zł x 10dni</h3>
          <div className="podsumowanie">
            <h3>2 stanowiska</h3>
            <h3>300zł x 2 = 600zł</h3>
            <h3>Ponton x 10 dni</h3>
            <h3>500zł</h3>
            <h2>Łącznie</h2>
            <h2>1100zł</h2>
          </div>
          <div className="checkbox checkbox_regulamin">
            <Form.Item name="checkbox_required">
              <Checkbox />
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
                onClick={console.log("form", form.getFieldError())}
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
