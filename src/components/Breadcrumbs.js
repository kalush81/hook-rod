import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { Breadcrumb } from 'antd';

const Breadcrumbs = ({ lowiskName }) => (
  <BreadcrumbsCss>
    <div className='breadcrumbs'>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to='/'>Strona Głowna</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Łowiska</Breadcrumb.Item>
        <Breadcrumb.Item>{lowiskName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  </BreadcrumbsCss>
);

const BreadcrumbsCss = styled.breadcrumbs`
  display: flex;
  height: 39px;
  padding: 3px 0;
  align-items: center;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 111;
  transition: background 0.3s ease-out;

  a {
    text-decoration: none;
    /* text-transform: uppercase; */
    color: var(--white);
    font-weight: 400;
    font-size: 18px;
  }
  :hover a {
    text-decoration: none;
  }

  .ant-breadcrumb {
    padding: 189px 0 9px;
    max-width: 1140px;
    width: 100%;
    margin: 0 auto;
  }

  .breadcrumbs {
    width: 100vw;
    position: sticky;
    top: -79px;
    background: #fff;
    border-bottom: 2px solid var(--offwhite);
    z-index: 9;
  }
`;

export default Breadcrumbs;
