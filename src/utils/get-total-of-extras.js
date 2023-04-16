export const getTotalOfextras = (extraOptions, numDays) => {
  return (
    extraOptions.reduce((acc, curr) => {
      return acc + curr.basePrice;
    }, 0) * numDays
  );
};
