import React, { useState } from 'react';
import { Div } from './cssComponents';
import styled from 'styled-components';
import { Collapse } from 'react-collapse';

export const LakeTerms = ({ lakeName }) => {
  const [opened, setOpened] = useState(false);
  const toggleOpened = () => setOpened((value) => !value);

  return (
    <Div>
      <Section>
        <div className='lowisko_regu'>
          <h2>Regulamin Łowiska</h2>
          <div className='lowisko_regu_body'>
            <h3
              className='text_toggle'
              onClick={toggleOpened}
              style={{ color: 'red' }}>
              Regulamin Łowiska {lakeName} {opened ? ' v' : ' >'}
            </h3>
            <Collapse isOpened={opened}>{'regulations'}</Collapse>
            <div className='text_toggle' onClick={toggleOpened}>
              {opened ? 'Zwiń...' : 'Rozwiń...'}
            </div>
          </div>
        </div>
      </Section>
    </Div>
  );
};

const Section = styled.section`
  width: 100%;
  .lowisko_regu {
    padding-bottom: 60px;
  }
`;
