import React, { useEffect, useState } from "react";
import { navigate } from "gatsby";
import { Select, DatePicker, Button, Form } from "antd";
//import plCities from "../assets/data/cities-with-county.json";
import { SearchInput } from "./SearchInput";
const { RangePicker } = DatePicker;
const { Option } = Select;

// const UseFocus = () => {
//   const htmlElRef = useRef(null);
//   const setFocus = () => {
//     if (htmlElRef.current) htmlElRef.current.focus();
//   };
//   return [htmlElRef, setFocus];
// };

export const SearchForm = ({ className }) => {
  // useEffect(() => {
  //   const fetchCities = async (value, callback) => {
  //     console.log("all cities", plCities);
  //   };
  //   fetchCities();
  // }, []);
  const [form] = Form.useForm();
  const [firstCharIsSet, setFirstCharIsSet] = useState(null);
  const [coords, setCoords] = useState(null);
  const [cityName, setCityName] = useState("");

  const handleFinishForm = (param) => {
    console.log("on finish form params", param);
    return navigate("/lowiska", { state: { ...param } });
  };

  const setCoordsToForm = (coords) => {
    //setCoords(coords);
    form.setFieldValue("city", coords);
    // setCityWithCoords(() => {
    //   return {
    //     city,
    //     coords,
    //   };
    // });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinishForm}
      className="home_cover_search"
      onFieldsChange={(changedFields, allFields) =>
        console.log("changed fields: ", changedFields, "allFields:", allFields)
      }
    >
      <Form.Item
        name="city"
        rules={[
          {
            required: true,
            message: "kurrrwa",
          },
        ]}
      >
        <SearchInput
          setCoordsToForm={setCoordsToForm}
          className="home_cover_search_input"
          placeholder="wybierz miejscowość"
        />
      </Form.Item>

      {/* <AutoComplete
        className={className}
        size="large"
        options={plCities.map((city) => {
          return { value: <p>{city.name}</p> };
        })}
        filterOption={(inputValue, option) =>
          option.value.props.children
            .toUpperCase()
            .indexOf(inputValue.toUpperCase()) !== -1
        }
        placeholder="Wpisz nazwę miejscowości"
        //value={cityWithCoords ? cityWithCoords.city : ""}
        onSelect={handleAutoCompleteSelect}
        //onChange={(value) => setFirstCharIsSet(value)}
      >
        {firstCharIsSet &&
          plCities.map((option) => (
            <AutoComplete.Option
              key={option.geonameid}
              value={
                <>
                  <p style={{ margin: "0" }}>{option.name}</p>
                  <i
                    style={{
                      margin: 0,
                      fontSize: "9px",
                    }}
                  >
                    {option.powiat}
                  </i>
                </>
              }
              label={option.name}
              coords={{ lat: option.latitude, long: option.longitude }}
            >
              {option.label}
            </AutoComplete.Option>
          ))}
      </AutoComplete> */}

      <Form.Item
        className="home_cover_search_range"
        name="distance"
        rules={[
          {
            required: true,
            message: "Proszę wybrać dystans z listy!",
          },
        ]}
      >
        <Select size="large" placeholder="zasięg" showAction="focus">
          <Option value="50">&lt; 50km</Option>
          <Option value="100">&lt; 100km</Option>
          <Option value="200">&lt; 200km</Option>
          <Option value="1000">&gt; 200km</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="dates"
        rules={[
          {
            required: true,
            message: "Proszę wybrać daty!",
          },
        ]}
      >
        <RangePicker
          className="home_cover_search_date"
          size="large"
          placeholder={["Kiedy?"]}
          format="DD.MM.YY"
          showAction="focus"
          allowClear={true}
          separator
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="home_cover_search_btn"
          style={{
            width: 150,
          }}
        >
          SZUKAJ
        </Button>
      </Form.Item>
    </Form>
  );
};
