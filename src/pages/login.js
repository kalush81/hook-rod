import React from "react";
import styled from "styled-components";

import LoginForm from "../components/LoginForm";

const Login = () => {
  return (
    <>
      <LoginCss className="reg_form">
        <LoginForm />
      </LoginCss>
    </>
  );
};

const LoginCss = styled.div`
  overflow: hidden;
`;

export default Login;
