import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../styles/GlobalStyles';

const Layout = ({ children }) => {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      {children}

      <Footer style={{ textAlign: 'center' }}>
        Ant Design ©2023 Created by Ant UED
      </Footer>
    </div>
  );
};

export default Layout;
