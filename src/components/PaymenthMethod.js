import React, { memo } from 'react';
import { Form, Radio, Space } from 'antd';

export const PaymenthMethod = memo(function PaymentMethod(props) {
  console.log('PAYMENT METHOD RERENDERED!!!');
  return (
    <div className='options'>
      <Form.Item name='paymentType'>
        <Radio.Group
          onChange={(e) => {
            console.log('radio checked', e.target.value);
          }}>
          <Space direction='vertical'>
            <Radio value={'ON_PLACE'}>płatność na miejscu</Radio>
            <Radio value={'TRANSFER'}>płatność online</Radio>
          </Space>
        </Radio.Group>
      </Form.Item>
    </div>
  );
});
