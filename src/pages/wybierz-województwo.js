import React from 'react';
import { graphql } from 'gatsby';

import Map from '../components/Map';
import { Div, PageContainer } from '../components/cssComponents';
import FisheryCard from '../components/FisheryCard';

function Wybierz(props) {
  return (
    <PageContainer>
      <Div responsive='true'>
        <Map />
        <div className='fishery-cards-wrapper'>
          {props.data.allLake.nodes.map((node) => {
            return <FisheryCard key={node.id} data={node} />;
          })}
        </div>
      </Div>
    </PageContainer>
  );
}
export const query = graphql`
  query MyQuery {
    allLake {
      nodes {
        id
        name
        voivodeship
        city
        numberOfPegs
        priceMin
        lakeMainImageFile {
          childImageSharp {
            gatsbyImageData
          }
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
export default Wybierz;
