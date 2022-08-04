import React from "react";
import moment from "moment";
import DateSquare from "./DateSquare";

function PegDatesRow({ peg, currentDay, maxDays }) {
  let daysArr = new Array(maxDays)
    .fill(undefined)
    .map((el, i) => moment(currentDay).add(i, "day").format("L"));

  let bookings = peg.reservation.map(({ startDay, endDay, status }) => {
    return {
      startDay,
      endDay,
      status,
    };
  });

  return (
    <div className="calendar_lowisko_num">
      <span key={peg.id} className="calendar_lowisko_day_box_num">
        {peg.pegNumber}
      </span>

      {daysArr.map((day) => {
        return (
          <DateSquare day={day} bookings={bookings} />
          // <span className="calendar_lowisko_day_box small">
          //   {bookings.find((b) => b.startDay === day)?.status || day}
          // </span>
        );
      })}
    </div>
  );
}

export default PegDatesRow;
