import React, { useRef, useState } from "react";
import styled from "styled-components";

import "moment/locale/pl";
import plPL from "antd/lib/locale/pl_PL";
import { Select, DatePicker, ConfigProvider, Button } from "antd";
import { AutoComplete } from "antd/lib";
import moment from "moment";

// import cities from 'cities.json';
import { Link } from "gatsby";

// const plCities = cities.filter((citx) => citx.country === 'PL');
import plCities from "../assets/data/cities.json";

import { useLocation } from "../hooks/useLocation.js";

// const { Option } = Select;
const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) htmlElRef.current.focus();
  };

  return [htmlElRef, setFocus];
};

const SearchBox = () => {
  const [value, setValue] = useState("");
  const [cityQueryArr, setCityQueryArr] = useState([]);
  const [input1Ref, setInput1Focus] = UseFocus();
  const [input2Ref, setInput2Focus] = UseFocus();
  const [buttonRef, setButtonFocus] = UseFocus();
  const [latLng, setLatLng] = useState({});
  const [datkiFull, setDatkiFull] = useState([]);
  const [sEDate, setSEDate] = useState({});
  const [rangeVal, setRangeVal] = useState(50);
  const { latGeo, lngGeo, error } = useLocation();
  const [selectedStartDate, setSelectedStartDate] = useState("");

  const handleSearch = (valueStr) => {
    let res = [];

    if (!valueStr) {
      res = [];
    } else {
      res = plCities.filter((place) => {
        /* prettier-ignore */
        const regex = new RegExp('^' + valueStr, 'i');
        // const regex = /^[a-zA-Z]/;
        return place.name.match(regex);
      });
    }

    setCityQueryArr(res);
  };

  const onSelect = (location) => {
    console.log("onSelect", location);
    setValue(location[0]); //Set string of city selected
    setLatLng({
      lat: location[1],
      lng: location[2],
    });
    setInput1Focus();
  };

  const onChange = (data) => {
    setValue(data);
  };

  const handleChange = (range) => {
    setRangeVal(range);
    setInput2Focus();
  };

  const handleChangeFinish = (datka) => {
    console.log("what the fuck is datka", datka);
    let datki;
    if (datka) {
      datki = {
        s: `${datka[0].$d.toLocaleDateString("en-US", {
          year: "numeric",
        })}-${(
          0 +
          datka[0].$d.toLocaleDateString("en-US", {
            month: "numeric",
          })
        ).slice(-2)}-${(
          0 + datka[0].$d.toLocaleDateString("en-US", { day: "numeric" })
        ).slice(-2)}`,
        e: `${datka[1].$d.toLocaleDateString("en-US", {
          year: "numeric",
        })}-${(
          0 +
          datka[1].$d.toLocaleDateString("en-US", {
            month: "numeric",
          })
        ).slice(-2)}-${(
          0 +
          datka[1].$d.toLocaleDateString("en-US", {
            day: "numeric",
          })
        ).slice(-2)}`,
      };
    }
    setDatkiFull(datka);
    setSEDate(datki);
    setButtonFocus();
  };

  const handleCalendarCahnge = (dates) => {
    if (!dates) setSelectedStartDate("");
    if (dates && dates[0]) setSelectedStartDate(dates[0]);

    const todayDay = moment().add(-1, "days");
    const todayPlysTen = moment().add(10, "days");
    console.log("TODAY", todayDay);
    console.log("selected START DATE", selectedStartDate);
    console.log("TODAY = 10", todayPlysTen);
  };

  function disabledDate(current) {
    // console.log("CURRA DATA >>>", current);
    const todayDay = selectedStartDate
      ? moment(selectedStartDate).add(-0, "days")
      : moment().add(-1, "days");
    const todayPlysTen = selectedStartDate
      ? moment(selectedStartDate).add(10, "days")
      : moment().add(10, "days");

    if (!selectedStartDate) {
      return !todayDay.isSameOrBefore(current);
    }

    return !(todayDay.isSameOrBefore(current) && todayPlysTen.isAfter(current));
  }

  return (
    <ConfigProvider locale={plPL}>
      <SearchBoxCss>
        <div className="home_search_box">
          <h1 className="home_cover_header--big">HOOK&ROD</h1>
          <h2 className="home_cover_header">Znajdź łowiska blisko Ciebie</h2>
          <div className="home_cover_search">
            <AutoComplete
              className="home_cover_search_input"
              size="large"
              placeholder="Wpisz nazwę miejscowości"
              value={latGeo && lngGeo ? "Twoja Lokalizacja" : value}
              onSearch={handleSearch}
              onSelect={onSelect}
              onChange={onChange}
            >
              {cityQueryArr.map((citki, i) => (
                <Option
                  key={`${citki.name}-${i}`}
                  value={[citki.name, citki.lat, citki.lng]}
                >
                  {citki.name}
                </Option>
              ))}
            </AutoComplete>
            <Select
              className="home_cover_search_range"
              size="large"
              placeholder="+km  "
              showAction="focus"
              onChange={handleChange}
              ref={input1Ref}
            >
              <Option value="50">&lt; 50km</Option>
              <Option value="100">&lt; 100km</Option>
              <Option value="200">&lt; 200km</Option>
              <Option value="1000">&gt; 200km</Option>
            </Select>
            <RangePicker
              className="home_cover_search_date"
              size="large"
              placeholder={["Kiedy?"]}
              format="DD.MM.YY"
              showAction="focus"
              value={datkiFull}
              onChange={handleChangeFinish}
              onCalendarChange={handleCalendarCahnge}
              ref={input2Ref}
              disabledDate={disabledDate}
              allowClear={true}
              separator
            />
            <Link
              to={`/lowiska?distance=${rangeVal}&eday=${
                sEDate && sEDate.e
              }&sday=${sEDate && sEDate.s}&ulat=${latGeo ?? latLng.lat}&ulng=${
                lngGeo ?? latLng.lng
              }`}
              state={{
                srchdCity: value,
                cords: latLng,
                dates: sEDate,
                dist: rangeVal,
              }}
            >
              <Button
                className="home_cover_search_btn"
                type="primary"
                size="large"
                ref={buttonRef}
                style={{
                  width: 150,
                }}
              >
                SZUKAJ
              </Button>
            </Link>
          </div>
        </div>
      </SearchBoxCss>
    </ConfigProvider>
  );
};

const SearchBoxCss = styled.div`
  .home_search_box {
    padding: 21px 21px;
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.3);
    border-radius: 19px;
    width: 100%;
    max-width: 920px;
    height: 221px;
    background: rgba(22, 56, 50, 0.9);
  }
  .home_cover_header {
    width: 100%;
    /* max-width: 800px; */
    font-family: "Lato";
    font-size: 19px;
    font-weight: 500;
    text-align: center;
    color: var(--white);
    margin-bottom: 30px;
  }

  .home_cover_header--big {
    font-family: "Lato";
    font-size: 58px;
    font-weight: 700;
    text-align: center;
    color: var(--white);
    font-weight: bolder;
    margin-bottom: -20px;
  }

  .home_cover_search {
    width: 100%;
    /* max-width: 800px; */
    position: relative;
    display: flex;
    margin-bottom: 5px;
  }
  .home_cover_search_input {
    width: 200px;
    margin-right: 9px;
    font-size: 16px;
  }

  .home_cover_search_range {
    margin-right: 9px;
    width: 135px;
  }
  .home_cover_search_date {
    margin-right: 9px;
    width: 200px;
  }
  .home_cover_search_input_ico {
    position: absolute;
    right: 10px;
    top: 16px;
    font-size: 2.4rem;
    color: var(--green);
    font-weight: lighter;
  }

  .home_cover_search::placeholder {
    font-weight: lighter;
  }

  .home_cover_search_btn {
    background-color: var(--yellow);
    border-radius: 100px;
  }
  .ant-picker-range .ant-picker-clear {
    opacity: 1 !important;
  }

  .ant-picker-range .ant-picker-clear svg {
    transform: scale(1.39) !important;
  }

  @media screen and (max-width: 855px) {
    .home_search_box {
      height: 100%;
      width: 500px;
      padding: 27px 27px;
    }
    .home_cover_header {
      margin-bottom: 20px;
    }
    .home_cover_search {
      flex-direction: column;
      align-items: center;
    }
    .home_cover_search_input {
      width: 320px;
      font-size: 16px;
      margin-top: 5px;
    }
    .home_cover_search_range {
      width: 320px;
      margin-top: 5px;
    }
    .home_cover_search_date {
      width: 320px;
      margin-top: 5px;
    }
    .home_cover_search_btn {
      margin-top: 20px;
    }
  }
  @media screen and (max-width: 510px) {
    .home_search_box {
      width: 100%;
    }
    .home_cover_search {
      align-items: center;
    }
    .home_cover_search_input {
      width: 300px;
    }
    .home_cover_search_range {
      width: 300px;
    }
    .home_cover_search_date {
      width: 300px;
    }
  }
  @media screen and (max-width: 400px) {
    .home_cover_header--big {
      font-size: 50px;
    }
    .home_search_box {
      padding: 20px 20px;
    }
  }
`;

export default SearchBox;
