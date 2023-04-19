import React, { useState } from "react";
import styled from "styled-components";
import PegDatesRow from "./PegDatesRow";
import moment from "moment";
import { getCallendarString } from "../utils/get-date-string";
import { Left, Right, Up, Down } from "../assets/icons";
//import { Skeleton, Spin } from "antd";
//import { ReactComponent as Left } from "../assets/images/left.svg";

const TimeTable = function ({ maxPegs, maxDays, pegs }) {
  //console.log("data from API", pegs);
  //console.log("is moment now? ", moment().format("L"));
  const [firstIdx, setFirstIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(maxPegs);
  const [otherDays, setOtherDays] = useState(0);

  function resetQueue() {
    setFirstIdx(0);
    setLastIdx(maxPegs);
  }

  const handleNext = (first, last) => {
    if (last >= pegs.length) {
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
      moment(moment().add(otherDays, "day")).add(i, "day").format("DD/MM/YYYY")
    );

  return (
    <CalendarCss>
      <header className="calendar_header">
        <h3 style={{ textAlign: "center" }}>Terminarz rezerwacji</h3>
      </header>
      <div className="flex">
        <button
          className="calendar_lowisko_day_box noStyle"
          onClick={() => setOtherDays(otherDays - maxDays)}
        >
          <Left />
        </button>
        <span>wcześniej</span>
        <span>{getCallendarString(daysArr)}</span>
        <span>później</span>
        <button
          className="calendar_lowisko_day_box noStyle"
          onClick={() => setOtherDays(otherDays + maxDays)}
        >
          <Right />
        </button>
      </div>

      <div className="wrapper">
        <div className="grid">
          <button
            className="up"
            // className="calendar_lowisko_day_box block noStyle"
            onClick={() => handlePrev(firstIdx, lastIdx)}
          >
            <Up />
          </button>

          {daysArr.map((day) => {
            return (
              <span
                key={
                  day
                } /*className="calendar_lowisko_day_box small noStyle" */
              >
                {day.substring(0, 5)}
              </span>
            );
          })}

          {pegs &&
            pegs.length &&
            pegs.map((peg, i) => {
              if (i >= firstIdx && i < lastIdx) {
                return (
                  <PegDatesRow
                    key={peg.pegNumber}
                    peg={peg}
                    maxDays={maxDays}
                    daysArr={daysArr}
                  />
                );
              }
              return null;
            })}

          <button
            className="down"
            // className="calendar_lowisko_day_box block noStyle"
            onClick={() => handleNext(firstIdx, lastIdx)}
          >
            <Down className="bounce" />
          </button>
        </div>
      </div>
    </CalendarCss>
  );
};

export const CalendarCss = styled.div`
  scroll-behavior: smooth;
  padding: 13px 13px;
  //background: #64b5f6;
  border-radius: 9px;
  margin-bottom: 100px;

  .calendar_header {
    display: flex;
    width: 100%;
    justify-content: center;
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
    justify-content: space-around;
  }

  .calendar_lowisko_day_box {
    background: #15bf12;
    border: 2px solid #c6c6c6;
    border-radius: 6px;
    width: 50px;
    height: 50px;
    display: grid;
    justify-content: center;
    align-content: center;
    margin-right: 9px;
    cursor: pointer;
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
    max-width: 900px;
    min-width: 200px;
    width: 100%;
    margin: auto;
    margin-bottom: 2em;
    //padding-bottom: 100%; /* Create a square element */
    //position: relative;
    .grid {
      display: grid;
      grid-template-columns: repeat(13, 1fr);
      grid-auto-rows: 1fr; /* Allow the rows to resize dynamically */
      //position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      gap: 0.4em;
      //aspect-ratio: 1/1;
      span,
      button {
        background-color: #ccc; /* Set the background color of each cell */
        padding: 0;
        //padding-bottom: 100%; /* Create a perfect square */

        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 7px;
        aspect-ratio: 1/1;
        /* img {
          width: 20px;
          height: 20px;
        } */
      }
      button.down {
        position: relative;

        &::after {
          position: absolute;
          bottom: -50%;
          left: -2px;
          display: block;
          width: 100%;
          height: auto;
          content: "więcej stanowisk";
          //z-index: 1;
          font-size: 7px;
          text-align: center;
          border-bottom: 1px solid gray;
          padding-bottom: 4px;
        }
      }
      button.up,
      button.down {
        cursor: pointer;
        background: none;
        border: none;
        position: relative;
        svg.bounce {
          transition: transform 0.3s ease-in-out;
          animation: bounce 1s ease-in-out infinite;
        }
      }
      @keyframes bounce {
        0% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(5px);
        }
        100% {
          transform: translateY(0);
        }
      }
      span.reserved {
        background-color: #ff5722;
      }
      span.pending {
        background-color: #757575;
      }
    }
  }

  .offset-right {
    margin-right: 0px;
  }

  .small {
    font-family: "Lato";
    font-style: normal;
    font-size: 12px;
    color: #828282;
  }

  .reserved {
    background-color: #ff5722;
    cursor: not-allowed;
  }

  span.pending {
    background-color: grey;
    z-index: 1;
    position: relative;
    cursor: not-allowed;
  }
  span.pending::after {
    /* position: absolute;
    bottom: 50%;
    left: -2px;
    display: block;
    width: 50px;
    height: 12px;
    content: "";
    z-index: -1;
    font-size: 7px;
    text-align: center;
    color: white; */
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
  // .flex span:nth-child(3) {
  //   font-size: 22px;
  // }

  button img {
    width: 16px;
  }
`;

export default TimeTable;
