import React from "react";
import styled from "styled-components";

import Faq from "../components/Faq.js";

const Frequently_asked = () => {
  return (
    <>
      <FAQCss className="reg_form">
        <Faq />
      </FAQCss>
    </>
  );
};

const FAQCss = styled.div`
  padding-top: 90px;
`;

export default Frequently_asked;
