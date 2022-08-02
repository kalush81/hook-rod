import React from "react";
import styled from "styled-components";

const Faq = () => {
  return (
    <FAQCss>
      <div className="main-box">
        <h1>FAQ</h1>
      </div>
    </FAQCss>
  );
};

const FAQCss = styled.div`
  padding: 25px;
  background: var(--white);
  z-index: 11;
  font-family: Lato;

  .main-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 14px;
    align-items: stretch;
  }

  .main-box h1 {
    text-align: center;
    font-size: 48px;
    margin-bottom: 70px;
  }
  ${
    "" /* .login-button {
    background-color: var(--purple);
    margin-top: 30px;
    border-radius: 100px;
    width: 100%;
    height: 50px;
  }
  .login-button-facebook,
  .login-button-google,
  .register-button {
    width: 100%;
    background-color: white;
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
  }
  a {
    text-decoration: underline;
    color: black;
    font-weight: 500;
    font-size: 13px;
    line-height: 16px;
  }
  a:hover {
  background-color: var(--purple);
} */
  }
`;

export default Faq;
