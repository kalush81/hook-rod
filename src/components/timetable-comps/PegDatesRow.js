import React from 'react';
import DateSquare from './DateSquare';
import { getBookingDataOnDate } from '../../utils/booking-checker';

function PegDatesRow({ peg, daysArr, isLoading }) {
  let bookings = peg.reservations?.map(({ startDate, endDate, status }) => {
    return {
      startDate,
      endDate,
      status,
    };
  });

  return (
    <>
      <span className='noColor' key={peg.pegId} style={{ fontSize: '14px' }}>
        {peg.pegNumber}
      </span>

      {daysArr.map((date) => {
        let bookingData = getBookingDataOnDate(date, bookings, peg.pegId);
        return (
          <DateSquare
            key={date}
            day={date}
            bookingData={bookingData}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
}

export default PegDatesRow;
