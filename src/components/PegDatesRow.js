import React from "react";
import moment from "moment";
import DateSquare from "./DateSquare";

function PegDatesRow({ peg, daysArr }) {
  let bookings = peg.reservation?.map(({ startDay, endDay, status }) => {
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
        return <DateSquare day={day} bookings={bookings} />;
      })}
    </div>
  );
}

export default PegDatesRow;
