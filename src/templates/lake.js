import React, { useState, useEffect, useCallback } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { ConfigProvider, Breadcrumb, Skeleton } from "antd";
import plPL from "antd/lib/locale/pl_PL";
import { LocationDot } from "../assets/icons";
import { Collapse } from "react-collapse";
import Reservator2 from "../components/Reservator2.js";
import TimeTable from "../components/TimeTable";
import { Div, PageContainer } from "../components/cssComponents";
import useFetch from "../hooks/useFetch.js";
import useWindowSize from "../hooks/useWindowSize";
import { useLocation } from "@reach/router";
import { Dog, Fish2 } from "../assets/icons";

const mapTitleStyle = {
  background: "var(--litegray)",
  margin: 0,
  borderRadius: "10px 10px 0 0",
  padding: "5px",
  fontWeight: 300,
};
const facilitiesStyle = {
  width: "100%",
  background: "var(--litegray)",
  padding: "10px",
  borderRadius: "10px",
};

const title = {
  fontWeight: 300,
};

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
        <PageContainer>
          <Div noBottomPadding>
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
          {/* TODO - create grid container from here to bttom */}
          <div className="lowisko_image">
            <GatsbyImage
              style={{ maxHeight: "500px", width: "100%" }}
              image={getImage(lakeImageFile)}
              alt=""
            ></GatsbyImage>
          </div>

          <Div noBottomPadding>
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
          </Div>
          <Div>
            <div className="map-container">
              <h1 style={mapTitleStyle}>Mapa Stanowisk</h1>
              <StaticImage
                src={"../assets/images/mapa-stanowisk.jpg"}
                placeholder="blurred"
                layout="fullWidth"
                style={{ borderRadius: "0 0 10 10" }}
                // width={600}
                // height={600}
                formats={["auto", "webp", "avif"]}
                alt="A Dog Image"
                transformOptions={{ fit: "cover", cropFocus: "attention" }}
              />
            </div>
          </Div>
          <Div>
            <div className="failities" style={facilitiesStyle}>
              <h1 style={title}>Czego mozesz się spodziewać ?</h1>
              <ul className="facilities-list">
                <li>
                  <Dog />
                  <p>Parking</p>
                </li>
                <li>
                  <Dog />
                  <p>Psy mile widziane</p>
                </li>
                <li>
                  <Dog />
                  <p>Łódka do wynajęcia</p>
                </li>
                <li>
                  <Dog />
                  <>Parking</>
                </li>
                <li>
                  <Dog />
                  <p>Parking</p>
                </li>
              </ul>
            </div>
          </Div>
          <Div>
            <div className="failities" style={facilitiesStyle}>
              <h1 style={title}>Jakie ryby występują na łowisku?</h1>
              <ul className="facilities-list">
                <li>
                  <Fish2 />
                  <p>Karaś</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Szczupak</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Lin</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Karp</p>
                </li>
                <li>
                  <Fish2 />
                  <p>Rybka</p>
                </li>
              </ul>
            </div>
          </Div>
          <Div noBottomPadding>
            <Section>
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
        </PageContainer>
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
