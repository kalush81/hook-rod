import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const CalendarMedium = function ({ id, lowiskoDataProp }) {
  const [bookedDays, setBookedDays] = useState([]);

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

  return (
    <CalendarCss>
      <div>{id}</div>

      <header className="calendar_header">
        <h3>Sprawdź dostępne terminy</h3>
        <button className="dates_full_btn">Terminarz</button>
      </header>

      <div className="calendr_date_selector"></div>
      <div className="calendar_lowiska_list">
        {pegs &&
          pegs.map((peg, i) => (
            <div className="calendar_lowisko_num">
              <span className="calendar_lowisko_day_box_num">
                {peg.pegNumber}
              </span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
              <span className="calendar_lowisko_day_box"></span>
            </div>
          ))}
      </div>
    </CalendarCss>
  );
};

const CalendarCss = styled.div`
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
`;

export default CalendarMedium;
