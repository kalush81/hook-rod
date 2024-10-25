import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";
import { UserProvider } from "./src/constext/UserContext";

export function wrapPageElement({ element, props }) {
  return (
    <ConfigProvider locale={plPL}>
      <UserProvider>
        <Layout {...props}>{element}</Layout>;
      </UserProvider>
    </ConfigProvider>
  );
}
