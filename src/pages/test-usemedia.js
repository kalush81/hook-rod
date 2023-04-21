import React, { useEffect } from "react";
import useWindowSize from "../hooks/useWindowSize";
import styled from "styled-components";
import TestComponent from "../components/TestComponent";

const TestUseMedia = () => {
  const size = useWindowSize();

  return (
    <TestDiv>
      <TestComponent size={size} />
    </TestDiv>
  );
};

const TestDiv = styled.div`
  padding: 7em;
  width: 100vw;
  height: 100vh;
  background-color: green;
`;

export default TestUseMedia;
