import React from "react";
import styled from "styled-components";
import { Div, PageContainer } from "../components/cssComponents/index"

import Faq from "../components/Faq.js";

const Frequently_asked = () => {
  return (
    <PageContainer>
      <Div>
        <FAQCss className="reg_form">
          <Faq />
          {/* <p>adasdas</p> */}
        </FAQCss>
      </Div>
      </PageContainer>
  );
};

const FAQCss = styled.div`
  padding-top: 90px;
`;

export default Frequently_asked;
