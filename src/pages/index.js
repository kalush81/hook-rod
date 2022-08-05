import React from "react";
import styled from "styled-components";

import { graphql, useStaticQuery } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import { Helmet } from "react-helmet";

//import { CompassOutlined, SearchOutlined } from "@ant-design/icons";

import "moment/locale/pl";
//import plPL from "antd/lib/locale/pl_PL";
import { Input, Select, DatePicker, ConfigProvider, Button } from "antd";
//import cities from "cities.json";
//import vectormobile from "../assets/images/vectormobile.png";
//import pattern from "../assets/images/pattern.svg";

//import ClientOnly from "../components/ClientOnly";
import SearchBox from "../components/SearchBox";

const { Option } = Select;
const { RangePicker } = DatePicker;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const HomePg = () => {
  const data = useStaticQuery(
    graphql`
      query {
        desktop_m: file(relativePath: { eq: "cover.jpeg" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        ite: file(relativePath: { eq: "partner-meus.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        itee: file(relativePath: { eq: "partner-pva.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        iteee: file(relativePath: { eq: "partner-zwedka.png" }) {
          childImageSharp {
            fluid(quality: 100, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `
  );

  // Set ImageData.
  const imageData = data.desktop_m.childImageSharp.fluid;

  // const imageDataP1 = data.ite.childImageSharp.fluid;
  // const imageDataP2 = data.itee.childImageSharp.fluid;
  // const imageDataP3 = data.iteee.childImageSharp.fluid;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Hook&Rod</title>
      </Helmet>
      <HomeCss>
        <BackgroundImage
          Tag="div"
          fluid={imageData}
          className="home_cover"
          backgroundColor="#040e18"
        >
          <SearchBox />
        </BackgroundImage>
      </HomeCss>
    </>
  );
};

const HomeCss = styled.div`
  scroll-behavior: smooth;
  height: calc(100vh - 120px);

  .home_cover {
    background-size: cover;
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
  }

  .home_cover:before,
  .home_cover:after {
    background-position: right bottom !important;
  }

  @media screen and (max-width: 510px) {
    height: 100vh;
  }
  @media screen and (max-height: 692px) {
    height: 100vh;
  }
`;

export default HomePg;
