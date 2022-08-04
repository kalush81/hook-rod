import React from "react";

// bkngs = [{startDay: '08.08.2022', endDay: '10.08.2022', status: 'PAID'}, {startDay: '13.08.2022', endDay: '14.08.2022'. status: 'PAID'}]
function unify(date) {
  const [d, m, y] = date.split(".");
  console.log([y, m, d].join(""));
  return [y, m, d].join("");
}

const isDayInRange = (day, bkngs) => {
  const dates = bkngs.map((bk) => [bk.startDay, bk.endDay]);
  const trueOrfalse = dates.map((rangeArr) => {
    const date = unify(day);
    const startDay = unify(rangeArr[0]);
    const endDay = unify(rangeArr[1]);

    if (
      (date >= startDay && date < endDay) ||
      (date === startDay && date === endDay)
    ) {
      return true;
    } else {
      return false;
    }
  });

  return trueOrfalse.some((tf) => tf === true);
};

function DateSquare({ day, bookings }) {
  if (isDayInRange(day, bookings)) {
    return (
      <span className="calendar_lowisko_day_box small reserved">
        {/* {bookings.find((b) => b.startDay === day)?.status || day} */}
        {day}
      </span>
    );
  }
  return (
    <span className="calendar_lowisko_day_box small">
      {/* {bookings.find((b) => b.startDay === day)?.status || day} */}
      {day}
    </span>
  );
}

export default DateSquare;
