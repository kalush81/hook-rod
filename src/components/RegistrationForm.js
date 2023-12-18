import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Select, Checkbox, Button } from 'antd';
import { Div } from '../components/cssComponents';

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 0,
    },
  },
};

const Registration_Form = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        ['.com', '.org', '.net'].map((domain) => `${value}${domain}`)
      );
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));
  return (
    <RegistrationCss>
      <Div>
        <div className='row'>
          <div className='column column-left'>
            <h1>Utwórz konto</h1>
            <div className='form'>
              <Form
                {...formItemLayout}
                className='form'
                form={form}
                name='register'
                onFinish={onFinish}
                scrollToFirstError>
                <Form.Item
                  name='imie'
                  // label="Imię"
                  rules={[
                    {
                      required: true,
                      message: 'Podaj imię!',
                    },
                  ]}>
                  <Input
                    placeholder='Imię'
                    size='large'
                    className='imie'
                    style={{ height: 44.5 }}
                  />
                </Form.Item>

                <Form.Item
                  name='nazwisko'
                  // label="Nazwisko"
                  rules={[
                    {
                      required: true,
                      message: 'Podaj nazwisko!',
                    },
                  ]}>
                  <Input
                    placeholder='Nazwisko'
                    size='large'
                    className='nazwisko'
                    style={{ height: 44.5 }}
                  />
                </Form.Item>

                <Form.Item
                  name='email'
                  // label="E-mail"
                  rules={[
                    {
                      type: 'email',
                      message: 'Niepoprawny adres e-mail!',
                    },
                    {
                      required: true,
                      message: 'Podaj adres e-mail!',
                    },
                  ]}>
                  <Input
                    placeholder='Adres e-mail'
                    size='large'
                    className='e-mail'
                    style={{ height: 44.5 }}
                  />
                </Form.Item>

                <Form.Item
                  name='password'
                  // label="Password"
                  rules={[
                    {
                      required: true,
                      message: 'Wpisz hasło!',
                    },
                  ]}
                  hasFeedback>
                  <Input.Password
                    placeholder='Hasło'
                    size='large'
                    className='password'
                    style={{ height: 44.5 }}
                  />
                </Form.Item>

                <Form.Item
                  name='confirm'
                  // label="Confirm Password"
                  dependencies={['password']}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: 'Powtórz hasło!',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('password') === value) {
                          return Promise.resolve();
                        }

                        return Promise.reject(
                          new Error(
                            'The two passwords that you entered do not match!'
                          )
                        );
                      },
                    }),
                  ]}>
                  <Input.Password
                    className='confirm_password'
                    placeholder='Powtórz hasło'
                    size='large'
                    style={{ height: 44.5 }}
                  />
                </Form.Item>

                <Form.Item
                  name='agreement'
                  valuePropName='checked'
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error('Zaakceptuj regulamin!')),
                    },
                  ]}
                  {...tailFormItemLayout}>
                  <Checkbox className='checkbox' size='large'>
                    Zakładając konto akceptujesz nasz <a href=''>Regulamin</a>.
                  </Checkbox>
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                  <Button
                    className='register-button'
                    size='large'
                    type='primary'
                    htmlType='submit'>
                    Załóż konto
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className='column column-right'>
            <h1>Dlaczego warto mieć konto w LETSFISH ?</h1>
            <h2>Oszczędność Czasu i Energii</h2>
            <p>
              Unikaj zbędnych formalności i stresu związanego z tradycyjnymi
              metodami rezerwacji. Nasz system pozwala zaoszczędzić czas, który
              można przeznaczyć na samą przyjemność z wędkowania.
            </p>
            <h2>Rabaty i Programy Lojalnościowe</h2>
            <p>
              Oferujemy różne korzyści dla stałych klientów, w tym rabaty oraz
              programy lojalnościowe. Im częściej korzystasz z naszej platformy,
              tym więcej możesz zyskać.
            </p>
            <h2>Wsparcie Techniczne</h2>
            <p>
              Nasz zespół wsparcia klienta jest gotów odpowiedzieć na Twoje
              pytania, pomóc w rozwiązaniu problemów technicznych i udzielić
              wszelkich informacji potrzebnych do udanej rezerwacji.
            </p>
            <h2>Zachowanie Elastyczności</h2>
            <p>
              Nasz system umożliwia elastyczne dostosowywanie terminów
              rezerwacji, co pozwala na dopasowanie wędkarskich planów do
              Twojego harmonogramu.
            </p>
            <i>
              Korzystanie z naszego systemu to nie tylko wybór łowiska, ale
              także sposób na ułatwienie i wzbogacenie Twojego wędkarskiego
              doświadczenia.
            </i>
          </div>
        </div>
      </Div>
    </RegistrationCss>
  );
};

const RegistrationCss = styled.div`
  width: 100%;
  top: 0;
  background: var(--white);
  z-index: 11;
  font-family: Lato;
  padding: 60px 0 120px 0;

  .row {
    display: flex;
    //border: 1px solid black;
    //height: calc(100vh - 160px);
  }
  .column {
    width: 50%;
    //margin-top: 80px;
    //max-width: 1000px;
  }

  .column-left h1 {
    text-align: center;
    font-size: 48px;
    margin-bottom: 70px;
    margin-top: 20px;
  }
  .column-left {
    font-size: 14px;
  }
  .ant-row {
    /* justify-content: center; */
  }
  .ant-form-item-control-input {
    width: 105%;
  }
  .column-right {
    //max-height: calc(100vh - 160px);
    //border: 2px solid red;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .column-right h1 {
    text-align: center;
    //font-size: 32px;
    //line-height: 24px;
    //margin-bottom: 25px;
  }
  .column-right h2 {
    margin: 0;
    padding: 0;
    text-align: center;
    //font-size: 20px;
    //line-height: 24px;
    color: var(--yellow);
    //margin-left: 125px;
  }
  .column-right p {
    margin: 0;
    padding: 0;
    color: var(--green);
    //letter-spacing: 1px;
    //line-height: 2.3rem;
  }
  .form {
    width: 100%;
  }
  .register-button {
    background-color: var(--yellow);
    margin-top: 30px;
    border-radius: 100px;
    width: 210px;
    height: 50px;
  }
  @media screen and (max-height: 692px) {
    height: 100%;
  }
`;

export default Registration_Form;
