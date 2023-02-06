import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PegDatesRow from "./PegDatesRow";
import axios from "axios";
import moment from "moment";
import { getCallendarString } from "../utils/get-date-string";
import { useContext } from "react";
import { DatesReservedContext } from "./datesReservationContext";

const TimeTable = function ({ id, maxPegs, maxDays }) {
  const [firstIdx, setFirstIdx] = useState(0);
  const [lastIdx, setLastIdx] = useState(maxPegs);
  const [otherDays, setOtherDays] = useState(0);
  const [pegs, setPegsData] = useState();
  const { value, setValue } = useContext(DatesReservedContext);

  const setPegsDataForReservationComponent = (data) => {
    setValue(data);
  };

  useEffect(() => {
    const getLakeReservsById = async () => {
      try {
        const response = await axios.get(
          `https://hookandrod.herokuapp.com/api/lakes/${id}`,
          {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: false,
            credentials: "same-origin",
            crossdomain: true,
          }
        );
        setPegsData(response.data.pegs);
        setPegsDataForReservationComponent(response.data.pegs);
      } catch (error) {
        console.error("error while fetching reservations data", error);
      }
    };
    getLakeReservsById();
  }, [id]);

  const resetQueue = () => {
    setFirstIdx(0);
    setLastIdx(maxPegs);
  };

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
      moment(moment().add(otherDays, "day").format()).add(i, "day").format("L")
    );

  return (
    <CalendarCss>
      {/* <div>{id}</div> */}
      <header className="calendar_header">
        <h3 style={{ textAlign: "center" }}>Terminarz rezerwacji</h3>
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
        <span>{getCallendarString(daysArr)}</span>
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

        {daysArr.map((day) => {
          return (
            <span key={day} className="calendar_lowisko_day_box small noStyle">
              {day.substring(0, 5)}
            </span>
          );
        })}
      </div>

      <div className="calendar_lowiska_list border">
        {pegs &&
          pegs.map((peg, i) => {
            if (i >= firstIdx && i < lastIdx) {
              return (
                <PegDatesRow
                  key={peg.pegNumber}
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
    /* justify-content: space-around; */
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
    display: flex;
    justify-content: space-between;
    align-items: end;
    padding-bottom: 8px;
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
    background-color: #e70000;
    cursor: not-allowed;
  }

  span.pending {
    background-color: grey;
    z-index: 1;
    position: relative;
    cursor: not-allowed;
  }
  span.pending::after {
    position: absolute;
    bottom: 50%;
    left: -2px;
    display: block;
    width: 50px;
    height: 12px;
    content: "rezerwacja oczekująca";
    z-index: -1;
    font-size: 7px;
    text-align: center;
    color: white;
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

export default TimeTable;
