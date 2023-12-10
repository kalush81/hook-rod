import React from "react";
import Layout from "./src/components/Layout";
import { ConfigProvider } from "antd";

export function wrapPageElement({ element, props }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          // Seed Token
          colorPrimary: "#00b96b",
          //borderRadius: 2,

          // Alias Token
          colorBgContainer: "#f6ffed",
        },
        components: {
          DatePicker: {
            cellHeight: 24,
          },
        },
      }}
    >
      <Layout {...props}>{element}</Layout>
    </ConfigProvider>
  );
}
