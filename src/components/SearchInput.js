import React, { useEffect, useState } from "react";
import { Card, Select, Space } from "antd";
import plCities from "../assets/data/cities-with-county.json";
import { Form } from "antd";
const { Option } = Select;
// eslint-disable-next-line react-hooks/rules-of-hooks

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
      const data = plCities.filter((city) =>
        city.name.toLowerCase().includes(currentValue.toLowerCase())
      );

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
  //const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [value, setValue] = useState();
  //const [isCitySelected, setIsCitySelected] = useState(false);

  const handleSearch = (newValue) => {
    fetchCities(newValue, setData);
  };

  const handleChange = (newValue, _) => {
    setValue(newValue);
    //setIsCitySelected(false);
  };
  const handleSelect = (_, option) => {
    props.setCoordsToForm(option.coords);
    // setIsCitySelected(true);
    // form.validateFields(["city"]);
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
