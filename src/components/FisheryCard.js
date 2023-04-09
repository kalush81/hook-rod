import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Dollar, Fish, Silhouette, Pin, Trophy } from "../assets/icons";

const listSpecies = (species) => {
  console.log("Fish svg compo", Fish);
  return species.map((fish) => {
    return <span key={fish.name}>{fish.name + " "}</span>;
  });
};

//prettier-ignore
function FisheryCard({ data }) {
  const { id, city, voivodeship, name:lakeName, lakeImageFile, fishOnLake, priceMin } = data

  return (
    <div key={id}>
      <li className="lowi_itm">
        <Link to={`/${voivodeship}/${city}/${lakeName}`}>
          {/* <div className="lowisko_img"> */}
          <GatsbyImage style={{height: '170px'}} image={getImage(lakeImageFile)} alt=""></GatsbyImage>
          {/* </div> */}
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
            {/*numberOfPegs*/}
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
    </div>
  );
}

export default FisheryCard;
