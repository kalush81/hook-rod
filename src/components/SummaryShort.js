import React from 'react';
import { getTotalOfextras } from '../utils/get-total-of-extras';

export const SummaryShort = function ({
  pegId,
  extraOptions,
  numGuests,
  pegBasePrice,
  numDays,
  getPegNumber,
}) {
  console.log('SummaryShort Rerender');
  return (
    <>
      <h2>Podsumowanie</h2>
      <div className='podsumowanie'>
        <h3>stanowisko nr {pegId && getPegNumber(pegId)}</h3>
        <h3>{numGuests && pegBasePrice * numGuests * numDays} zł</h3>
        {extraOptions.map((extra) => {
          return (
            <>
              <h3 style={{ display: 'block' }}>
                {extra.name} x {numDays} dni
              </h3>
              <h3>{(extra.basePrice || 0) * numDays} zł</h3>
            </>
          );
        })}
      </div>
      <h3>opłata rezerwacyjna: 10 zł</h3>
      <h2>
        łączna suma:{' '}
        {pegBasePrice * numGuests * numDays +
          getTotalOfextras(extraOptions, numDays) +
          10}
      </h2>
    </>
  );
};
