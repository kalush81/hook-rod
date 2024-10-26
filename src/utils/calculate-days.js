/* eslint-disable no-undef */
import dayjs from 'dayjs';

export const calculateDays = (setNumDays, p1, p2) => {
  const start = dayjs(p1);
  const end = dayjs(p2);
  const numDays = end.diff(start, 'day');
  setNumDays(numDays);
};
