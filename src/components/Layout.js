import React, { useState } from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import styled from "styled-components";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
//import "normalize.css";
import GlobalStyles from "../styles/GlobalStyles";

const Layout = ({ children, path }) => {
  console.log("children", children);
  console.log("path", path);
  //const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  return (
    <div /*style={{ padding: "60px 0 120px 0" }} */>
      {/* <Sider trigger={null} collapsible collapsed={true} /> */}
      <GlobalStyles />
      <Nav />
      {children}

      <Footer
        style={{ textAlign: "center" }}
      >
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </div>
  );
  // return (
  //   <>
  //     <GlobalStyles />
  //     <Layout>
  //       <Sider
  //         trigger={null}
  //         collapsible
  //         collapsed={collapsed}
  //         style={{ color: "white" }}
  //       >
  //         <div className="logo" />
  //         <Menu mode="inline" style={{ paddingTop: "100px" }}>
  //           <Menu.Item key="1">
  //             <Anchor affix={false} style={{ color: "white" }}>
  //               <Link href="/wybierz-województwo" title="Section 1" />
  //             </Anchor>
  //           </Menu.Item>
  //           <Menu.Item key="2">
  //             <Anchor affix={false}>
  //               <Link href="#section2" title="Section 2" />
  //             </Anchor>
  //           </Menu.Item>
  //           <Menu.Item key="3">
  //             <Anchor affix={false}>
  //               <Link href="#section3" title="Section 3" />
  //             </Anchor>
  //           </Menu.Item>
  //         </Menu>
  //       </Sider>
  //       <Layout className="site-layout">
  //         <Header
  //           style={{
  //             padding: 0,
  //             background: "",
  //             color: "white",
  //           }}
  //         >
  //           {React.createElement(
  //             collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
  //             {
  //               className: "trigger",
  //               onClick: () => setCollapsed(!collapsed),
  //             }
  //           )}
  //         </Header>
  //         <Content
  //           style={{
  //             margin: "24px 16px",
  //             padding: 24,
  //             minHeight: 280,
  //             background: "",
  //           }}
  //         >
  //           {children}
  //         </Content>
  //       </Layout>
  //     </Layout>
  //   </>
  // );
};

export default Layout;
