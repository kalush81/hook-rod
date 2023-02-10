import { graphql } from "gatsby";
import React from "react";
import FisheryCard from "../../../components/FisheryCard";
import Map from "../../../components/MapCss";

function City({
  data: {
    allFishery: { nodes: fisheries },
  },
}) {
  console.log("fisheries", fisheries);
  const allFishery = fisheries;
  return (
    <Map wasSelected={true} disabled={true}>
      <div className="lowiskadiv">
        {fisheries.map((fisheryCardData) => {
          return (
            <FisheryCard fisheryCardData={{ ...fisheryCardData, allFishery }} />
          );
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
          length
        }
        fields {
          localFile
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
