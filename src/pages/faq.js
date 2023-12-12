import React from 'react';
import styled from 'styled-components';
import { Div, PageContainer } from '../components/cssComponents/index';

const Frequently_asked = () => {
  return (
    <PageContainer>
      <Div>
        <FAQCss className='reg_form'>
          <div className='main-box'>
            <h1>FAQ</h1>
          </div>
        </FAQCss>
      </Div>
    </PageContainer>
  );
};

const FAQCss = styled.div`
  padding-top: 90px;
`;

export default Frequently_asked;
