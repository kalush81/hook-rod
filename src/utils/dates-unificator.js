export const unify = (date) => {
  const [m, d, y] = date.split(/[./\\-]/);
  return [y, m, d].join("");
};
