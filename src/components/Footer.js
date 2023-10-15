import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import hookrod_logo from "../assets/images/hookrod_logo.svg";

const Footer = ({ noFixedPosition }) => (
  <FooterCss className="footer_css" noFixedPosition={noFixedPosition}>
    <div className="container">
      <div className="left">
        <ul>
          <li>
            <Link to="/partnerzy">Partnerzy</Link>
          </li>
        </ul>
      </div>
      <div className="center">
        <ul>
          <li>
            <Link to="" className="bold">
              Ważne informacje
            </Link>
          </li>
          <li>
            <Link to="">Regulamin</Link>
          </li>
          <li>
            <Link to="">Polityka prywatności</Link>
          </li>
          <li>
            <Link to="">Płatności</Link>
          </li>
        </ul>
      </div>
      <ul className="right">
        <div className="right">
          <Link to="/">Logo</Link>
          <li>HOOK&ROD Sp. z o.o.</li>
          <li>ul. Rybia 66</li>
          <li>tel. +48 725 465 444</li>
          <li>email: hookandrod@gmail.com</li>
        </div>
      </ul>
    </div>
  </FooterCss>
);

const FooterCss = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background: rgba(22, 56, 50, 0.9);
  height: 100px;
  display: flex;
  justify-content: space-between;
  font-family: Lato;
  z-index: 111;
  align-items: center;
  overflow: hidden;

  .container {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
    //border: 2px solid red;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  ul {
    display: inline;
    list-style: none;
    overflow: hidden;
  }

  li {
    // margin: 0 19px;
    // padding: 1px;
  }

  a {
    text-decoration: none;
    color: var(--white);
    font-size: 13px;
  }

  .bold {
    font-weight: 700;
  }
  .right {
    font-size: 10px;
    color: var(--white);
  }
  .left {
  }
`;

export default Footer;
