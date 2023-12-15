import React from "react";
import Layout from "./src/components/layout-comps/Layout";
//import { ConfigProvider } from "antd";
//import plPL from "antd/lib/locale/pl_PL";

export function wrapPageElement({ element, props }) {
  return (
    //use this config provider to custome style ANT's components
    // <ConfigProvider
    //   locale={plPL}
    //   theme={{
    //     token: {
    //       // Seed Token
    //       colorPrimary: "#00b96b",
    //       //borderRadius: 2,

    //       // Alias Token
    //       colorBgContainer: "#f6ffed",
    //     },
    //     components: {
    //       DatePicker: {
    //         cellHeight: 24,
    //       },
    //     },
    //   }}
    //>
    <Layout {...props}>{element}</Layout>
    // </ConfigProvider>
  );
}
