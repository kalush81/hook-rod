import { unify } from "./dates-unificator";

export const getBookingDataOnDay = (date, bookings) => {
  const bookingData = {};
  let day = unify(date);

  bookings.forEach((bkng) => {
    let s = unify(bkng.startDay);
    let e = unify(bkng.endDay);

    if ((day >= s && day < e) || (day === s && day === e)) {
      bookingData.isBooked = true;
      bookingData.status = bkng.status;
    }
  });

  return bookingData;
};
