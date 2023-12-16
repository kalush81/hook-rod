import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import GlobalStyles from "./src/styles/GlobalStyles";
//import plPL from "antd/lib/locale/pl_PL";

export function wrapPageElement({ element, props }) {
  return (
    <>
      <Layout {...props}>{element}</Layout>;
    </>
  );
}
