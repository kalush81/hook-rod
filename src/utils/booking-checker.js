import { unify } from "./dates-unificator";

//in this function we use unify and split function what
// doesn't make sense. Unify func should be more generic
export const getBookingDataOnDay = (date, bookings) => {
  //console.log("date", date);
  //console.log("bookings", bookings);

  const bookingData = {};
  let day = unify(date);
  //console.log("unified day", day);

  bookings.forEach((bkng) => {
    let s = bkng.startDay.split(/[.-]/).join("");
    let e = bkng.endDay.split(/[.-]/).join("");
    //console.log("start", s);
    //console.log("end", e);

    // here we assign properties based on reservation dates
    if ((day >= s && day <= e) || (day === s && day === e)) {
      bookingData.isBooked = true;
      bookingData.status = bkng.status;
    }
  });
  //console.log("booking data in function", bookingData);
  return bookingData;
};
