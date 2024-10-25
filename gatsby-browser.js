import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";
import { UserProvider } from "./src/constext/UserContext";

export function wrapPageElement({ element, props }) {
  return (
    <UserProvider>
      <ConfigProvider locale={plPL}>
        <Layout {...props}>{element}</Layout>;
      </ConfigProvider>
    </UserProvider>
  );
}
