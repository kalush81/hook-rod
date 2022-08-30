import * as React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../../../components/layout";
import styled from "styled-components";

import Pin from "../../../assets/images/pin.svg";
import Fish from "../../../assets/images/fish.svg";
import Trophy from "../../../assets/images/trophy.svg";
import Silhouette from "../../../assets/images/silhouette.svg";
import Dollar from "../../../assets/images/dollar.svg";
import Map from "../../../components/MapCss";

//prettier-ignore
function Fisheries({data: {voivodeship: {fisheries}}}) {
  console.log(fisheries)
  const listSpecies = (species) => {
    return species.map(name => {
      return <span>{name + ' '}</span>
    })
  }
  return (
    <Layout>
      <Header>lista łowisk w : </Header>
      {/*prettier-ignore*/}
      
    <Map wasSelected={true}>

      <div className="lowiskadiv">
      {fisheries.map(
        ({ name, id, imagePath, numberOfPegs, city, record, priceRange, species, slug }) => {
          return (
            <div  key={id}>

                <li className="lowi_itm" >
                  <Link to={`${slug}`} >
                    <div className="lowisko_img">
                      <img
                        alt="fish"
                        src={imagePath || "https://i.ibb.co/H76PLN1/received-301554618657421.jpg"}
                      />
                    </div>
                    <h2 className="lowi_itm_header">{name}</h2>
                    <div className="lowi_itm_amnt lokalizacja">
                      <img className="pin" alt="pin" src={Pin}></img>
                      <b>Lokalizacja: </b>
                      {city}
                    </div>
                    <div className="lowi_itm_amnt">
                      <img className="fish" alt="fishsvg" src={Fish}></img>
                      <b>Odmiany: </b>{species && listSpecies(species)}
                    </div>
                    <div className="lowi_itm_amnt">
                      <img className="trophy" alt="trophy" src={Trophy}></img>
                      <b>Rekord: </b>{record?.name} {record?.size} {record?.weight}
                    </div>
                    <div className="lowi_itm_amnt stanowiska">
                      <img
                        className="silhouette"
                        alt="silhouette"
                        src={Silhouette}
                      ></img>
                      <b>Liczba stanowisk: </b>
                      {numberOfPegs}
                    </div>
                    <div className="lowi_itm_amnt cena">
                      <img className="dollar" alt="dollar" src={Dollar}></img>
                      <b>Od {priceRange?.from} / osoba</b>
                    </div>
                  </Link>
                </li>
            </div>
          );
        }
      )} 
        </div>
        
      {/* </FisheryDiv> */}
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

export default Fisheries;
