import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import GlobalStyles from "./src/styles/GlobalStyles";
//import { ConfigProvider } from "antd";
//import plPL from "antd/lib/locale/pl_PL";

export function wrapPageElement({ element, props }) {
  return (
    <>
      <GlobalStyles />
      <Layout {...props}>{element}</Layout>;
    </>
  );
}
