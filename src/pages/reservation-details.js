import React from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";

const ReservatorSummary = () => {
  return (
    <div className="reservation-summary-card">
      <h2>Podsumowanie Rezerwacji</h2>
      <div>Nazwa Łowiska</div>
      <div>Całkowita długość pobytu : </div>
      <div>17 stycznia 2022 - 27 stycznia 2022</div>
      <div>10 x 30 zł</div>
      <div>Liczba osób :</div>
      <div>2 x 300 zł {"---------"} 600zł</div>
      <div>Opcje dodatkowe: </div>
      <ul>
        <li>
          <div>
            <p>Ponton</p>
            <div>10 x 50,00 zł ------- 500 zł</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

const ReservationForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            rezerwuję i płacę
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

//entire page
const ReservationDetails = () => {
  return (
    <WrapperWithGrid>
      <ReservatorSummary />
      <ReservationForm />
    </WrapperWithGrid>
  );
};

const WrapperWithGrid = styled.div`
  display: grid;
  gap: 3em;
  width: 90%;
  max-width: 1000px;
  margin: 5em auto;
  @media (min-width: 890px) {
    grid-template-columns: 1fr 1fr
  }

  .reservation-summary-card {
    border-radius: 5px;
    padding: 2em;
    background: #C4C4C440;
    max-width: 476px;
    & > div {
      background: #6750A40D;
        // opacity: 0.05;
      margin 1em 0;
      padding: 1em 0.5em;
      border-radius: 5px;
    }
  }

  .reservation-form-card {
    max-width: 476px;
  }
`;

export default ReservationDetails;
