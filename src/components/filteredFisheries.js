import React from "react";
import Fishery from "../templates/fishery";
import { graphql, useStaticQuery } from "gatsby";

function Filters({ data }) {
  //const data = useStaticQuery();
  console.log("pobrane lowiska by id", data);
  return <h1>sprawdz console log czy masz pobrane lowisko by id 215</h1>;
}

export const query = graphql`
  query MyQuery($voivodeship: String) {
    allFishery(filter: { voivodeship: { eq: $voivodeship } }) {
      nodes {
        name
        numberOfPegs
      }
    }
  }
`;

export default Filters;
