import React from "react";
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import { Pin, Fish, Silhouette, Dollar } from "../assets/icons";

const listSpecies = (species) => {
  return species.map((fish) => {
    return <span>{fish.name + " "}</span>;
  });
};

//prettier-ignore
function FisheryCard( {fisheryCardData: fCD,  } ) {
  const nodes = fCD.allFishery.nodes;
  const nameToLookUp = fCD.name;
  const found = nodes?.find( node => node.name === nameToLookUp);

  const data = useStaticQuery(graphql`
    query {
      allFile {
        edges {
          node {
            id
            childImageSharp {
              fluid(maxWidth: 200) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

    const imageData = data.allFile.edges.find(edge => edge.node.id === found?.fields.localFile)
    console.log("imageData", imageData)

  return (
    <div key={fCD.id}>
      <li className="lowi_itm">
        <Link to={`/wojewodztwo/${fCD.voivodeshipSlug}/${fCD.nameSlug}`}>
          {/* <div className="lowisko_img"> */}
          <Img fluid={imageData?.node.childImageSharp.fluid} alt="Gatsby Docs are awesome" /> 
          {/* </div> */}
          <h2 className="lowi_itm_header">{fCD.name}</h2>
          <div className="lowi_itm_amnt lokalizacja">
            <img className="pin" alt="pin" src={Pin}></img>
            <b>Lokalizacja: </b>
            {fCD.city}
          </div>
          <div className="lowi_itm_amnt">
            <img className="fish" alt="fishsvg" src={Fish}></img>
            <b>Odmiany: </b>
            <b>{fCD.fishOnLake && listSpecies(fCD.fishOnLake)}</b>
          </div>
          <div className="lowi_itm_amnt">
            {/* <Img fluid={image}/> */}
            <b>Rekord: </b>
            {fCD.fishOnLake && fCD.fishOnLake.length > 0 && (
              <>
              <b>

              <span style={{ color: "red" }}>{fCD.fishOnLake[0].name} </span>
              <span style={{ color: "red" }}>{fCD.fishOnLake[0].weight} kg </span>
              <span style={{ color: "red" }}>{fCD.fishOnLake[0].length}cm</span>
              </b>
              </>
              
            )}
          </div>
          <div className="lowi_itm_amnt stanowiska">
            <img className="silhouette" alt="silhouette" src={Silhouette}></img>
            <b>Liczba stanowisk: </b>
            {fCD.numberOfPegs}
          </div>
          {fCD.freePegs && (
              <div>
              <b>Wolnych stanowisk: </b>
              {fCD.freePegs}
              </div>
            )}
          <div className="lowi_itm_amnt cena">
            <img className="dollar" alt="dollar" src={Dollar}></img>
            <b>Od {fCD.priceLow} zł / osoba</b>
          </div>
          {fCD.distance && (
            <div className="lowi_itm_distance">
              <b>Odległość: </b>
              {fCD.distance} km
            </div>
          )}
        </Link>
      </li>
    </div>
  );
}

export default FisheryCard;
