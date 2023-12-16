import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../../styles/GlobalStyles';
//import 'antd/dist/reset.css';
//import 'antd/dist/antd';

const Layout = ({ children }) => {
  console.log('children', children);
  return (
    <>
      <GlobalStyles />
      <Nav />
      {children}
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </>
  );
};

export default Layout;
