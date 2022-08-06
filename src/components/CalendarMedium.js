import React, { useState } from "react";
import styled from "styled-components";
import PegDatesRow from "./PegDatesRow";
//import axios from "axios";
import moment from "moment";

const CalendarMedium = function ({ id, lowiskoDataProp, maxPegs, maxDays }) {
  const [firstIdx, setFirstIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(maxPegs);
  const [otherDays, setOtherDays] = useState(0);

  const { pegs } = lowiskoDataProp;

  // useEffect(() => {
  //   const loadCalendar = async () => {
  //     const response = await axios.get(
  //       `https://karpteam.herokuapp.com/api/lakes/checkLakesOnDate`,
  //       {
  //         mode: "cors",
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           Accept: "application/json",
  //           "Content-Type": "application/json",
  //         },
  //         withCredentials: false,
  //         credentials: "same-origin",
  //         crossdomain: true,
  //       }
  //     );
  //     setBookedDays(response.data);
  //     console.log("LOWISKA", response.data);
  //   };

  //   loadCalendar();
  // }, [id]);

  const resetQueue = () => {
    setFirstIdx(0);
    setLastIdx(maxPegs);
  };

  const handleNext = (first, last) => {
    if (last >= lowiskoDataProp.pegs.length) {
      resetQueue();
    } else {
      setFirstIdx(first + maxPegs);
      setLastIdx(last + maxPegs);
    }
  };

  const handlePrev = (first, last) => {
    if (first <= 0) {
      resetQueue();
    } else {
      setFirstIdx(first - maxPegs);
      setLastIdx(last - maxPegs);
    }
  };

  let daysArr = new Array(maxDays)
    .fill(undefined)
    .map((el, i) =>
      moment(moment().add(otherDays, "day").format()).add(i, "day").format("L")
    );
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
    (date) => months[Number(date.split(".")[1]) - 1] + "/" + date.split(".")[2]
  );

  let arr = [mpd[0].split("/"), mpd[mpd.length - 1].split("/")];

  let str = "";

  if (arr[0][0] === arr[1][0]) {
    str = arr[0].join(" ");
  } else {
    if (arr[0][1] === arr[1][1]) {
      str = arr[0][0] + "/" + arr[1][0] + " " + arr[0][1];
    } else {
      str = arr[0].join(" ") + " / " + arr[1].join(" ");
    }
  }

  return (
    <CalendarCss>
      <div>{id}</div>
      <header className="calendar_header">
        <h3>Sprawdź dostępne terminy</h3>
      </header>

      <div className="flex">
        <button
          className="calendar_lowisko_day_box noStyle"
          onClick={() => setOtherDays(otherDays - maxDays)}
        >
          <img
            className="svgBigger"
            src="../../left.svg"
            alt="sprawdz poprzednie dni"
          />
        </button>
        <span>wcześniej</span>
        <span>{str}</span>
        <span>później</span>
        <button
          className="calendar_lowisko_day_box noStyle"
          onClick={() => setOtherDays(otherDays + maxDays)}
        >
          <img src="../../right.svg" alt="sprawdz kolejne dni" />
        </button>
      </div>
      <div className="wrapper">
        <button
          className="calendar_lowisko_day_box block noStyle"
          onClick={() => handlePrev(firstIdx, lastIdx)}
        >
          <img
            src="../../up.svg"
            alt="sprawdz dostepnosc na poprzednich stanowiska"
          />
        </button>
        {/* <span
          className="calendar_lowisko_day_box small noStyle"
          style={{ fontSize: "9px" }}
        >
          stanowisko
        </span> */}

        {daysArr.map((day) => {
          return (
            <span className="calendar_lowisko_day_box small noStyle">
              {day}
            </span>
          );
        })}
      </div>

      <div className="calendar_date_selector"></div>
      <div className="calendar_lowiska_list border">
        {pegs
          ? pegs.map((peg, i) => {
              if (i >= firstIdx && i < lastIdx) {
                return (
                  <PegDatesRow
                    peg={peg}
                    currentDay={moment().add(otherDays, "day").format()}
                    maxDays={maxDays}
                    daysArr={daysArr}
                  />
                );
              }
            })
          : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((peg, i) => {
              if (i >= firstIdx && i < lastIdx) {
                return (
                  <PegDatesRow
                    peg={peg}
                    currentDay={moment().add(otherDays, "day").format()}
                    maxDays={maxDays}
                    daysArr={daysArr}
                  />
                );
              }
            })}

        <button
          className="calendar_lowisko_day_box block noStyle"
          onClick={() => handleNext(firstIdx, lastIdx)}
        >
          <img
            src="../../down.svg"
            alt="sprawdz dostepnosc na nastepnych stanowiskach"
          />
        </button>
      </div>
    </CalendarCss>
  );
};

export const CalendarCss = styled.div`
  scroll-behavior: smooth;
  padding: 19px 21px;
  background: #e4f4ca;
  border-radius: 9px;

  .calendar_header {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  .calendar_header h3 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 28px;
  }

  .dates_full_btn {
    width: 250px;
    height: 36px;
    left: 582px;
    top: 10px;
    background: #6750a4;
    border-radius: 100px;
    border: none;
    cursor: pointer;
    color: #fff;
  }

  .calendar_lowisko_num {
    width: 100%;
    display: flex;
    margin-bottom: 9px;
    /* justify-content: space-around; */
  }

  .calendar_lowisko_day_box {
    background: green;
    border: 2px solid #c6c6c6;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    display: grid;
    justify-content: center;
    align-content: center;
    margin-right: 9px;
  }

  .calendar_lowisko_day_box_num {
    background: #7d7a7a;
    color: #fff;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    font-size: 3.2rem;
    display: inline-block;
    margin-right: 9px;
    text-align: center;
  }

  .block {
    display: block;
    margin-bottom: 7px;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-bottom: 8px;
  }

  .offset-right {
    margin-right: 0px;
  }

  .small {
    font-size: 7px;
  }

  .reserved {
    background-color: #e70000;
  }

  .noStyle {
    background-color: transparent;
    border: none;
  }

  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .flex > span {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    font-size: 12px;
  }
  .flex span:nth-child(3) {
    font-size: 22px;
  }

  button img {
    width: 16px;
  }
`;

export default CalendarMedium;
