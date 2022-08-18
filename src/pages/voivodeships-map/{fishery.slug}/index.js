import * as React from "react";
import { graphql, Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import Layout from "../../../components/layout";
import styled from "styled-components";

import Pin from "../../../assets/images/pin.svg";
import Fish from "../../../assets/images/fish.svg";
import Trophy from "../../../assets/images/trophy.svg";
import Silhouette from "../../../assets/images/silhouette.svg";
import Dollar from "../../../assets/images/dollar.svg";
import { FisheryDiv as Div } from "../../../components/MapCss";

//prettier-ignore
function Voivodeship({
  data: { allFishery: { nodes }, }, pageContext: { slug } }) {
  console.log(nodes);

  return (
    <Layout>
      <Header>lista łowisk w {slug}</Header>
      {/*prettier-ignore*/}
      {nodes.map(
        ({ slug, voiv, name, city, id, imagePath, numberOfPegs = "nieznana" }) => {
          return (
            <Div>
              <div key={id} >
                <li className="lowi_itm">
                  <Link to={`/lowisko/${id}`}>
                    <div className="lowisko_img">
                      <img
                        alt="fish"
                        src="https://i.ibb.co/H76PLN1/received-301554618657421.jpg"
                      />
                    </div>
                    <h2 className="lowi_itm_header">{name}</h2>
                    <div className="lowi_itm_amnt lokalizacja">
                      <img className="pin" alt="pin" src={Pin}></img>
                      <b>Lokalizacja</b>
                    </div>
                    <div className="lowi_itm_amnt">
                      <img className="fish" alt="fishsvg" src={Fish}></img>
                      <b>Odmiany: </b>Karp, Jesiotr, Okoń - przykład
                    </div>
                    <div className="lowi_itm_amnt">
                      <img className="trophy" alt="trophy" src={Trophy}></img>
                      <b>Rekord: </b>Karp 55kg 70cm - przykład
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
                      <b>Od 25zł / osoba</b>
                    </div>
                  </Link>
                </li>
              </div>
            </Div>
          );
        }
      )}
    </Layout>
  );
}

export const query = graphql`
  query AllFishery($slug: String) {
    allFishery(filter: { slug: { eq: $slug } }) {
      nodes {
        id
        slug
        voiv
        name
        city
        activities {
          allowed
          forbidden
        }
      }
    }
  }
`;
const Header = styled.h1`
  margin-top: 80px;
  text-align: center;
`;
// const Div = styled.div`
//   overflow-x: hidden;
//   overflow-y: scroll;
//   height: calc(100vh - 120px);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;
export default Voivodeship;
