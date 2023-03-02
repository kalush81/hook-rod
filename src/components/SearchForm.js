import React, { useRef, useState } from "react";
import styled from "styled-components";

import "moment/locale/pl";
import plPL from "antd/lib/locale/pl_PL";
import { Select, DatePicker, ConfigProvider, Button } from "antd";
import { AutoComplete } from "antd/lib";
import moment from "moment";
import { Link } from "gatsby";
import plCities from "../assets/data/cities.json";

import { useGeoLocation } from "../hooks/useGeoLocation.js";

// const { Option } = Select;
const { RangePicker } = DatePicker;
const { Option } = AutoComplete;

export const SearchForm = ({
  onDropDown,
  onFocusAutoComplete,
  className,
  handleSearch,
  onSelect,
  onChange,
  cityQueryArr,
  value,
  onFocusDistanceSelect,
}) => {
  return (
    <>
      <AutoComplete
        onDropdownVisibleChange={onDropDown}
        onFocus={onFocusAutoComplete}
        //   backfill={true}
        //   onBlur={onBlur}
        className={className}
        size="large"
        placeholder="Wpisz nazwę miejscowości"
        //value={latGeo && lngGeo ? "Twoja Lokalizacja" : value}
        value={value}
        onSearch={handleSearch}
        onSelect={onSelect}
        //   onBlur={onBlur}
        onChange={onChange}
        options={cityQueryArr}
      >
        {/* {cityQueryArr.map((citki, i) => (
                <Option
                  //   label={`${citki.name}-${i}`}
                  key={`${citki.name}-${i}`}
                  value={[citki.name, citki.lat, citki.lng]}
                >
                  {citki.name}
                </Option>
              ))} */}
      </AutoComplete>
      <Select
        onFocus={onFocusDistanceSelect}
        className="home_cover_search_range"
        size="large"
        placeholder="zasięg"
        showAction="focus"
        // onChange={handleSelectDistanceChange}
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
        // value={datkiFull}
        // onChange={handleChangeFinish}
        // onCalendarChange={handleCalendarCahnge}
        // ref={input2Ref}
        // disabledDate={disabledDate}
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
        // ref={buttonRef}
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
