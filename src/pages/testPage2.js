import React, { useState, useRef, useEffect } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;
const noon = { hour: 12, minute: 0, second: 0 };
const checkins = [1, 4, 6]; // Available check-in days: Monday, Thursday, Saturday
const checkouts = [2, 5, 0]; // Available check-out days: Sunday, Tuesday, Friday

const MyRangePicker = () => {
  const [dates, setDates] = useState([null, null]); // Default empty dates
  const [isEndDisabled, setIsEndDisabled] = useState(true); // End is disabled by default
  const [activeField, setActiveField] = useState(null); // Track the focused field ('start' or 'end')

  const endPickerRef = useRef(); // Ref for the end date picker

  useEffect(() => {
    // Automatically focus on the end date after selecting the start date
    if (activeField === 'start' && dates[0] && !isEndDisabled) {
      endPickerRef.current?.focus();
    }
  }, [dates, isEndDisabled, activeField]);

  const disableDate = (current) => {
    const day = current.day();
    const now = dayjs();

    // If no start date is selected, only allow dates from the checkins array
    if (!dates[0]) {
      return !checkins.includes(day) || current.set(noon).diff(now) < 0;
    }

    // If start date is selected, enforce checkouts days and restrict past days
    if (dates[0]) {
      return !checkouts.includes(day) || current.set(noon).diff(dates[0]) < 0;
    }
  };

  const handleRangeChange = (value) => {
    setDates(value);

    if (value[0]) {
      // Enable end date picker after selecting start date
      setIsEndDisabled(false);
      setActiveField('start'); // Indicate start is selected
    } else {
      // Disable end date picker if start date is cleared
      setIsEndDisabled(true);
      setActiveField(null); // Reset active field
    }
  };

  const handleClear = () => {
    // Reset both dates and disable the end date picker
    setDates([null, null]);
    setIsEndDisabled(true);
    setActiveField(null); // Reset active field
  };

  const handleFocus = (event, { range }) => {
    // Update focus state when the range picker is focused
    setActiveField(range);
  };

  return (
    <div style={{ marginTop: '200px' }}>
      <RangePicker
        disabledDate={disableDate}
        value={dates}
        onCalendarChange={handleRangeChange}
        disabled={[false, isEndDisabled]} // Disable end date if start is not selected
        allowClear={true} // Allow clearing the selected dates
        onClear={handleClear} // Reset the picker when cleared
        onFocus={handleFocus} // Track which field is focused
        ref={activeField === 'end' ? endPickerRef : null} // Set ref for the end field
      />
    </div>
  );
};

export default MyRangePicker;
