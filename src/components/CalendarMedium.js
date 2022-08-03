import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PegDatesRow from "./PegDatesRow";
import axios from "axios";
import moment from "moment";

const CalendarMedium = function ({ id, lowiskoDataProp, maxPegs, maxDays }) {
  const [bookedDays, setBookedDays] = useState([]);
  const [firstIdx, setFirstIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(maxPegs);
  const [otherDays, setOtherDays] = useState(0);

  //console.log("nextTwoWeeks", nextTwoWeeks);

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
  return (
    <CalendarCss>
      <div>{id}</div>

      <header className="calendar_header">
        <h3>Sprawdź dostępne terminy</h3>
        {/*
         */}
      </header>

      <div className="wrapper">
        <span style={{ fontSize: "9px" }}>stanowisko</span>
        <p>2022 sierpień</p>
        <div className="offset-right">
          <button
            className="calendar_lowisko_day_box"
            onClick={() => setOtherDays(otherDays - maxDays)}
          >
            <img src="../../left.svg" alt="" />
          </button>
          <button
            className="calendar_lowisko_day_box"
            onClick={() => setOtherDays(otherDays + maxDays)}
          >
            <img src="../../right.svg" alt="" />
          </button>
        </div>
      </div>

      <div className="calendr_date_selector"></div>
      <div className="calendar_lowiska_list">
        {pegs &&
          pegs.map((peg, i) => {
            if (i >= firstIdx && i < lastIdx) {
              return (
                <PegDatesRow
                  peg={peg}
                  currentDay={moment().add(otherDays, "day").format()}
                  maxDays={maxDays}
                />
              );
            }
          })}

        <button
          className="calendar_lowisko_day_box block"
          onClick={() => handlePrev(firstIdx, lastIdx)}
        >
          <img src="../../up.svg" alt="" />
        </button>
        <button
          className="calendar_lowisko_day_box block"
          onClick={() => handleNext(firstIdx, lastIdx)}
        >
          <img src="../../down.svg" alt="" />
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
    border: 2px solid #c6c6c6;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    display: inline-block;
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
`;

export default CalendarMedium;
