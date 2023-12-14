import React, { useState } from 'react';
import { navigate } from 'gatsby';
import { Form, Input, Checkbox, Button, Modal } from 'antd';
import useFetch from '../hooks/useFetch';

export const RequestReservationForm = (reservationDetails) => {
  const [agreement, setAgreement] = useState(false);
  const [linkToPayment, setLinkToPayment] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const { post, loading } = useFetch('https://hookandrod.herokuapp.com/api/');

  const handleCancelModal = () => {
    setOpenModal(false);
  };

  const handleGoToPaymentPage = () => {
    setOpenModal(false);
    navigate(linkToPayment);
  };

  const onRequestReservation = async (personalData) => {
    const reservationData = {
      ...personalData,
      ...reservationDetails,
      agreement: Boolean(agreement).toString(),
    };

    const sendForm = async () => {
      setOpenModal(true);
      setConfirmLoading(true);
      try {
        const response = await post('reservation', reservationData);
        return response;
      } catch (error) {
        setOpenModal(false);
        setLinkToPayment('');
        return Modal.error({
          title: 'Error',
          content: error.message || [...error.messages],
          onOk: () => navigate(-1),
          okText: 'wróć do rezerwacji',
        });
      }
    };
    const response = await sendForm();
    setConfirmLoading(false);
    setLinkToPayment(response.message);
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
          linkToPayment
            ? 'przechodzę do płatności'
            : 'sprawdzanie dostępności dat'
        }>
        {linkToPayment
          ? 'rezerwacja jest mozliwa, mozesz przejść do platności'
          : 'poczekaj jeszcze chwilkę, sprawdzamy dostępność dat'}
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
