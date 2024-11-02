import React from "react";
import Layout from "./src/components/layout-comps/Layout";
import { ConfigProvider } from "antd";
import plPL from "antd/locale/pl_PL";
import { UserProvider } from "./src/constext/UserContext";
import {
  legacyLogicalPropertiesTransformer,
  StyleProvider,
} from "@ant-design/cssinjs";

export function wrapRootElement({ element, props }) {
  return (
    <StyleProvider transformers={[legacyLogicalPropertiesTransformer]}>
      <ConfigProvider locale={plPL}>
        <UserProvider>
          <Layout {...props}>{element}</Layout>
        </UserProvider>
      </ConfigProvider>
    </StyleProvider>
  );
}
