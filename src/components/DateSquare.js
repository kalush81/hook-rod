import React from "react";
import { useContext } from "react";
import { DatesReservedContext } from "./datesReservationContext";

function DateSquare({ day, bookingData }) {
  const { value, setValue } = useContext(DatesReservedContext);

  const handleClick = (day) => {
    setValue(day);
  };

  if (bookingData.isBooked) {
    return (
      <span
        className={`calendar_lowisko_day_box small ${
          bookingData.status === "PENDING" ? "pending" : "reserved"
        }`}
      >
        {bookingData.status === "PAID" && <img src="../../X.svg" alt="" />}
      </span>
    );
  }
  return (
    <span
      className="calendar_lowisko_day_box small free"
      onClick={(e) => handleClick(day)}
    >
      {/* {day} */}
      <img src="../../V.svg" alt="" />
    </span>
  );
}

export default DateSquare;
