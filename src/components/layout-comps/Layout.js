import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import '../../styles/GlobalStyles.css';

const Layout = ({ children }) => {
  return (
    <>
      {/* <GlobalStyles /> */}
      <Nav />
      {children}
      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </>
  );
};

export default Layout;
