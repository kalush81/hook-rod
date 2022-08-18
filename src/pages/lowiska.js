import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

import axios from "axios";
import { Select, ConfigProvider, Skeleton } from "antd";
import plPL from "antd/lib/locale/pl_PL";
import "moment/locale/pl";

import SearchBar from "../components/SearchBar";

import Pin from "../assets/images/pin.svg";
import Fish from "../assets/images/fish.svg";
import Trophy from "../assets/images/trophy.svg";
import Silhouette from "../assets/images/silhouette.svg";
import Dollar from "../assets/images/dollar.svg";

const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
//location is available from react router DONT CONFUSE FOR PASSED PARAM See documentation on react router for more https://v5.reactrouter.com/web/api/Hooks
const Lowiska = function ({ location }) {
  // Client-side Runtime Data Fetching
  const [lowiskaArr, setLowiskaArr] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const distance = params.get("distance");
    const eday = params.get("eday");
    const sday = params.get("sday");
    const ulat = params.get("ulat");
    const ulng = params.get("ulng");
    // get data from API
    const loadLowiska = async () => {
      try {
        const response = await axios.get(
          `https://karpteam.herokuapp.com/api/lakes/checkLakesOnDate`,
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
            params: {
              distance,
              eday,
              sday,
              ulat,
              ulng,
            },
          }
        );
        setLowiskaArr(response.data);
        console.log("LOWISKA", response.data.imagePath);
      } catch (error) {
        console.log(
          "couldnt fetch from https://karpteam.herokuapp.com/api/lakes/checkLakesOnDate"
        );
      }
    };

    loadLowiska();
  }, [location]);

  return (
    <ConfigProvider locale={plPL}>
      <LowiskaCss>
        <div className="lowi">
          {location.state ? (
            <SearchBar
              cityName={location.state.srchdCity}
              rangeProp={location.state.dist}
              fDates={location.state.fullDates}
            />
          ) : (
            <SearchBar />
          )}

          <div className="lowi_body">
            <div className="lowi_filters">
              <div className="filtruj">
                <h3>Filtruj</h3>
              </div>
              <div className="lowi_select">
                <Select
                  mode="multiple"
                  allowClear
                  showArrow="true"
                  className="lowi_filter"
                  size="large"
                  placeholder="Odmiana  "
                  onChange={handleChange}
                >
                  <Option value="10">Karp</Option>
                  <Option value="101">Rekin</Option>
                  <Option value="50">Szczupak</Option>
                  <Option value="100">Okoń</Option>
                  <Option value="102">Śledź</Option>
                </Select>
                <Select
                  mode="multiple"
                  allowClear
                  showArrow="true"
                  className="lowi_filter"
                  size="large"
                  placeholder="Udogodnienia  "
                  onChange={handleChange}
                >
                  <Option value="10">WC</Option>
                  <Option value="101">Namiot</Option>
                  <Option value="50">Ponton</Option>
                  <Option value="100">WiFi</Option>
                </Select>
              </div>
            </div>
            <section className="lowi_list">
              {lowiskaArr && lowiskaArr.length === 0 && (
                <>
                  <Skeleton active />
                  <br />
                  <Skeleton active />
                  <br />
                  <Skeleton active />
                  <br />
                  <Skeleton active />
                </>
              )}
              <ul className="lowi_list_ul">
                {lowiskaArr
                  .filter((lowisk) => lowisk.freePegs !== 0)
                  .sort((a, b) => (a.distance > b.distance ? 1 : -1))
                  .map((data, key) => (
                    //console.log()
                    <div key={key}>
                      <li className="lowi_itm">
                        <Link to={`/lowisko/${data.id}`}>
                          <div className="lowisko_img">
                            <img
                              alt="fish"
                              src={
                                //lowiskaArr.imagePath
                                //? lowiskaArr.imagePath
                                "https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcR0RuAVNfoJKGQ5915S8WgNlOqINorTaqe9q82s7CfcSbcV64z2xktqF91WYjPZmxJiOABVAR_sdB52p45HY-A"
                              }
                            />
                          </div>
                          <h2 className="lowi_itm_header">{data.name}</h2>
                          <div className="lowi_itm_amnt lokalizacja">
                            <img className="pin" alt="pin" src={Pin} />
                            <b>Lokalizacja</b>
                          </div>
                          <div className="lowi_itm_amnt">
                            <img className="fish" alt="fishsvg" src={Fish} />
                            <b>Odmiany: </b>Karp, Jesiotr, Okoń
                          </div>
                          <div className="lowi_itm_amnt">
                            <img className="trophy" alt="trophy" src={Trophy} />
                            <b>Rekord: </b>Karp 55kg 70cm
                          </div>
                          <div className="lowi_itm_amnt stanowiska">
                            <img
                              className="silhouette"
                              alt="silhouette"
                              src={Silhouette}
                            />
                            <b>Liczba stanowisk: </b>6
                          </div>
                          <div className="lowi_itm_amnt cena">
                            <img className="dollar" alt="dollar" src={Dollar} />
                            <b>Od 25zł / osoba</b>
                          </div>
                          <div className="lowi_itm_distance">
                            Odległość: {data.distance}km
                          </div>
                        </Link>
                      </li>
                    </div>
                  ))}
              </ul>
            </section>
          </div>
        </div>
      </LowiskaCss>
    </ConfigProvider>
  );
};

const LowiskaCss = styled.div`
  scroll-behavior: smooth;
  height: 100vh;

  .lowi {
    background: var(--white);
    width: 100vw;
    height: calc(100vh - 120px);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
  }

  .lowi_search_bar {
    width: 100%;
    height: 63px;
    position: fixed;
    display: flex;
    justify-content: center;
    top: 60px;
    padding: 10.5px;
    border-bottom: 2px solid var(--offwhite);
    background: var(--white);
    z-index: 11;
  }
  .lowi_search {
    width: 100%;
    max-width: 1140px;
    display: flex;
    justify-content: center;
  }
  .lowi_search_input {
    width: 70%;
  }
  .lowi_search_input_ico {
    position: absolute;
    right: 10px;
    top: 16px;
    font-size: 2.4rem;
    color: var(--green);
    font-weight: lighter;
  }

  .lowi_search::placeholder {
    font-weight: lighter;
  }

  .lowi_body {
    position: absolute;
    top: 120px;
    bottom: 120px;
    display: grid;
    grid-template-rows: auto;
    grid-template-columns: 250px auto;
    width: 100vw;
    padding-top: 12px;
    overflow: hidden;
    max-width: 1660px;
    padding-bottom: 5px;
    padding-left: 11px;
    padding-right: 11px;
  }

  .lowi_filters {
    padding-right: 9px;
    background: var(--white);
    position: sticky !important;
    height: fit-content;
  }
  .lowi_filters h3 {
    color: var(--greymi) !important;
  }
  .lowi_select {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .lowi_list {
    height: 100%;
    padding: 12px 0px 12px 0px;
    overflow-y: auto;
  }
  .lowi_list_ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

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
  .lowi_itm_distance {
    position: absolute;
    right: 19px;
    bottom: 12px;
  }
  .lowi_filter {
    width: 100%;
    border: none;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 965px) {
    .lowi_body {
      position: absolute;
      top: 120px;
      display: flex;
      flex-direction: column;
      width: 100vw;
      padding-top: 12px;
      overflow: hidden;
      padding-left: 9px;
      padding-right: 9px;
    }
    .lowi_filters {
      display: flex;
      flex-direction: column;
      background: var(--white);
      padding-right: 0;
      margin-right: 0;
      width: 100%;
    }
    .lowi_select {
      flex-direction: row;
    }
    .lowi_filter {
      padding: 2px;
    }
  }
  @media screen and (max-width: 510px) {
    .lowi_body {
      bottom: 0;
    }
  }
  @media screen and (max-height: 692px) {
    .lowi {
      height: 100vh;
    }
    .lowi_body {
      bottom: 10px;
    }
  }
`;

export default Lowiska;
