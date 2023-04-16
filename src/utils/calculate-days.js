/* eslint-disable no-undef */

export const calculateDays = (p1, p2) => {
  const start = dayjs(p1);
  const end = dayjs(p2);
  const numDays = end.diff(start, "day");
  setNumDays(numDays);
};
