import React from 'react';
import styled from 'styled-components';
import { graphql, useStaticQuery } from 'gatsby';
import BackgroundImage from 'gatsby-background-image';
import SearchBox from '../components/search-comps/SearchBox';
import { SEO } from '../components/Seo';

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
        # ite: file(relativePath: { eq: "partner-meus.png" }) {
        #   childImageSharp {
        #     fluid(quality: 100, maxWidth: 1920) {
        #       ...GatsbyImageSharpFluid_withWebp
        #     }
        #   }
        # }
        # itee: file(relativePath: { eq: "partner-pva.png" }) {
        #   childImageSharp {
        #     fluid(quality: 100, maxWidth: 1920) {
        #       ...GatsbyImageSharpFluid_withWebp
        #     }
        #   }
        # }
        # iteee: file(relativePath: { eq: "partner-zwedka.png" }) {
        #   childImageSharp {
        #     fluid(quality: 100, maxWidth: 1920) {
        #       ...GatsbyImageSharpFluid_withWebp
        #     }
        #   }
        # }
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
      {/* <Helmet>
        <meta charSet="utf-8" />
        <title>Hook&Rod</title>
      </Helmet> */}
      <HomeCss>
        <BackgroundImage
          Tag='div'
          fluid={imageData}
          className='home_cover'
          backgroundColor='#040e18'>
          <SearchBox />
        </BackgroundImage>
      </HomeCss>
    </>
  );
};

const HomeCss = styled.div`
  scroll-behavior: smooth;
  //height: calc(100vh - 120px);

  .home_cover {
    background-size: cover;
    width: 100vw;
    height: 100vh;
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
`;

export default HomePg;

export const Head = () => <SEO />;
