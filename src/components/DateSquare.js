import React from "react";

function DateSquare({ day, bookingData }) {
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
      onClick={(e) => console.log(`span wac clicked with day: ${day}`, e)}
    >
      {/* {day} */}
      <img src="../../V.svg" alt="" />
    </span>
  );
}

export default DateSquare;
