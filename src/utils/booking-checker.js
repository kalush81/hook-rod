import { unify } from "./dates-unificator";

export const getBookingDataOnDay = (date, bookings) => {
  const bookingData = {};
  let day = unify(date);

  bookings?.forEach((bkng) => {
    let s = bkng.startDate?.split(/[.-]/).join("");
    let e = bkng.endDate?.split(/[.-]/).join("");
    // here we assign properties based on reservation dates
    if ((day >= s && day <= e) || (day === s && day === e)) {
      bookingData.isBooked = true;
      bookingData.status = bkng.status;
    }
  });
  return bookingData;
};
