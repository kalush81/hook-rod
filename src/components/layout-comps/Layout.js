import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import GlobalStyles from '../../styles/GlobalStyles';
import { ConfigProvider } from 'antd';
import plPL from 'antd/lib/locale/pl_PL';

const Layout = ({ children }) => {
  return (
    <ConfigProvider>
      <div>
        <GlobalStyles />
        <Nav />
        {children}

        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </div>
    </ConfigProvider>
  );
};

export default Layout;
