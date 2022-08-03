import React from "react";
import moment from "moment";

function PegDatesRow({ peg, currentDay, maxDays }) {
  let daysArr = new Array(maxDays)
    .fill(undefined)
    .map((el, i) => moment(currentDay).add(i, "day").format("L"));

  return (
    <div className="calendar_lowisko_num">
      <span key={peg.id} className="calendar_lowisko_day_box_num">
        {peg.pegNumber}
      </span>

      {daysArr.map((date) => {
        return <span className="calendar_lowisko_day_box small">{date}</span>;
      })}
    </div>
  );
}

export default PegDatesRow;
