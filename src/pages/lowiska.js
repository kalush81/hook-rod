import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageContainer } from "../components/cssComponents";
import axios from "axios";
import { Select, ConfigProvider, Skeleton } from "antd";
import plPL from "antd/lib/locale/pl_PL";
import dayjs from "dayjs";
import FisheryCard from "../components/FisheryCard";
import { graphql, useStaticQuery } from "gatsby";
const { Option } = Select;

const Lowiska = function ({ location = {} }) {
  let coords = {};
  let dates = [];
  let distance = null;

  if (location && location.state && location.state.city) {
    coords = location.state.city;
    dates = location.state.dates;
    distance = location.state.distance;
  }

  const formatedDates = dates.map((date) =>
    dayjs(date.$d).format("YYYY-MM-DD")
  );
  const sday = formatedDates[0];
  const eday = formatedDates[1];

  const [serverError, setServerError] = useState(null);
  const [clientError, setClientError] = useState(null);
  const [loading, setLoading] = useState(null);
  const [mergedLakes, setMergedLakes] = useState([]);

  const data = useStaticQuery(graphql`
    query QueryLakesForSearchResuslt {
      allLake {
        edges {
          node {
            id
            name
            voivodeship
            city
            numberOfPegs
            priceMin
            lakeImageFile {
              childImageSharp {
                gatsbyImageData
              }
            }
            fishOnLake {
              length
              name
              weight
            }
          }
        }
      }
    }
  `);

  useEffect(() => {
    const loadLowiska = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://hookandrod.herokuapp.com/api/lakes/checkLakesOnDate`,
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
              distance: parseInt(distance) || null,
              eday,
              sday,
              ulat: coords?.lat,
              ulng: coords?.long,
            },
          }
        );
        const combined = response.data.map((lake) => {
          let lakeFromEdge = data.allLake.edges.find(
            (edge) => edge.node.id === String(lake.id)
          );
          if (lakeFromEdge) {
            return { ...lake, ...lakeFromEdge.node };
          }
          return lake;
        });
        setLoading(false);
        setServerError(null);
        setClientError(null);
        setMergedLakes(combined);
      } catch (error) {
        setMergedLakes([]);
        if (error.response.status >= 500 && error.response.status <= 599) {
          setServerError("Problem z serwerem");
        }
        if (error.response.status >= 400 && error.response.status <= 499) {
          setClientError("Coś poszło nietak, spróbuj ponownie");
        }
        console.log(
          "couldnt fetch from https://hookandrod.herokuapp.com/api/lakes/checkLakesOnDate"
        );
      }
    };

    loadLowiska();

    return () => {
      console.log("lowiska page component is unmounted");
    };
  }, [eday, sday, distance, coords?.lat, coords?.long, data.allLake.edges]);

  return (
    <ConfigProvider locale={plPL}>
      <PageContainer>
        <LowiskaCss>
          <div className="lowi">
            {/* <SearchBar /> */}
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
                  >
                    <Option value="10">WC</Option>
                    <Option value="101">Namiot</Option>
                    <Option value="50">Ponton</Option>
                    <Option value="100">WiFi</Option>
                  </Select>
                </div>
              </div>
              <section className="lowi_list">
                {loading && (
                  <>
                    <Skeleton active />
                    <br />
                    <Skeleton active />
                    <br />
                  </>
                )}
                {serverError}
                {clientError}
                <ul className="lowi_list_ul">
                  {mergedLakes.length === 0 &&
                    clientError === null &&
                    serverError === null &&
                    !loading &&
                    "not found"}
                  {mergedLakes.length > 0 &&
                    mergedLakes.map((node) => {
                      return <FisheryCard key={node.id} data={node} />;
                    })}
                </ul>
              </section>
            </div>
          </div>
        </LowiskaCss>
      </PageContainer>
    </ConfigProvider>
  );
};

const LowiskaCss = styled.div`
  scroll-behavior: smooth;
  //height: 100vh;
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
    color: var(--black);
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
