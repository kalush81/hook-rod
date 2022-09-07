import { graphql } from "gatsby";
import React from "react";
import FisheryCard from "../../../components/FisheryCard";
import Map from "../../../components/MapCss";
//import Layout from "antd/lib/layout/layout";

function City({
  data: {
    allFishery: { nodes: fisheries },
  },
}) {
  return (
    <Map wasSelected={true} disabled={true}>
      <div className="lowiskadiv">
        {fisheries.map((fisheryCardData) => {
          return <FisheryCard data={{ ...fisheryCardData }} />;
        })}
      </div>
    </Map>
  );
}

export const query = graphql`
  query QueryByCity($citySlug: String) {
    allFishery(filter: { citySlug: { eq: $citySlug } }) {
      nodes {
        voivodeship
        voivodeshipSlug
        fishOnLake {
          name
          weight
          lenght
        }

        name
        nameSlug
        id
        city
        citySlug
        imagePath
      }
    }
  }
`;

export default City;
