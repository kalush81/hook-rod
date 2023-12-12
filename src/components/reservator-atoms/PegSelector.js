import React from 'react';
import { Form, Select } from 'antd';
const { Option } = Select;

export const PegSelector = ({ pegs, handleSelectPeg }) => {
  return (
    <Form.Item
      name='pegId'
      rules={[
        {
          required: true,
          message: 'wybierz stanowisko',
        },
      ]}>
      <Select
        loading={!pegs.length}
        allowClear
        className='select_row1'
        size='medium'
        placeholder='wybierz stanowisko'
        showAction='focus'
        onChange={handleSelectPeg}>
        {pegs.length &&
          pegs.map((peg) => {
            return (
              <Option key={peg.pegId} value={peg.pegId}>
                {peg.pegName}
              </Option>
            );
          })}
      </Select>
    </Form.Item>
  );
};
