import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import hookrod_logo from "../assets/images/hookrod_logo.svg";

const Footer = () => (
  <FooterCss className="footer_css">
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
        <Link to="/">
          <div className="footer_logo"></div>
        </Link>
        <li>HOOK&ROD Sp. z o.o.</li>
        <li>ul. Rybia 66</li>
        <li>tel. +48 725 465 444</li>
        <li>email: hookandrod@gmail.com</li>
      </div>
    </ul>
  </FooterCss>
);

const FooterCss = styled.footer`
  // position: fixed;
  // left: 0;
  // bottom: 0;
  width: 100%;
  background: rgba(22, 56, 50);
  height: 120px;
  display: flex;
  justify-content: space-between;
  font-family: Lato;
  z-index: 111;
  align-items: center;
  overflow: hidden;

  ul {
    display: inline;
    list-style: none;
    overflow: hidden;
  }

  li {
    margin: 0 19px;
    padding: 1px;
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
    text-align: right;
    font-size: 10px;
    color: var(--white);
  }
  .left {
    text-align: left;
    margin-right: 80px;
  }
  .footer_logo {
    background: url(${hookrod_logo});
    position: relative;
    width: 165px;
    background-size: cover;
    background-repeat: no-repeat !important;
    height: 30px;
    bottom: 5px;
  }
  @media screen and (max-width: 510px) {
    display: none;
  }
  @media screen and (max-height: 692px) {
    display: none;
  }
`;

export default Footer;
