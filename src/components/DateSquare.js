import React from 'react';
import { V, X, QuestionMark } from '../assets/icons';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

function DateSquare({ day, bookingData, isLoading }) {
  if (bookingData.isBooked) {
    return (
      <span
        className={` ${
          bookingData.status === 'PENDING' ? 'pending' : 'reserved'
        }`}>
        {' '}
        {isLoading && Spin}
        {bookingData.status === 'PENDING' && <QuestionMark />}
        {bookingData.status === 'PAID' && <X />}
      </span>
    );
  }
  return (
    <span
      className='free'
      style={{ background: '#4DB6AC' }} /*onClick={(e) => handleClick(day)}*/
    >
      {' '}
      {isLoading ? (
        <Spin
          indicator={
            <LoadingOutlined
              style={{ fontSize: 16, background: 'transparent' }}
            />
          }
        />
      ) : (
        <V />
      )}
      {/* {day} */}
      {/* <img src="../../V.svg" alt="" /> */}
      {/* <V /> */}
    </span>
  );
}

export default DateSquare;
