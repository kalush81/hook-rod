import React, { useState, useEffect, useCallback } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { ConfigProvider, Breadcrumb, Skeleton } from "antd";
import plPL from "antd/lib/locale/pl_PL";
import { LocationDot } from "../assets/icons";
import { Collapse } from "react-collapse";
import Reservator2 from "../components/Reservator2.js";
import TimeTable from "../components/TimeTable";
import { Div } from "../components/cssComponents";
import useFetch from "../hooks/useFetch.js";
import useWindowSize from "../hooks/useWindowSize";
import { useLocation } from "@reach/router";

function Lake(props) {
  const {
    voivodeship,
    city,
    name: lakeName,
    id,
    facilities,
    numberOfPegs,
    lakeImageFile,
    pegs,
    pegBasePrice,
  } = props.data.lake;
  const [opened, setOpened] = useState(false);
  const [pegsWithReservations, setPegWithReservations] = useState(null);
  const [isError, setIsError] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const size = useWindowSize();

  const toggleOpened = () => setOpened((value) => !value);
  const { get, loading } = useFetch(
    `https://hookandrod.herokuapp.com/api/lakes/lakeReservations/`
  );

  const fetchData = useCallback(async () => {
    try {
      const data = await get(id);
      setPegWithReservations(data);
    } catch (error) {
      setIsError(true);
      console.error(
        "error while fetching dynamic data related to a lake, pegs reservations etc",
        error
      );
    }
  }, [get, id]);

  useEffect(() => {
    fetchData();
    return () => {
      setPegWithReservations(null);
    };
  }, [fetchData]);

  let pegsWithReservationsMap = [];

  if (pegsWithReservations) {
    pegsWithReservationsMap = pegs.map((peg) => {
      const pegWithReservations = pegsWithReservations.find(
        (pr) => pr.pegId === peg.pegId
      );
      return pegWithReservations
        ? { ...peg, reservations: pegWithReservations.reservations }
        : { ...peg, reservations: [] };
    });
  }
  return (
    <>
      <ConfigProvider locale={plPL}>
        <Div>
          <div className="breadcrumbs">
            <Breadcrumb>
              <Breadcrumb.Item>
                <Link to="/">{}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/${voivodeship}`}>{voivodeship}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/${voivodeship}/${city}`}>{city}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{lakeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className="lowisko_card">
            <h1 className="lowisko_name">{lakeName}</h1>
            <div className="lowisko_city">
              <LocationDot />
              <span> {lakeName}</span>
            </div>
          </div>
        </Div>
        <div className="lowisko_image">
          <GatsbyImage
            style={{ maxHeight: "500px", width: "100%" }}
            image={getImage(lakeImageFile)}
            alt=""
          ></GatsbyImage>
        </div>

        <Div>
          {pegsWithReservationsMap && (
            <div style={{ marginTop: "2em" }}>
              <Reservator2
                lakeName={lakeName}
                pegs={pegsWithReservationsMap}
                pegBasePrice={pegBasePrice}
                facilities={facilities}
                currentPath={currentPath}
              />
            </div>
          )}
          {!loading ? (
            <Section className="time-table">
              <TimeTable
                id={id}
                pegs={pegsWithReservationsMap}
                maxPegs={numberOfPegs || 8 > 5 ? 5 : numberOfPegs}
                maxDays={size}
                numberOfPegs={numberOfPegs}
              />
            </Section>
          ) : (
            <Skeleton active />
          )}

          {isError && <p>Cos poszlo nie tak podczas ladowania rezerwacji</p>}
          <Div>
            <Section>
              <div className="lowisko_udogo"></div>
              <div className="lowisko_regu">
                <h2>Regulamin Łowiska</h2>
                <div className="lowisko_regu_body">
                  <h3
                    className="text_toggle"
                    onClick={toggleOpened}
                    style={{ color: "red" }}
                  >
                    Regulamin Łowiska {lakeName} {opened ? " v" : " >"}
                  </h3>
                  <Collapse isOpened={opened}>{"regulations"}</Collapse>
                  <div className="text_toggle" onClick={toggleOpened}>
                    {opened ? "Zwiń..." : "Rozwiń..."}
                  </div>
                </div>
              </div>
            </Section>
          </Div>
        </Div>
      </ConfigProvider>
    </>
  );
}

export default Lake;

export const query = graphql`
  query ($id: String) {
    lake(id: { eq: $id }) {
      voivodeship
      priceMin
      name
      city
      facilities {
        name
        basePrice
      }
      fishOnLake {
        length
        name
        weight
      }
      pegs {
        pegId
        pegName
        pegNumber
      }
      pegBasePrice
      imagePath
      id
      lakeImageFile {
        childImageSharp {
          gatsbyImageData
        }
      }
      numberOfPegs
    }
  }
`;

const Section = styled.section`
  width: 100%;
  .lowisko_regu {
    padding-bottom: 60px;
  }
`;
