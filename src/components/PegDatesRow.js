import React from "react";
import DateSquare from "./DateSquare";
import { getBookingDataOnDate } from "../utils/booking-checker";

function PegDatesRow({ peg, daysArr }) {
  let bookings = peg.reservations.map(({ startDate, endDate, status }) => {
    return {
      startDate,
      endDate,
      status,
    };
  });
  //console.log("bookings in PegDatesRow", bookings);
  return (
    <div className="/*calendar_lowisko_num*/ wrapper">
      <span key={peg.id} className="calendar_lowisko_day_box_num">
        {peg.pegNumber}
      </span>

      {daysArr.map((date) => {
        let bookingData = getBookingDataOnDate(date, bookings); //returns { isBooked: true, status: "PENDING" | "PAID" }
        return <DateSquare key={date} day={date} bookingData={bookingData} />;
      })}
    </div>
  );
}

export default PegDatesRow;
