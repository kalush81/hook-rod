import React from "react";
import styled from "styled-components";

import ONas from "../components/ONas.js";

const O_nas = () => {
  return (
    <>
      <ONasCss className="reg_form">
        <ONas />
      </ONasCss>
    </>
  );
};

const ONasCss = styled.div`
  padding-top: 90px;
`;

export default O_nas;
