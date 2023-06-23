import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Dollar, Fish, Silhouette, Pin, Trophy } from "../assets/icons";
import styled from "styled-components";

const listSpecies = (species) => {
  return species.map((fish) => {
    return <span key={fish.name}>{fish.name + " "}</span>;
  });
};

//prettier-ignore
function FisheryCard({ data }) {
  console.log('data on fishery card', data);
  const { id, city, voivodeship, name:lakeName, lakeMainImageFile, fishOnLake, priceMin, numberOfPegs } = data

  return (
    <Div key={id}>
      <li className="lowi_itm">
        <Link to={`/${voivodeship}/${city}/${lakeName}`}>
          <GatsbyImage style={{height: '170px'}} image={getImage(lakeMainImageFile)} alt=""></GatsbyImage>
          <h2 className="lowi_itm_header">{lakeName}</h2>
          <div className="lowi_itm_amnt lokalizacja">
            <Pin />
            <b>Lokalizacja: </b>
            {city}
          </div>
          <div className="lowi_itm_amnt">
            <Fish />
            <b>Odmiany: </b>
            <b>{fishOnLake && listSpecies(fishOnLake)}</b>
          </div>
          <div className="lowi_itm_amnt">
            <Trophy />
            <b>Rekord: </b>
            {fishOnLake && fishOnLake.length > 0 && (
              <>
              <b>

              <span style={{ color: "red" }}>{fishOnLake[0].name} </span>
              <span style={{ color: "red" }}>{fishOnLake[0].weight} kg </span>
              <span style={{ color: "red" }}>{fishOnLake[0].length}cm</span>
              </b>
              </>
              
            )}
          </div>
          <div className="lowi_itm_amnt stanowiska">
            <Silhouette />
            <b>Liczba stanowisk: </b>
            {numberOfPegs}
          </div>
          {/* {freePegs && (
              <div>
              <b>Wolnych stanowisk: </b>
              {freePegs}
              </div>
            )} */}
          <div className="lowi_itm_amnt cena">
            <Dollar />
            <b>Od {priceMin} zł / osoba</b>
          </div>
          {/* {distance && (
            <div className="lowi_itm_distance">
              <b>Odległość: </b>
              {distance} km
            </div>
          )} */}
        </Link>
      </li>
    </Div>
  );
}
const Div = styled.div`
  .lowi_itm {
    display: flex;
    flex-direction: column;
    border-radius: 20px;
    padding: 12px;
    margin: 5px;
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: all 0.3s ease-out;
    position: relative;
    width: 325px;
    height: 471px;
    background: rgba(237, 237, 237);
    svg {
      width: 40px;
    }
  }
  .lowi_itm:hover {
    transform: translate3d(1px, -1px, -1px);
    opacity: 0.8;
  }
  .lowi_itm *,
  .lowi_itm:hover * {
    color: var(--black) !important;
  }

  .lowi_itm_header {
    font-size: 28px;
  }

  .lowi_itm_amnt {
    display: flex;
    white-space: pre-wrap;
    font-weight: initial !important;
    margin-top: 3px;
    margin-bottom: 0.567em;
  }
  .lowi_itm_amnt img {
    margin-right: 3px;
  }
  .lokalizacja {
    margin-left: 3px;
  }
  .stanowiska {
    margin-left: 1px;
  }
  .cena {
    margin-left: 5px;
  }
  .lowisko_img {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 100%;
    overflow: hidden;
  }
`;
export default FisheryCard;
