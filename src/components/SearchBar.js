import React, { useRef, useState } from "react";
import styled from "styled-components";
import "moment/locale/pl";
import plPL from "antd/lib/locale/pl_PL";
import { Select, DatePicker, ConfigProvider, Button } from "antd";
import { AutoComplete } from "antd/lib";
import { Link } from "gatsby";
import cities from "cities.json";

const plCities = cities.filter((city) => city.country === "PL");

const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
};

const SearchBar = ({ cityName, rangeProp, datesProp, ulat, ulng }) => {
  const [value, setValue] = useState();
  const [cityQueryArr, setCityQueryArr] = useState([]);
  const [input1Ref, setInput1Focus] = UseFocus();
  const [input2Ref, setInput2Focus] = UseFocus();
  const [buttonRef, setButtonFocus] = UseFocus();
  const [latLng, setLatLng] = useState({ lat: ulat, lng: ulng });
  const [sEDate, setSEDate] = useState({});
  const [rangeVal, setRangeVal] = useState(rangeProp);
  const [dFull, setDFull] = useState(datesProp);

  const handleSearch = (valueStr) => {
    let res = [];
    if (!valueStr) {
      res = [];
    } else {
      res = plCities.filter((place) => {
        const regex = new RegExp("^" + valueStr, "i");
        return place.name.match(regex);
      });
    }
    setCityQueryArr(res);
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
    setValue(data[0]);
    setLatLng({
      lat: data[1],
      lng: data[2],
    });
    setInput1Focus();
  };

  const onChange = (data) => {
    setValue(data);
    console.log(data);
  };

  const handleChange = (range) => {
    setRangeVal(range);
    setInput2Focus();
  };

  const handleChangeFinish = (datka) => {
    const datki = {
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
    setDFull(datka);
    setSEDate(datki);
    setButtonFocus();
  };
  const filterOption = (inputValue, option) => {
    return option.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1;
  };
  return (
    <ConfigProvider locale={plPL}>
      <SearchBarCss>
        <div className="lowi_search_bar">
          <div className="lowi_search">
            <AutoComplete
              //   filterOption={filterOption}
              readOnly
              className="lowi_search_input"
              size="large"
              style={{
                width: 460,
              }}
              placeholder="Wpisz nazwę miejscowośći"
              value={value}
              onSearch={handleSearch}
              onSelect={onSelect}
              onChange={onChange}
              //   options={cityQueryArr}
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
              className="lowi_search_range"
              size="large"
              placeholder="+km  "
              showAction="focus"
              value={rangeVal}
              onChange={handleChange}
              ref={input1Ref}
            >
              <Option value="50">&lt; 50km</Option>
              <Option value="100">&lt; 100km</Option>
              <Option value="200">&lt; 200km</Option>
              <Option value="1000">&gt; 200km</Option>
            </Select>
            <RangePicker
              className="lowi_search_date"
              size="large"
              placeholder={["Wybierz Datę", "Wybierz Datę"]}
              format="DD.MM.YY"
              showAction="focus"
              value={dFull}
              onChange={handleChangeFinish}
              ref={input2Ref}
            />
            <Link
              to={`/lowiska?distance=${rangeVal}&eday=${sEDate.e}&sday=${
                sEDate.s
              }&ulat=${ulat || latLng.lat}&ulng=${ulng || latLng.lng}`}
              state={{
                srchdCity: value,
                cords: latLng,
                dates: sEDate,
                dist: rangeVal,
              }}
            >
              <Button
                className="search_button"
                type="primary"
                size="large"
                ref={buttonRef}
              >
                Szukaj
              </Button>
            </Link>
          </div>
        </div>
      </SearchBarCss>
    </ConfigProvider>
  );
};

const SearchBarCss = styled.div`
  .lowi_search_bar {
    width: 100%;
    height: 63px;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 69px;
    left: 0;
    padding: 10.5px;
    border-bottom: 2px solid var(--offwhite);
    background: var(--white);
    z-index: 11;
  }
  .lowi_search {
    width: 100%;
    max-width: 1140px;
    display: flex;
  }
  .lowi_search_input {
    width: 80%;
    margin-right: 9px;
    font-size: 16px;
  }

  .lowi_search_range {
    min-width: 120px;
    margin-right: 9px;
  }
  .lowi_search_date {
    margin-right: 9px;
  }
  .lowi_search_input_ico {
    position: absolute;
    right: 10px;
    top: 16px;
    font-size: 2.4rem;
    color: var(--green);
    font-weight: lighter;
  }

  .lowi_search::placeholder {
    font-weight: lighter;
  }
  .search_button_small {
    display: none;
  }
  @media screen and (max-width: 510px) {
    .search_button {
      display: none;
    }
    .search_button_small {
      display: block;
    }
  }
`;

export default SearchBar;
