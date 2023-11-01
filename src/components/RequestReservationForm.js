import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { Form, Input, Checkbox, Button, Modal } from 'antd';

export const RequestReservationForm = (reservationDetails) => {
  const [agreement, setAgreement] = useState(false);
  const [linkToPaymentPage, setLinkToPayment] = useState('');

  /* modal states*/
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancelModal = () => {
    setOpenModal(false);
  };
  const handleGoToPaymentPage = () => {
    setOpenModal(false);
    navigate(linkToPaymentPage);
  };
  /* modal states*/

  const onRequestReservation = async (personalData) => {
    const reservationData = {
      ...personalData,
      ...reservationDetails,
      extraServicesReservation: [],
      agreement: Boolean(agreement).toString(),
    };

    console.log('reservData', reservationData);

    const sendForm = async () => {
      setOpenModal(true);
      setConfirmLoading(true);
      try {
        const result = await fetch(
          `https://hookandrod.herokuapp.com/api/reservation`,
          {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
            withCredentials: false,
            credentials: 'same-origin',
            crossdomain: true,
            body: JSON.stringify(reservationData),
          }
        );
        if (result.status === 403) {
          const response = await result.json();
          throw new Error(response.message);
        }
        console.log('response result', result);
        return await result.text();
      } catch (error) {
        console.error('error while fetching from API', error);
        setOpenModal(false);
        return Modal.error({
          title: 'Error',
          content: error.message,
          onOk: () => navigate(-1),
          okText: 'wróć do rezerwacji',
        });
      }
    };
    const linkToPaymentPage = await sendForm();
    setConfirmLoading(false);
    setLinkToPayment(linkToPaymentPage);
    //return navigate(linkToPaymentPage);
  };

  const handleCheckboxChange = (e) => {
    setAgreement(e.target.checked);
  };

  return (
    <div className='reservation-form-card'>
      <Modal
        title='Title'
        open={openModal}
        onOk={handleGoToPaymentPage}
        confirmLoading={confirmLoading}
        onCancel={handleCancelModal}
        okText={
          linkToPaymentPage
            ? 'przechodzę do płatności'
            : 'sprawdzanie dostępności dat'
        }>
        {linkToPaymentPage
          ? 'rezerwacja jest mozliwa, mozesz przejść do platności'
          : 'czekaj, sprawdzamy dostępność dat na wybranym przez Ciebie stanowisku'}
      </Modal>
      <h2>Dane kontaktowe</h2>
      <Form
        name='reservation-form'
        onFinish={onRequestReservation}
        layout='vertical'>
        <Form.Item
          label='IMIĘ I NAZWISKO'
          name='name'
          rules={[{ required: true, message: 'Please enter your name' }]}>
          <Input placeholder='Imię i nazwisko' />
        </Form.Item>
        <Form.Item
          label='ADRES E-MAIL'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}>
          <Input placeholder='adres@email.com' />
        </Form.Item>
        <Form.Item
          label='TELEFON'
          name='phone'
          rules={[
            { required: true, message: 'Please enter your phone number' },
            { pattern: /^[0-9]+$/, message: 'Please enter only numbers' },
          ]}>
          <Input placeholder='000-000-000' />
        </Form.Item>
        <div className='checkbox checkbox_regulamin'>
          <Form.Item
            label='Oświadczam, że zapoznałem/am się z Regulaminem Łowiska i akceptuję
              wszystkie zawarte w nim warunki.*'
            name='agreement'
            valuePropName='checked'
            rules={[
              {
                required: true,
                message: 'Potwierdz ze zapoznales sie z regulaminem',
              },
            ]}>
            <Checkbox
              checked={agreement}
              onChange={handleCheckboxChange}></Checkbox>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' disabled={!agreement}>
            Zarezerwuj
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
