/* eslint-disable no-undef */

export const truncate = (username, number) => {
  return username.length > number
    ? username.slice(0, number) + '...'
    : username;
};
