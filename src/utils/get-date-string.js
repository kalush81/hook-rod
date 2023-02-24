export const getCallendarString = (daysArr) => {
  const months = [
    "styczen",
    "luty",
    "marzec",
    "kwiecien",
    "maj",
    "czerwiec",
    "lipiec",
    "sierpien",
    "wrzesien",
    "pazdziernik",
    "listopad",
    "grudzien",
  ];
  const mpd = daysArr.map(
    (date) => months[Number(date.split("/")[0]) - 1] + "/" + date.split("/")[2]
  );
  let arr = [mpd[0].split("/"), mpd[mpd.length - 1].split("/")];
  let str = "";

  if (arr[0][0] === arr[1][0]) {
    str = arr[0].join(" ");
  } else {
    if (arr[0][1] === arr[1][1]) {
      str = arr[0][0] + " / " + arr[1][0] + " " + arr[0][1];
    } else {
      str = arr[0].join(" ") + " / " + arr[1].join(" ");
    }
  }
  return str;
};
