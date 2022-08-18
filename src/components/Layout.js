import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";

import "normalize.css";
import GlobalStyles from "../styles/GlobalStyles";

const Layout = ({ children }) => (
  <GridDiv>
    <GlobalStyles />
    <Nav />
    <div></div>
    {children}
    <Footer />
  </GridDiv>
);

export default Layout;

export const GridDiv = styled.div``;
