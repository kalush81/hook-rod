import React from 'react';
import dayjs from 'dayjs';
import { navigate } from 'gatsby';
import { Select, DatePicker, Button, Form } from 'antd';
import { SearchInput } from './SearchInput';
import 'antd/es/date-picker/style';
const { RangePicker } = DatePicker;
const { Option } = Select;

export const SearchForm = ({ className }) => {
  const [form] = Form.useForm();

  const handleFinishForm = (param) => {
    return navigate('/lowiska', { state: { ...param } });
  };

  const setCoordsToForm = (coords) => {
    form.setFieldsValue({ city: coords });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <Form form={form} onFinish={handleFinishForm} className='home_cover_search'>
      <Form.Item
        name='city'
        rules={[
          {
            required: true,
            message: 'wybierz miasto',
          },
        ]}>
        <SearchInput
          setCoordsToForm={setCoordsToForm}
          className='home_cover_search_input'
          placeholder='Wybierz miejscowość'
        />
      </Form.Item>

      <Form.Item
        className='home_cover_search_range'
        name='distance'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać dystans z listy!',
          },
        ]}>
        <Select size='large' placeholder='Odległość' showAction='focus'>
          <Option value='50'>&lt; 50km</Option>
          <Option value='100'>&lt; 100km</Option>
          <Option value='200'>&lt; 200km</Option>
          <Option value='1000'>&gt; 200km</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name='dates'
        rules={[
          {
            required: true,
            message: 'Proszę wybrać daty!',
          },
        ]}>
        <RangePicker
          picker='date'
          disabledDate={disabledDate}
          className='home_cover_search_date'
          size='large'
          placeholder={['Kiedy?']}
          format='DD.MM.YY'
          showAction='focus'
          allowClear={true}
          separator
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          className='home_cover_search_btn'
          style={{
            width: 150,
          }}>
          SZUKAJ
        </Button>
      </Form.Item>
    </Form>
  );
};
