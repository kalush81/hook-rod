//TODO
// Wrap all inputs into ANT's Form

import React, { useRef, useState } from "react";
import "moment/locale/pl";
import { Select, DatePicker, Button } from "antd";
import { AutoComplete } from "antd/lib";
import moment from "moment";
import plCities from "../assets/data/cities.json";
const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

const UseFocus = () => {
  const htmlElRef = useRef(null);
  const setFocus = () => {
    if (htmlElRef.current) htmlElRef.current.focus();
  };
  return [htmlElRef, setFocus];
};

export const SearchForm = ({ className }) => {
  const [cityQueryArr, setCityQueryArr] = useState([]);
  const [latLng, setLatLng] = useState({});
  const [value, setValue] = useState("");
  //const [rangeVal, setRangeVal] = useState(50);
  const [datkiFull, setDatkiFull] = useState([]);
  //const [sEDate, setSEDate] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState("");
  //const [input1Ref, setInput1Focus] = UseFocus();
  const [input2Ref, setInput2Focus] = UseFocus();
  const [buttonRef, setButtonFocus] = UseFocus();

  const handleAutoCompleteSearch = (valueStr) => {
    let res = [];
    if (!valueStr) {
      res = [];
    } else {
      res = plCities.filter((place) => {
        const regex = new RegExp("^" + valueStr, "i");
        return place.name.match(regex);
      });
    }
    setCityQueryArr(() =>
      res.map((r) => {
        return {
          ...r,
          value: r.name,
        };
      })
    );
  };
  const handleAutoCompleteSelect = (value, option) => {
    setLatLng({
      lat: option.lat,
      lng: option.lng,
    });
    setValue(option.value);
    //setInput1Focus();
  };
  const handleAutoCompleteChange = (newchar) => {
    setValue((oldchar) => {
      return newchar;
    });
  };
  const handleAutoCompleteDropDown = (open) => {
    if (open) {
      setLatLng({});
    }
  };
  const handleAutoCompleteFocus = () => {
    setLatLng({});
  };

  const handleSelectDistanceFocus = (p) => {
    if (!latLng.lat || !latLng.lng) {
      setValue("");
    }
  };
  const handleSelectDistanceChange = (range) => {
    //setRangeVal(range);
    setInput2Focus();
  };

  const handleRangePickerChange = (datka) => {
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
    //setSEDate(datki);
    setButtonFocus();
  };
  const handleCalendarChange = (dates) => {
    if (!dates) setSelectedStartDate("");
    if (dates && dates[0]) setSelectedStartDate(dates[0]);

    //const todayDay = moment().add(-1, "days");
    //const todayPlysTen = moment().add(10, "days");
  };
  function disabledDate(current) {
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
    <>
      <AutoComplete
        className={className}
        onDropdownVisibleChange={handleAutoCompleteDropDown}
        onFocus={handleAutoCompleteFocus}
        size="large"
        placeholder="Wpisz nazwę miejscowości"
        value={value}
        onSearch={handleAutoCompleteSearch}
        onSelect={handleAutoCompleteSelect}
        onChange={handleAutoCompleteChange}
        options={cityQueryArr}
      ></AutoComplete>
      <Select
        onFocus={handleSelectDistanceFocus}
        className="home_cover_search_range"
        size="large"
        placeholder="zasięg"
        showAction="focus"
        onChange={handleSelectDistanceChange}
        // ref={input1Ref}
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
        onChange={handleRangePickerChange}
        onCalendarChange={handleCalendarChange}
        ref={input2Ref}
        disabledDate={disabledDate}
        allowClear={true}
        separator
      />
      {/* <Link
        to={`/lowiska?distance=${rangeVal}&eday=${sEDate && sEDate.e}&sday=${
          sEDate && sEDate.s
        }&ulat=${latGeo ?? latLng.lat}&ulng=${lngGeo ?? latLng.lng}`}
        state={{
          srchdCity: value,
          cords: latLng,
          dates: sEDate,
          dist: rangeVal,
        }}
      > */}
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
      {/* </Link> */}
    </>
  );
};
