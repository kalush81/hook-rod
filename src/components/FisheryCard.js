import React from "react";
import { Link } from "gatsby";
import { Pin, Fish, Trophy, Silhouette, Dollar } from "../assets/icons";

const listSpecies = (species) => {
  return species.map((name) => {
    return <span>{name + " "}</span>;
  });
};

//prettier-ignore
function FisheryCard({ data }) {
  return (
    <div key={data.id}>
      <li className="lowi_itm">
        <Link to={`${data.slug}`}>
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
            {data.species && listSpecies(data.species)}
          </div>
          <div className="lowi_itm_amnt">
            <img className="trophy" alt="trophy" src={Trophy}></img>
            <b>Rekord: </b>
            {data.records && (
              <Link to="/">
                <span style={{ color: "red" }}>zobacz nasze rekordy</span>
              </Link>
            )}
          </div>
          <div className="lowi_itm_amnt stanowiska">
            <img className="silhouette" alt="silhouette" src={Silhouette}></img>
            <b>Liczba stanowisk: </b>
            {data.numberOfPegs}
          </div>
          <div className="lowi_itm_amnt cena">
            <img className="dollar" alt="dollar" src={Dollar}></img>
            <b>Od {data.priceLowest} zł / osoba</b>
          </div>
        </Link>
      </li>
    </div>
  );
}

export default FisheryCard;
