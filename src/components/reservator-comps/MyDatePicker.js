import React, { memo } from 'react';
import { Form, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export const MyDatePicker = function MyDatePicker({
  pegId,
  disableDate,
  handleRangeChange,
  onOpenChange,
  handleFocus,
  onCalendarChange,
  isStartDateSelected,
  value,
  handleBlur,
}) {
  console.log('value', value);
  return (
    <div className='row row2'>
      <Form.Item
        name='dates'
        rules={[
          {
            required: true,
            message: 'Prosze podaj daty!',
          },
        ]}>
        <RangePicker
          value={value}
          disabled={[!pegId, !value || !value[1]]}
          placeholder={['początek', 'koniec']}
          disabledDate={disableDate}
          onCalendarChange={onCalendarChange}
          onOpenChange={onOpenChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </Form.Item>
    </div>
  );
};
