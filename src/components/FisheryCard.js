import React from "react";
import { Link } from "gatsby";
import { Pin, Fish, Trophy, Silhouette, Dollar } from "../assets/icons";

const listSpecies = (species) => {
  return species.map((fish) => {
    return <span>{fish.name + " "}</span>;
  });
};

//prettier-ignore
function FisheryCard({ data }) {
  return (
    <div key={data.id}>
      <li className="lowi_itm">
        <Link to={`/wojewodztwo/${data.voivodeshipSlug}/${data.nameSlug}`}>
          <div className="lowisko_img">
            <img alt="fish" src={ data.imagePath || "https://i.ibb.co/H76PLN1/received-301554618657421.jpg" }/>
          </div>
          <h2 className="lowi_itm_header">{data.name}</h2>
          <div className="lowi_itm_amnt lokalizacja">
            <img className="pin" alt="pin" src={Pin}></img>
            <b>Lokalizacja: </b>
            {data.city}
          </div>
          <div className="lowi_itm_amnt">
            <img className="fish" alt="fishsvg" src={Fish}></img>
            <b>Odmiany: </b>
            <b>{data.fishOnLake && listSpecies(data.fishOnLake)}</b>
          </div>
          <div className="lowi_itm_amnt">
            <img className="trophy" alt="trophy" src={Trophy}></img>
            <b>Rekord: </b>
            {data.fishOnLake && data.fishOnLake.length > 0 && (
              <>
              <b>

              <span style={{ color: "red" }}>{data.fishOnLake[0].name} </span>
              <span style={{ color: "red" }}>{data.fishOnLake[0].weight} kg </span>
              <span style={{ color: "red" }}>{data.fishOnLake[0].lenght}cm</span>
              </b>
              </>
              
            )}
          </div>
          <div className="lowi_itm_amnt stanowiska">
            <img className="silhouette" alt="silhouette" src={Silhouette}></img>
            <b>Liczba stanowisk: </b>
            {data.numberOfPegs}
          </div>
          {data.freePegs && (
              <div>
              <b>Wolnych stanowisk: </b>
              {data.freePegs}
              </div>
            )}
          <div className="lowi_itm_amnt cena">
            <img className="dollar" alt="dollar" src={Dollar}></img>
            <b>Od {data.priceLow} zł / osoba</b>
          </div>
          {data.distance && (
            <div className="lowi_itm_distance">
              <b>Odległość: </b>
              {data.distance} km
            </div>
          )}
        </Link>
      </li>
    </div>
  );
}

export default FisheryCard;
