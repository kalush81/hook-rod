import { createGlobalStyle } from "styled-components";
//import "antd/dist/antd.css";

import lato300 from "../assets/fonts/Lato-Thin.woff";
import lato400 from "../assets/fonts/Lato-Regular.woff";
import lato500 from "../assets/fonts/Lato-Medium.woff";
import lato700 from "../assets/fonts/Lato-Bold.woff";

const GlobalStyles = createGlobalStyle`
  :root {
    --black: #000000;
    --greymi: #ddd;
    --litegreen: #9CB783;
    --green: #4D7853;
    --greenrgb: 77, 120, 83;
    --darkgreen: #425E4B;
    --yellow: #ff8800;
    --offwhite: #e6e6e6;
    --offwhitergba: 242, 242, 242;
    --white: #fff;
    --purple: #6750A4;
    --gray: #1A422B;
    --litegray: #C4C4C4;
  }
  /* Lato-300 */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 300;
    src: url(${lato300});
  }
  /* Lato-400 */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    src: url(${lato400});
  }
  /* Lato-500 */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 500;
    src: url(${lato500});
  }
  /* Lato-700 */
  @font-face {
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    src: url(${lato700});
  }

  html {
    background-color:rgba(255, 255, 255, 0.253);
    background-size: 810px;
    background-attachment: fixed;
    font-family: 'Lato';
    font-size: 10px;
    color: var(--black);
    scroll-behavior: smooth;
    box-sizing: border-box !important;
  }
  
  *, *::before, *::after {
    box-sizing: inherit;
  } 

  body {
    font-size: 1.6rem;
    scroll-behavior: smooth;
    // padding: 70px 0 100px 0;
    margin: 0;
  }

  .ant-picker-panels {
    flex-direction: column;
  } 
  @media (min-width: 567px) {
    .ant-picker-panels {
      flex-direction: row;
    }
  } 

  /* Scrollbar Styles */
  // body::-webkit-scrollbar {
  //   width: 9px;
  // }
  html {
    scrollbar-width: thin;
    scrollbar-color: var(--red) var(--white);
  }
  body::-webkit-scrollbar-track {
    background: var(--white);
  }
  body::-webkit-scrollbar-thumb {
    background-color: var(--red) ;
    border-radius: 6px;
    border: 3px solid var(--white);
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(---black)
    padding: 0
  }

  img {
    max-width: 100%;
  }

  a {
    text-decoration: none;
    transition: opacity 0.2s ease-out;
    color: var(--black);
    font-weight: 500;
  }
  a:hover {
    opacity: 0.69;
    color: var(--yellow) !important;
  }

  ul {
    margin: 0 !important;
    padding: 0;
    list-style: none;
  }

  a.ant-anchor-link-title {
    color: white;
  }
`;

export default GlobalStyles;
