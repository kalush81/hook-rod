import React, { useState } from "react";
import { navigate } from "gatsby";
import { Form, Input, Checkbox, Button } from "antd";

export const ReservationForm = (reservationDetails) => {
  const [agreement, setAgreement] = useState(false);
  const [willRedirect, setWillRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const onFinish = async (personalData) => {
    const reservationData = {
      ...personalData,
      ...reservationDetails,
      // startDate: "2023-05-12 12:00",
      // endDate: "2023-05-13 12:00",
      agreement: Boolean(agreement).toString(),
    };

    const sendForm = async () => {
      try {
        setLoading(true);
        const result = await fetch(
          `https://hookandrod.herokuapp.com/api/reservation`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "*/*",
              "Content-Type": "application/json",
            },
            withCredentials: false,
            credentials: "same-origin",
            crossdomain: true,
            body: JSON.stringify(reservationData),
          }
        );
        if (result.status === 403) {
          const response = await result.json();
          throw new Error(response.message);
        }
        return await result.text();
      } catch (error) {
        console.error("error while fetching from API", error);
        navigate("/rezerwacja-niedostepna", {
          state: { fromUrl: reservationDetails.currentPath },
        });
      }
    };

    const res = await sendForm();
    return navigate(res);
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
        {willRedirect ? (
          <>
            <h2>Gratulacje !</h2>
            <h3>Twoja rezerwacja została zaakceptowana </h3>
            <h3>za chwile nastąpi przekierowanie do strony płatności</h3>
          </>
        ) : (
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!agreement || loading}
            >
              {loading ? "sprawdzdzanie rezerwacji" : "rezerwuję i płacę"}
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
};
