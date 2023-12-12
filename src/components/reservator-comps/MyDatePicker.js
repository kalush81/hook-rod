import React, { memo } from 'react';
import { Form, DatePicker } from 'antd';
const { RangePicker } = DatePicker;

export const MyDatePicker = memo(function MyDatePicker({
  pegId,
  disableDate,
  // startDateInputRef,
  handleRangeChange,
  onOpenChange,
  handleRangePickerFocus,
}) {
  //console.log('MYDATEPICKER RERENDERED !!!');
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
          disabled={!pegId}
          placeholder={['początek', 'koniec']}
          // ref={startDateInputRef}
          disabledDate={disableDate}
          onCalendarChange={handleRangeChange}
          onOpenChange={onOpenChange}
          onFocus={handleRangePickerFocus}
          // allowClear={false}
        />
      </Form.Item>
    </div>
  );
});
