import React from "react";
import { graphql } from "gatsby";

function Lake(props) {
  console.log(props);
  //const { id } = props.pageContext.id;
  return <h1>data of lake</h1>;
}

export default Lake;

export const query = graphql`
  query ($id: String) {
    lake(id: { eq: $id }) {
      voivodeship
      priceLow
      name
      city
      facilities {
        name
      }
      fishOnLake {
        length
        name
        weight
      }
      imagePath
      id
      lakeImageFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      numberOfPegs
    }
  }
`;
