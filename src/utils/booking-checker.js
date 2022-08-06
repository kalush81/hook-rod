import { unify } from "./dates-unificator";

// export const isDayBooked = (day, bkngs) => {
//   const dates = bkngs.map((bk) => [bk.startDay, bk.endDay, bk.status]);

//   const booleans = dates.map((rangeArr) => {
//     const date = unify(day);
//     const startDay = unify(rangeArr[0]);
//     const endDay = unify(rangeArr[1]);

//     if (
//       (date >= startDay && date < endDay) ||
//       (date === startDay && date === endDay)
//     ) {
//       return true;
//     } else {
//       return false;
//     }
//   });
//   return booleans.some((bool) => bool === true);
// };

export const getBookingDataOnDay = (date, bookings) => {
  const bookingData = {};
  let day = unify(date);

  console.log("day to be checked in utils", day);

  bookings.forEach((bkng) => {
    let s = unify(bkng.startDay);
    let e = unify(bkng.endDay);

    console.log("s in utils", s);
    console.log("e in utils", e);

    if ((day >= s && day < e) || (day === s && day === e)) {
      bookingData.isBooked = true;
      bookingData.status = bkng.status;
    }
  });
  console.log("bookingData in utils", bookingData);
  return bookingData;
};
