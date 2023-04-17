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
  //console.log("peg id in pegDatesRow", peg.pegId);
  return (
    <>
      <span key={peg.pegId} /*className="calendar_lowisko_day_box_num" */>
        {peg.pegNumber}
      </span>

      {daysArr.map((date) => {
        let bookingData = getBookingDataOnDate(date, bookings, peg.pegId); //returns { isBooked: true, status: "PENDING" | "PAID" }
        return <DateSquare key={date} day={date} bookingData={bookingData} />;
      })}
    </>
  );
}

export default PegDatesRow;
