import React from "react";
import styled from "styled-components";

import RegistrationForm from "../components/RegistrationForm";

const Registration = () => {
  return (
    <>
      <RegistrationCss className="reg_form">
        <RegistrationForm />
      </RegistrationCss>
    </>
  );
};

const RegistrationCss = styled.div`
  overflow: hidden;
`;

export default Registration;
