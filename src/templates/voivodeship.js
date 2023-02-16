import React from "react";
import TestLakeCard from "../components/TestLakeCard";
import { graphql } from "gatsby";
import FisheryCard from "../components/FisheryCard";

function Voivodeship(props) {
  console.log("props", props);
  return (
    <>
      <h1>here I am going to loop through</h1>
      <h1>all lakes within the voivodeship specified by pageContext </h1>
      {props.data.allLake.nodes.map((node) => {
        return <FisheryCard data={node} />;
      })}
    </>
  );
}

export default Voivodeship;

export const query = graphql`
  query ($voivodeship: String) {
    allLake(filter: { voivodeship: { eq: $voivodeship } }) {
      nodes {
        imagePath
        lakeImageFile {
          childImageSharp {
            gatsbyImageData
          }
        }
        city
        id
        name
        facilities {
          name
        }
        fishOnLake {
          length
          name
          weight
        }
        voivodeship
        priceLow
      }
    }
  }
`;
