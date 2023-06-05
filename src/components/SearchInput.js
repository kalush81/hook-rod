import React, { useEffect, useState } from "react";
import { Card, Select, Space, Form } from "antd";
import plCities from "../assets/data/cities-with-county.json";
const { Option } = Select;

let timeout;
let currentValue;

const fetchCities = (value, callback) => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  currentValue = value;
  const search = () => {
    if (currentValue === value) {
      const data = plCities.filter((city) => city.name.includes(currentValue));

      const matchedCities = data.map((city) => {
        return {
          value: {
            id: city.geonameid,
            lat: city.latitude,
            long: city.longitude,
            city: city.name,
            county: city.powiat,
          },
          text: city.name,
        };
      });
      callback(matchedCities);
    }
  };
  if (value) {
    timeout = setTimeout(search, 300);
  } else {
    callback([]);
  }
};

export const SearchInput = (props) => {
  const [data, setData] = useState([]);
  const [value, setValue] = useState();

  const handleSearch = (newValue) => {
    fetchCities(newValue, setData);
  };

  const handleChange = (newValue, _) => {
    //setValue(newValue);
  };
  const handleSelect = (_, option) => {
    props.setCoordsToForm(option.coords);
  };

  useEffect(() => {
    console.log("search input rendered");
  }, []);

  return (
    <Select
      className={props.className}
      size="large"
      showSearch
      value={value}
      placeholder={props.placeholder}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      onSelect={handleSelect}
      notFoundContent={true}
      optionLabelProp="label"
    >
      {data.map((d) => {
        return (
          <Option
            key={d.value.id}
            value={d.value.city}
            label={d.text}
            coords={{ lat: d.value.lat, long: d.value.long }}
          >
            <Space direction="vertical">
              <span aria-label={d.text}>{d.value.city}</span>
              <i style={{ fontSize: "9px", margin: 0 }}>({d.value.county})</i>
            </Space>
          </Option>
        );
      })}
    </Select>
  );
};
