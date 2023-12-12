import React from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;

export const NumberGuestSelector = ({ handleSetNumGuests }) => {
  return (
    <Form.Item
      name='numGuests'
      rules={[
        {
          required: true,
          message: 'Prosze podaj ilość osób!',
        },
      ]}>
      <Select
        allowClear
        className='select_row1'
        size='medium'
        placeholder='Osoby'
        showAction='focus'
        onChange={handleSetNumGuests}>
        <Option value={1}>1 osoba</Option>
        <Option value={2}>2 osoby</Option>
        <Option value={3}>3 osoby</Option>
        <Option value={4}>4 osoby</Option>
      </Select>
    </Form.Item>
  );
};
