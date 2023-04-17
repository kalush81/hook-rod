import { unify } from "./dates-unificator";

export const getBookingDataOnDate = (date, bookings, pegId) => {
  //console.log("bookings", bookings);
  const bookingData = {};
  let day = unify(date);
  //console.log("day", day);
  bookings?.forEach((bkng) => {
    let s = bkng.startDate?.split("T")[0].split(/[.-]/).join("");
    let e = bkng.endDate?.split("T")[0].split(/[.-]/).join("");
    // console.log("pegId", pegId);
    // console.log("booked start", s);
    // console.log("booked end", e);
    // console.log("current day", day);
    // here we assign properties based on reservation dates
    if (day >= s && day < e /*|| (day === s && day === e)*/) {
      bookingData.isBooked = true;
      bookingData.status = bkng.status;
    }
  });
  return bookingData;
};
