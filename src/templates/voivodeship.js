import React from "react";
import styled from "styled-components";
import { graphql } from "gatsby";
import FisheryCard from "../components/FisheryCard";
import Map from "../components/Map";
import { Div, PageContainer } from "../components/cssComponents";

function Voivodeship(props) {
  return (
    <PageContainer>
      <Div>
        <Header>Lista Łowisk w : </Header>
        <Div responsive>
        <Map />
        <div className="fishery-cards-wrapper">
          {props.data.allLake.nodes.map((node) => {
            return <FisheryCard key={node.id} data={node} />;
          })}
        </div>
        </Div>
      </Div>
    </PageContainer>
  );
}

export default Voivodeship;

export const query = graphql`
  query ($voivodeship: String) {
    allLake(filter: { voivodeship: { eq: $voivodeship } }) {
      nodes {
        lakeMainImageFile {
          childImageSharp {
            gatsbyImageData(width: 400, height: 230)
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
        priceMin
        numberOfPegs
      }
    }
  }
`;
const Header = styled.h1`
  text-align: center;
  margin: 0;
`;

// eslint-disable-next-line no-lone-blocks
{
  /* import * as React from "react";
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
        priceMin
        voivodeship
        voivodeshipSlug
      }
      id
    }
  }
`; */
}
