import React, { useState } from "react";
import styled from "styled-components";
import { Form, Select, DatePicker, Checkbox, Button } from "antd";
import "antd/dist/antd.css";
import moment from "moment";

const dateFormat = "YYYY-MM-DD";

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate, dateFormat);
  var stopDate = moment(stopDate, dateFormat);
  while (currentDate <= stopDate) {
    dateArray.push(moment(currentDate, dateFormat).format(dateFormat));
    currentDate = moment(currentDate, dateFormat).add(1, "days");
  }
  return dateArray;
}

const getAllDates = (reservations) => {
  return reservations
    .map((r) => {
      return getDates(r.startDay, r.endDay);
    })
    .flat();
};

const { RangePicker } = DatePicker;
const { Option } = Select;

const Reservation = ({ pegs }) => {
  const [form] = Form.useForm();
  const [selectedRange, setSelectedRange] = useState([]);
  //const [pegId, setPegId] = useState(null);
  const [pegReservs, setPegReservs] = useState([]);
  // const [dates, setDates] = useState(null);
  // const [hackValue, setHackValue] = useState(null);
  // const [value, setValue] = useState(null);

  const handleSelectChange = (pegId) => {
    console.log("pegId", pegId);
    setPegReservs(() => {
      return pegs.find((peg) => peg.id === pegId);
    });
    //setPegId(id);
  };

  const dateRanges = [
    { startDate: new Date("2023-02-10"), endDate: new Date("2023-02-12") },
    { startDate: new Date("2023-02-14"), endDate: new Date("2023-02-15") },
  ];
  const ranges = pegReservs?.map((res) => {
    console.log("reservations by peg id", pegReservs);
    return {
      startDate: new Date(res.startDate),
      endDate: new Date(res.endDate),
    };
  });

  const disabledDate = (current) => {
    for (let i = 0; i < ranges.length; i++) {
      const { startDate, endDate } = ranges[i];
      if (current >= startDate && current <= endDate) {
        return true;
      }
    }
    return false;
  };
  const onSelect = (value) => {
    const [start, end] = value;
    for (let i = 0; i < dateRanges.length; i++) {
      const { startDate, endDate } = dateRanges[i];
      if (
        (start >= startDate && start <= endDate) ||
        (end >= startDate && end <= endDate)
      ) {
        return;
      }
    }
    setSelectedRange(value);
  };
  // const disabledDate = (current) => {
  //   const pegById = pegs.find((peg) => peg.id === pegId);
  //   const reservedDates = getAllDates(pegById.reservation);
  //   return !!reservedDates.find(
  //     (date) =>
  //       moment(current).format(dateFormat) ===
  //       moment(date, dateFormat).format(dateFormat)
  //   );
  // };

  // const onOpenChange = (open) => {
  //   if (open) {
  //     setHackValue([null, null]);
  //     setDates([null, null]);
  //   } else {
  //     setHackValue(null);
  //   }
  // };

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
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
                  message: "Please input your peg name!",
                },
              ]}
            >
              <Select
                allowClear
                showArrow="true"
                className="select_row1"
                size="medium"
                placeholder="Stanowisko"
                showAction="focus"
                onChange={handleSelectChange}
              >
                {pegs &&
                  pegs.map((peg) => {
                    return <Option value={peg.id}>{peg.pegName}</Option>;
                  })}
              </Select>
            </Form.Item>
            <Form.Item name="osoby">
              <Select
                allowClear
                showArrow="true"
                className="select_row1"
                size="medium"
                placeholder="Osoby"
                showAction="focus"
              >
                <Option value="1">1 osoba</Option>
                <Option value="2">2 osoby</Option>
                <Option value="3">3 osoby</Option>
                <Option value="4">4 osoby</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="row row2">
            {/* <Form.Item name="daty"> */}
            <RangePicker
              // disabled={!pegId && true}
              className="rangepicker_row2"
              //value={hackValue || value}
              disabledDate={disabledDate}
              onSelect={onSelect}
              //onCalendarChange={(val) => setDates(val)}
              //onChange={(val) => setValue(val)}
              //onOpenChange={onOpenChange}
            />
            {/* </Form.Item> */}
          </div>
          <h2>Opcje dodatkowe</h2>
          <div className="options">
            <div className="options_row">
              <Form.Item name="option1">
                <Checkbox className="checkbox"></Checkbox>
              </Form.Item>
              <h3>Opcja 1</h3>
            </div>
            <div className="options_row">
              <Form.Item name="option2">
                <Checkbox className="checkbox"></Checkbox>
              </Form.Item>
              <h3>Opcja 2</h3>
            </div>
            <div className="options_row">
              <Form.Item name="option3">
                <Checkbox className="checkbox"></Checkbox>
              </Form.Item>
              <h3>Opcja 3</h3>
            </div>
            <div className="options_row">
              <Form.Item name="option4">
                <Checkbox className="checkbox"></Checkbox>
              </Form.Item>
              <h3>Opcja 4</h3>
            </div>
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
                onClick={console.log("form", form)}
              >
                PRZEJDŹ DO PŁATNOŚCI
              </Button>
            </Form.Item>
          </div>
        </div>
      </CalendarCSS>
      {/* <button
        onClick={() => {
          console.log("inside btn click callback");
          setStartDate("2021/02/02");
        }}
      >
        setDate
      </button> */}
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

export default Reservation;
