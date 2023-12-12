import React from 'react';
import { Form, Button } from 'antd';

export const SubmitReservationButton = () => {
  return (
    <div className='button_container'>
      <Form.Item>
        <Button
          className='button'
          size='large'
          type='primary'
          htmlType='submit'
          onClick={() => {}}>
          Przejdź do podsumowania
        </Button>
      </Form.Item>
    </div>
  );
};
