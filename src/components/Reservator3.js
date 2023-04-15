import React, { useState } from "react";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeInput, setActiveInput] = useState(null);

  const handleOpenChange = (status) => {
    setOpen(status);
    setActiveInput(null);
  };

  const handleActiveInput = (input) => {
    console.log("input", input);
    setActiveInput(input);
  };

  return (
    <RangePicker
      onOpenChange={handleOpenChange}
      onChange={(dates) => {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
      }}
      value={[startDate, endDate]}
      inputReadOnly
      onCalendarChange={(dates, formatDates) => {
        if (dates.length === 1 && open) {
          setActiveInput(dates[0] ? "end" : "start");
        } else {
          setActiveInput(null);
        }
      }}
      onOk={() => {
        setActiveInput(null);
      }}
      open={open}
      autoFocus
    >
      {/* <input
        placeholder="Start Date"
        value={startDate ? startDate.format("YYYY-MM-DD") : ""}
        onChange={() => handleActiveInput("start")}
        onFocus={() => handleActiveInput("start")}
        onBlur={() => setActiveInput(null)}
      />
      <input
        placeholder="End Date"
        value={endDate ? endDate.format("YYYY-MM-DD") : ""}
        onChange={() => handleActiveInput("end")}
        onFocus={() => handleActiveInput("end")}
        onBlur={() => setActiveInput(null)}
      /> */}
    </RangePicker>
  );
};

export default DateRangePicker;
