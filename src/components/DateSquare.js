import React from "react";
import { V, X, QuestionMark } from "../assets/icons";

function DateSquare({ day, bookingData }) {
  if (bookingData.isBooked) {
    return (
      <span
        className={` ${
          bookingData.status === "PENDING" ? "pending" : "reserved"
        }`}
      >
        {bookingData.status === "PENDING" && <QuestionMark />}
        {bookingData.status === "PAID" && <X />}
      </span>
    );
  }
  return (
    <span
      className="free"
      style={{ background: "#4DB6AC" }} /*onClick={(e) => handleClick(day)}*/
    >
      {/* {day} */}
      {/* <img src="../../V.svg" alt="" /> */}
      <V />
    </span>
  );
}

export default DateSquare;
