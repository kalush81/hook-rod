import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../../components/layout";
import styled from "styled-components";
import Map from "../../../components/MapCss";
import FisheryCard from "../../../components/FisheryCard";

//prettier-ignore
function FisheryListByVoivodeship({ data: { voivodeship: { fisheries } } }) {
  return (
    <Layout>
      <Header>lista łowisk w : </Header>
      <Map wasSelected={true}>
        <div className="lowiskadiv">
          {fisheries.map((fisheryCardData) => {
            return <FisheryCard data={{ ...fisheryCardData }} />;
          })}
        </div>
      </Map>
    </Layout>
  );
}

export const query = graphql`
  query QueryAllFisheries($slug: String) {
    voivodeship(slug: { eq: $slug }) {
      fisheries {
        species
        city
        id
        imagePath
        regulations
        name
        slug
        numberOfPegs
        priceLowest
        priceHighest
        records {
          name
          size
          weight
        }
        voivodeship
      }
      id
    }
  }
`;

const Header = styled.h1`
  margin-top: 80px;
  text-align: center;
`;

export default FisheryListByVoivodeship;
