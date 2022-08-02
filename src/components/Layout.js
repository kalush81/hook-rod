import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";

import "normalize.css";
import GlobalStyles from "../styles/GlobalStyles";

const Layout = ({ children }) => (
  <div>
    <GlobalStyles />
    <Nav />
    {children}
    <Footer />
  </div>
);

export default Layout;
