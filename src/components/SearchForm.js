import React, { useState } from "react";
import { navigate } from "gatsby";
import { Select, DatePicker, Button, Form } from "antd";
import { AutoComplete } from "antd/lib";
import plCities from "../assets/data/only-cities.json";
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
  const [form] = Form.useForm();
  const [firstCharIsSet, setFirstCharIsSet] = useState(null);
  const [cityWithCoords, setCityWithCoords] = useState(null);

  const handleFinishForm = (param) => {
    console.log("finish form ok", param);
    // console.log(form.getFieldsValue(["city", "distance", "dates"]));
    // console.log("valid form", form);
    // console.log(
    //   "form ok , any errors? ",
    //   form.getFieldsError().some((field) => field.warnings.length > 0)
    // );
    // console.log("przekieruj do strony§ ");
    return navigate("/lowiska", { state: { ...param } });
  };
  const handleFinishFailed = (param) => {
    console.log("finish form failed param", param);
    console.log("invali form errors", form.getFieldsError());
  };

  const handleAutoCompleteSelect = (city, { coords }) => {
    form.setFieldValue("city", coords);
    setCityWithCoords(() => {
      return {
        city,
        coords,
      };
    });
  };

  return (
    <Form
      form={form}
      onFinish={handleFinishForm}
      onFinishFailed={handleFinishFailed}
      className="home_cover_search"
    >
      <Form.Item
        //className={className}
        name="city"
        rules={[
          {
            required: true,
            message: "Proszę wybrać miasto z listy!",
          },
        ]}
      >
        <AutoComplete
          className={className}
          size="large"
          filterOption={(inputValue, option) =>
            option.props.label.toUpperCase().includes(inputValue.toUpperCase())
          }
          placeholder="Wpisz nazwę miejscowości"
          value={cityWithCoords ? cityWithCoords.city : ""}
          onSelect={handleAutoCompleteSelect}
          onChange={(value) => setFirstCharIsSet(value)}
        >
          {firstCharIsSet &&
            plCities.map((option) => (
              <AutoComplete.Option
                key={option.geonameid}
                value={option.name}
                label={option.name}
                coords={{ lat: option.latitude, long: option.longitude }}
              >
                {/* {option.label} */}
              </AutoComplete.Option>
            ))}
        </AutoComplete>
      </Form.Item>
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
