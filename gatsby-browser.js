import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";

export function wrapPageElement({ element, props }) {
  return (
    <ConfigProvider locale={plPL}>
      <Layout {...props}>{element}</Layout>;
    </ConfigProvider>
  );
}
