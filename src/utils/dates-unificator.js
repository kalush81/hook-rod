export const unify = (date) => {
  const [d, m, y] = date.split(".");
  return [y, m, d].join("");
};
