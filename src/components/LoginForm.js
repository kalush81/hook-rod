import React, { useState } from 'react';
import styled from 'styled-components';

import { Link, navigate } from 'gatsby';

import { Form, Input, Button } from 'antd';
import gmail_login_logo from '../assets/images/gmail_login_logo.png';
import facebook_login_logo from '../assets/images/facebook_login_logo.png';
import { useUser } from '../constext/UserContext';

// const { Option } = Select;
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
      offset: 4,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

const Login_Form = () => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);
  const { login, user } = useUser();

  const onFinish = async ({ email, password }) => {
    //console.log('Received values of form: ', email, password);
    try {
      const response = await fetch(
        'https://hookandrod.herokuapp.com/api/auth/signin',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
          },
          withCredentials: false,
          credentials: 'same-origin',
          crossdomain: true,
          body: JSON.stringify({ username: email, password: password }),
        }
      );

      if (response.ok) {
        //console.log('response ok: ', response);
        const userData = await response.json();
        //console.log('userData', userData);
        login(userData); // Ustaw użytkownika w kontekście
        //user && console.log('user:', user);

        // Przekierowanie na stronę główną po udanym logowaniu
        navigate('/');
      } else {
        // Obsługa błędów logowania
        console.error('Błąd logowania');
        setError('blad logowania');
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Css>
      <div className='login-form'>
        <h1>Witaj ponownie!</h1>
        <div className='form'>
          <Form
            {...formItemLayout}
            className='form'
            form={form}
            name='register'
            onFinish={onFinish}
            scrollToFirstError>
            <Form.Item
              className='form-element'
              name='email'
              // label="E-mail"
              rules={[
                // {
                //   type: 'string',
                //   message: 'Niepoprawny adres e-mail!',
                // },
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
              className='form-element'
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

            <Form.Item {...tailFormItemLayout}>
              <Button
                className='form-element login-button'
                size='large'
                type='primary'
                htmlType='submit'>
                Zaloguj się
              </Button>
            </Form.Item>

            <Form.Item {...formItemLayout}>
              <Link to='' className='form-element link'>
                ZAPOMNIAŁEŚ HASŁO?
              </Link>
            </Form.Item>

            {/* <Form.Item {...tailFormItemLayout}>
              <Button
                className='form-element login-button-facebook'
                size='large'
                type='primary'
                htmlType='submit'>
                KONTYNUUJ UŻYWAJĄC FACEBOOKA
              </Button>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                className='form-element login-button-google'
                size='large'
                type='primary'
                htmlType='submit'>
                KONTYNUUJ UŻYWAJĄC GOOGLE
              </Button>
            </Form.Item> */}

            <Form.Item {...formItemLayout}>
              <h3 className='form-element lub'>LUB</h3>
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                className='form-element register-button'
                size='large'
                type='primary'
                htmlType='submit'>
                ZAREJESTRUJ SIĘ
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Css>
  );
};

const Css = styled.div`
  height: calc(100% - 120px);
  width: 100vw;
  position: absolute;
  display: flex;
  justify-content: center;
  background: var(--white);
  z-index: 11;
  font-family: Lato;
  overflow-x: hidden;
  overflow-y: scroll;

  .login-form {
    max-width: 1000px;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    font-size: 14px;
    margin-top: 80px;
  }

  .login-form h1 {
    text-align: center;
    font-size: 48px;
    margin-bottom: 30px;
  }
  .login-button {
    background-color: var(--yellow);
    margin-top: 30px;
    border-radius: 100px;
    width: 100%;
    height: 50px;
  }
  .login-button-facebook,
  .login-button-google,
  .register-button {
    width: 100%;
    background-color: white !important;
    border-radius: 10px;
    color: black;
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    padding-top: 7px;
    height: 45px;
  }
  .login-button-facebook {
    margin-top: 5px;
    background: url(${facebook_login_logo});
    background-repeat: no-repeat;
    background-position: 2% 50%;
    background-size: 26px 26px;
  }
  .login-button-google {
    background: url(${gmail_login_logo});
    background-repeat: no-repeat;
    background-position: -0.5% 50%;
  }
  .lub {
    color: black;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
  }
  .register-button {
    margin-top: -10px;
  }
  a {
    text-decoration: underline;
    color: black;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
  }
  a:hover {
    background-color: var(--yellow);
  }
  @media screen and (max-width: 510px) {
    .login-form h1 {
      font-size: 30px;
    }
  }
  @media screen and (max-height: 692px) {
    height: 100%;
  }
`;

export default Login_Form;
