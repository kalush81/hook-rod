import React, { useState } from "react";
import { Form, Input, Button, Space, ConfigProvider, Checkbox } from "antd";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pl";

const ReservatorSummary = ({
  startDateUI,
  endDateUI,
  numDays,
  numGuests,
  pegBasePrice,
  lakeName,
  options,
  totalPrice,
}) => {
  return (
    <div className="reservation-summary-card">
      <h2>Podsumowanie Rezerwacji</h2>
      <div>{lakeName}</div>
      <div>Całkowita długość pobytu : {numDays}</div>
      <div>
        {startDateUI} - {endDateUI}
      </div>
      <div>
        {numDays} x {pegBasePrice} zł
      </div>
      <div>Liczba osób : {numGuests}</div>
      <div>
        {numGuests} x {numDays * pegBasePrice} zł {"---------"}{" "}
        {numGuests * numDays * pegBasePrice}zł
      </div>
      <div>Opcje dodatkowe: </div>
      <ul>
        {options.map((option) => {
          return (
            <li key={option.name}>
              <div>
                <p>{option.name}</p>
                <div>
                  {numDays} x {option.basePrice} zł ----{" "}
                  {numDays * option.basePrice} zł
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      <div>Łączna kwota: {totalPrice}</div>
    </div>
  );
};

const ReservationForm = (reservationDetails) => {
  const [agreement, setAgreement] = useState(false);
  const onFinish = async (personalData) => {
    // console.log("Form values to be sent to api:", personalData);
    // console.log("props to be added to form to send", { ...reservationDetails });
    const reservationData = {
      ...personalData,
      ...reservationDetails,
      agreement,
    };
    console.log("reservationData", reservationData);
    const sendForm = async () => {
      try {
        const result = await fetch(
          `https://hookandrod.herokuapp.com/api/reservation`,
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: false,
            credentials: "same-origin",
            crossdomain: true,
            body: JSON.stringify(reservationData),
          }
        );
        return await result.json();
      } catch (error) {
        console.error("error while fetching from API", error);
      }
    };

    const res = await sendForm();
    console.log("res after sent body", res);
  };

  const handleCheckboxChange = (e) => {
    setAgreement(e.target.checked);
  };

  return (
    <div className="reservation-form-card">
      <h2>Dane kontaktowe</h2>
      <Form name="reservation-form" onFinish={onFinish} layout="vertical">
        <Form.Item
          label="IMIĘ I NAZWISKO"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Imię i nazwisko" />
        </Form.Item>

        <Form.Item
          label="ADRES E-MAIL"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="adres@email.com" />
        </Form.Item>

        <Form.Item
          label="TELEFON"
          name="phone"
          rules={[
            { required: true, message: "Please enter your phone number" },
            { pattern: /^[0-9]+$/, message: "Please enter only numbers" },
          ]}
        >
          <Input placeholder="000-000-000" />
        </Form.Item>

        <div className="checkbox checkbox_regulamin">
          <Form.Item
            label="Oświadczam, że zapoznałem/am się z Regulaminem Łowiska i akceptuję
            wszystkie zawarte w nim warunki.*"
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                required: true,
                message: "Potwierdz ze zapoznales sie z regulaminem",
              },
            ]}
          >
            <Checkbox
              checked={agreement}
              onChange={handleCheckboxChange}
            ></Checkbox>
          </Form.Item>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" disabled={!agreement}>
            rezerwuję i płacę
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

//entire page
const ReservationDetails = (props) => {
  console.log("props in  ReservationDetails", props);
  const [sD, eD] = props.location.state?.newReservationData?.dates || [];
  const {
    pegId,
    numDays,
    pegBasePrice,
    numGuests,
    lakeName,
    options = [],
    totalPrice,
  } = props.location.state?.newReservationData || {};
  const startDateUI = dayjs(sD?.$d).locale("pl").format("DD MMMM YYYY");
  const endDateUI = dayjs(eD?.$d).locale("pl").format("DD MMMM YYYY");

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
        },
      }}
    >
      <WrapperWithGrid>
        <ReservatorSummary
          startDateUI={startDateUI}
          endDateUI={endDateUI}
          numDays={numDays}
          pegBasePrice={pegBasePrice}
          numGuests={numGuests}
          options={options}
          lakeName={lakeName}
          totalPrice={totalPrice}
        />
        <ReservationForm
          pegId={pegId}
          options={options}
          numGuests={numGuests}
          startDate={dayjs(sD?.$d).format("YYYY-MM-DD")}
          endDate={dayjs(eD?.$d).format("YYYY-MM-DD")}
          numDays={numDays}
          totalPrice={totalPrice}
        />
        <Space className="site-button-ghost-wrapper" wrap>
          <Button type="primary" ghost onClick={() => window.history.back()}>
            powrot do rezerwacji
          </Button>
        </Space>
      </WrapperWithGrid>
    </ConfigProvider>
  );
};

const WrapperWithGrid = styled.div`
  display: grid;
  gap: 3em;
  width: 90%;
  max-width: 1000px;
  margin: 6em auto 8em;
  @media (min-width: 890px) {
    grid-template-columns: 1fr 1fr;
  }

  .reservation-summary-card {
    border-radius: 5px;
    padding: 2em;
    background: #c4c4c440;
    max-width: 476px;
    & > div {
      background: #6750a40d;
      // opacity: 0.05;
      margin: 1em 0;
      padding: 1em 0.5em;
      border-radius: 5px;
    }
  }

  .reservation-form-card {
    max-width: 476px;
  }
`;

export default ReservationDetails;
