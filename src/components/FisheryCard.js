import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Link } from "gatsby";
import { Pin, Fish, Silhouette, Dollar } from "../assets/icons";

const listSpecies = (species) => {
  return species.map((fish) => {
    return <span>{fish.name + " "}</span>;
  });
};

//prettier-ignore
function FisheryCard({ data }) {
  const { id, city, voivodeship, name:lakeName, lakeImageFile, fishOnLake, priceLow } = data

  return (
    <div key={id}>
      <li className="lowi_itm">
        <Link to={`/${voivodeship}/${city}/${lakeName}`}>
          {/* <div className="lowisko_img"> */}
          <GatsbyImage image={getImage(lakeImageFile)}></GatsbyImage>
          {/* </div> */}
          <h2 className="lowi_itm_header">{lakeName}</h2>
          <div className="lowi_itm_amnt lokalizacja">
            <img className="pin" alt="pin" src={Pin}></img>
            <b>Lokalizacja: </b>
            {city}
          </div>
          <div className="lowi_itm_amnt">
            <img className="fish" alt="fishsvg" src={Fish}></img>
            <b>Odmiany: </b>
            <b>{fishOnLake && listSpecies(fishOnLake)}</b>
          </div>
          <div className="lowi_itm_amnt">
            {/* <Img fluid={image}/> */}
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
            <img className="silhouette" alt="silhouette" src={Silhouette}></img>
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
            <img className="dollar" alt="dollar" src={Dollar}></img>
            <b>Od {priceLow} zł / osoba</b>
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
