import React, { useState, useEffect } from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";
import { ConfigProvider, Breadcrumb } from "antd";
import plPL from "antd/lib/locale/pl_PL";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { Collapse } from "react-collapse";
import Reservator2 from "../components/Reservator2.js";
import TimeTable from "../components/TimeTable";
import axios from "axios";
import { Div } from "../pages/wybierz-województwo";

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

  const toggleOpened = () => setOpened((value) => !value);

  useEffect(() => {
    const loadLakeDynamicData = async () => {
      try {
        const response = await axios.get(
          `https://hookandrod.herokuapp.com/api/lakes/lakeReservations/${id}`,
          {
            mode: "cors",
            headers: {
              "Access-Control-Allow-Origin": "*",
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            withCredentials: false,
            credentials: "same-origin",
            crossdomain: true,
          }
        );
        setPegWithReservations(response.data);
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            setIsError(error.response.data.message);
          } else {
            setIsError(
              ` ${error.status} \n Za wszelkie niedogodności przepraszamy. `
            );
          }
        }
      }
    };
    loadLakeDynamicData();
    // get data from API
  }, [id]);
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

          <div className="lowisko_body container">
            <div className="lowisko_card">
              <h1 className="lowisko_name">{lakeName}</h1>
              <div className="lowisko_city">
                <FontAwesomeIcon icon={faMapMarkerAlt} />
                <span> {lakeName}</span>
              </div>
              <div className="lowisko_image">
                <GatsbyImage
                  style={{ height: "400px" }}
                  image={getImage(lakeImageFile)}
                  alt=""
                ></GatsbyImage>
              </div>
            </div>

            {pegsWithReservationsMap && (
              <div>
                <Reservator2
                  lakeName={lakeName}
                  pegs={pegsWithReservationsMap}
                  pegBasePrice={pegBasePrice}
                  facilities={facilities}
                />
              </div>
            )}
            {pegsWithReservationsMap && (
              <section className="time-table">
                <TimeTable
                  id={id}
                  pegs={pegsWithReservationsMap}
                  maxPegs={numberOfPegs || 8 > 5 ? 5 : numberOfPegs}
                  maxDays={5}
                  numberOfPegs={numberOfPegs}
                />
              </section>
            )}

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
          </div>
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

const LowiskoCss = styled.div`
  // scroll-behavior: smooth;
  // margin-bottom: 500px;
  // //overflow-x: hidden;
  // font-size: 16px;

  // .lowisko {
  //   background: var(--white);
  //   width: 100vw;
  //   height: 100%;
  //   display: flex;
  //   justify-content: flex-start;
  //   align-items: center;
  //   flex-direction: column;
  //   padding: 12px;
  // }

  // .lowisko_body {
  //   display: grid;
  //   grid-template-rows: auto auto auto auto auto;
  //   grid-template-columns: 50% 50%;
  //   grid-gap: 12px;
  //   /* margin-top: 132px; */
  //   width: 100vw;
  //   /* height: 100%; */
  //   /* padding-top: 121px; */
  //   overflow: hidden;
  //   max-width: 1340px;
  //   min-width: 782px;
  //   overflow: visible;
  //   .time-table {
  //     grid-column: 1 / 3;
  //     max-width: 920px;
  //   }
  // }
  // .lowisko_card {
  //   grid-row: 1;
  //   grid-column: 1;
  // }
  // .lowisko_image {
  //   background-size: contain;
  //   background-repeat: no-repeat;
  //   width: 100%;
  //   height: 390px;
  // }
  // .lowisko_name {
  //   color: var(--black);
  //   margin-bottom: 0;
  // }
  // .losiwko_cal_menu {
  //   display: flex;
  //   justify-content: space-between;
  //   padding: 12px 0;
  // }
  // .lowisko_cal_menu_right {
  //   display: flex;
  //   align-items: center;
  // }
  // .key_indicate {
  //   margin: 0 9px 0 0;
  //   color: var(--black);
  //   display: inline-flex;
  //   align-items: center;
  // }
  // .key_indicate_green:before {
  //   content: "0";
  //   width: 26px;
  //   height: 23px;
  //   border-radius: 9px;
  //   margin-right: 4px;
  //   text-align: center;
  //   display: inline-flex;
  //   justify-content: center;
  //   align-items: center;
  //   background: var(--litegreen);
  // }
  // .key_indicate_yellow:before {
  //   content: "0";
  //   width: 26px;
  //   height: 23px;
  //   border-radius: 9px;
  //   margin-right: 4px;
  //   text-align: center;
  //   display: inline-flex;
  //   justify-content: center;
  //   align-items: center;
  //   background: var(--yellow);
  // }
  // .lowisko_cal_filter {
  //   width: 169px;
  //   margin-left: 6px;
  // }

  // /* .lowisk_map {
  //   grid-row: 2;
  //   grid-column-start: 1;
  //   grid-column-end: 1;
  // } */

  // .lowisko_cal {
  //   grid-row: 2;
  //   grid-column-start: 1;
  //   grid-column-end: 2;
  //   border-bottom: 1px solid var(--greymi);
  //   padding-bottom: 21px;
  // }
  // .lowisko_cal h2 {
  //   padding-left: 12px;
  // }

  // .lowisko_cal_row {
  //   margin-bottom: 6px;
  //   border-radius: 6px;
  //   display: flex;
  //   justify-content: space-evenly;
  //   padding: 3px 2px;
  // }

  // .lowisko_cal_row--1 {
  //   /* border: 2px solid rgba(209, 77, 1, 0.49); */
  // }
  // .lowisko_cal_row--2 {
  //   /* border: 2px solid rgba(51, 192, 180, 0.49); */
  // }
  // .lowisko_cal_row--3 {
  //   /* border: 2px solid rgba(161, 222, 82, 0.49); */
  //   /* background: rgb(156, 183, 131);
  //   background: linear-gradient(
  //     10deg,
  //     rgba(156, 183, 131, 0.79) 0%,
  //     rgba(77, 120, 83, 0.89) 100%,
  //     rgba(66, 93, 74, 0.6) 100%
  //   ); */
  //   background: rgb(167, 137, 73);
  //   background: linear-gradient(
  //     90deg,
  //     rgba(177, 143, 70, 0.79) 0%,
  //     rgba(191, 134, 38, 0.89) 100%
  //   );
  // }
  // .lowisko_cal_row--4 {
  //   /* border: 2px solid rgba(203, 184, 255, 0.49); */
  // }
  // .lowisko_cal_row--4 {
  //   /* border: 2px solid rgba(0, 148, 254, 0.49); */
  // }
  // .lowisko_cal_row--5 {
  //   /* border: 2px solid rgba(255, 200, 0, 0.49); */
  // }
  // .lowisko_cal_day {
  //   display: inline-block;
  //   width: 32px;
  //   height: 100%;
  //   /* border: 1px solid #ddd; */
  //   border-radius: 9px;
  //   text-align: center;
  //   margin-right: 2px;
  //   font-size: 20px;
  //   color: var(--greymi);
  //   transition: background 0.3s ease-out;
  //   background: rgba(var(--offwhitergba), 0.49);
  // }

  // .owisko_cal_day--available {
  //   background: var(--litegreen);
  //   cursor: pointer;
  //   color: var(--black);
  // }
  // .owisko_cal_day--selected {
  //   background: var(--yellow);
  //   cursor: pointer;
  // }

  // .owisko_cal_day--available:hover {
  //   background: var(--yellow);
  //   box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1);
  // }
  // .owisko_cal_day--available:hover {
  //   background: var(--yellow);
  //   box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1);
  // }

  // .lowisko_udogo {
  //   grid-row: 3;
  //   grid-column: 1;
  //   /* margin-left: -15px; */
  //   /* width: 84%; */
  // }

  // .lowisko_regu {
  //   grid-row: 4;
  //   grid-column: 1;
  //   background: var(--white);
  //   /* margin: 12px; */
  //   /* border-radius: 9px; */
  //   padding-right: 21px;
  //   margin-right: 21px;
  //   /* border-right: 2px solid var(--offwhite); */
  //   /* margin: 21px 0; */
  //   /* box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1); */
  //   border-radius: 9px;
  //   padding: 12px;
  // }
  // .lowisko_regu h2 {
  //   color: var(--black) !important;
  // }

  // .lowisko_regu_body {
  //   font-size: 16px;
  //   margin-bottom: 200px;
  // }

  // .lowisko_pricing {
  //   grid-row: 1;
  //   grid-column: 2;
  //   margin: 0 0;
  //   overflow-y: auto;
  //   box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1);
  //   border-radius: 9px;
  //   padding: 12px 19px 26px;
  //   margin-left: 19px;
  //   position: sticky;
  //   top: 90px;
  //   height: fit-content;
  // }
  // .lowisko_pricing_cennik {
  //   border-bottom: 1px solid var(--greymi);
  //   margin-bottom: 19px;
  // }

  // .lowisko_itm {
  //   border: 2px solid var(--offwhite);
  //   border-radius: 9px;
  //   padding: 12px;
  //   background: var(--white);
  //   margin-bottom: 12px;
  //   box-shadow: 0px 3px 9px 0 rgb(0 24 69 / 5%);
  //   cursor: pointer;
  //   transition: all 0.3s ease-out;
  // }
  // .lowisko_itm:hover {
  //   transform: translate3d(1px, -1px, -1px);
  //   border: 2px solid var(--yellow);
  // }

  // .lowisko_itm_header {
  //   font-size: 21px;
  // }

  // .lowisko_itm_amnt {
  //   display: flex;
  //   white-space: pre-wrap;
  // }
  // .lowisko_itm_amnt svg {
  //   margin-right: 3px;
  // }

  // .ant-breadcrumb {
  //   padding: 126px 0 59px;
  //   max-width: 1340px;
  //   width: 100%;
  //   margin: 0 auto;
  // }

  // .breadcrumbs {
  //   width: 100vw;
  // }

  // .lowisko_filter {
  //   width: 100%;
  //   border: none;
  //   margin-bottom: 12px;
  // }

  // .text_toggle {
  //   cursor: pointer;
  //   transition: opacity 0.3s ease-out;
  // }
  // .text_toggle:hover {
  //   opacity: 0.69;
  // }
`;
