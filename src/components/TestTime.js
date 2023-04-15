import dayjs from "dayjs";

const date1 = dayjs("2019-01-25");
const date2 = dayjs("2018-06-05");
console.log("Difference in ms", date1.diff(date2));
