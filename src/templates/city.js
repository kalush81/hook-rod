import { graphql } from "gatsby";
import React from "react";
import TestLakeCard from "../components/TestLakeCard";

function City(props) {
  console.log(props);
  return (
    <div>
      <h1>list of all cities</h1>;
      {/* {props.data.allLake.nodes.map(({ lakeMainImageFile }) => {
        return <TestLakeCard lakeImageFile={lakeMainImageFile} />;
      })} */}
    </div>
  );
}

export default City;

export const query = graphql`
  query ($city: String) {
    allLake(filter: { city: { eq: $city } }) {
      nodes {
        lakeMainImageFile {
          childImageSharp {
            gatsbyImageData(width: 200)
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
      }
    }
  }
`;
