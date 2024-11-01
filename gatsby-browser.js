import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";
import { UserProvider } from "./src/constext/UserContext";
import "antd/dist/reset.css";

export function wrapRootElement({ element, props }) {
  return (
    <ConfigProvider locale={plPL}>
      <UserProvider>
        <Layout {...props}>{element}</Layout>
      </UserProvider>
    </ConfigProvider>
  );
}
