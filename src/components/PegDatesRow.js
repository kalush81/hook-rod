import React from "react";
import DateSquare from "./DateSquare";
import { getBookingDataOnDay } from "../utils/booking-checker";

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
    <div className="calendar_lowisko_num">
      <span key={peg.id} className="calendar_lowisko_day_box_num">
        {peg.pegNumber}
      </span>

      {daysArr.map((day) => {
        let bookingData = getBookingDataOnDay(day, bookings); //returns { isBooked: true, status: "PENDING" | "PAID" }
        return <DateSquare key={day} day={day} bookingData={bookingData} />;
      })}
    </div>
  );
}

export default PegDatesRow;
