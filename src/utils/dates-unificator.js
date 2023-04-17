export const unify = (date) => {
  const [d, m, y] = date.split(/[./\\-]/);
  //console.log("d,m,y", d, m, y);
  return [y, m, d].join("");
};
