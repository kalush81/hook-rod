import * as React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import Map from "../../../components/MapCss";
import FisheryCard from "../../../components/FisheryCard";

//prettier-ignore
function FisheryListByVoivodeship({ data: { voivodeship: { fisheries }, allFishery } }) {
  
  return (
    <>
      <Header>lista łowisk w : {fisheries && fisheries.length > 0 ? fisheries[0].voivodeship :  "not found"}</Header>
      <Map wasSelected={true}>
        <div className="lowiskadiv">
          {fisheries && fisheries.length > 0 && fisheries.map((fisheryCardData) => {
            return <FisheryCard fisheryCardData={{ ...fisheryCardData, allFishery }} />;
          })}
        </div>
      </Map>
    </>
  );
}

export const query = graphql`
  query QueryAllFisheriesByVoiv($slug: String) {
    voivodeship(slug: { eq: $slug }) {
      fisheries {
        fishOnLake {
          name
          weight
          length
        }
        city
        citySlug
        id
        imagePath
        regulations
        name
        nameSlug
        numberOfPegs
        priceLow
        voivodeship
        voivodeshipSlug
      }
      id
    }
    allFishery {
      nodes {
        fields {
          localFile
        }
        fishOnLake {
          name
        }
        name
      }
    }
  }
`;

const Header = styled.h1`
  margin-top: 80px;
  text-align: center;
`;

export default FisheryListByVoivodeship;
