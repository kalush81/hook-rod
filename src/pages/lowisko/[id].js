/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { Link } from "gatsby";

import axios from "axios";

import plPL from "antd/lib/locale/pl_PL";
import "moment/locale/pl";
import { Button, ConfigProvider, Breadcrumb } from "antd";

import { Collapse } from "react-collapse";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

import CalendarMedium from "../../components/CalendarMedium";
import Reservation from "../../components/Reservation.js";

let lowiskoDataMock = {
  id: 26,
  name: "Staw u Lomaxa",
  city: "Stalowa Wola",
  postCode: "37450",
  address: "Spacerowa 12",
  latitude: 50.558523,
  longitude: 22.083079,
  imagePath: "https://i.ibb.co/H76PLN1/received-301554618657421.jpg",
  voivodeship: "Podkarpackie",
  regulations: null,
  numberOfPegs: 5,
  user: null,
  pegs: [
    {
      id: 25,
      pegNumber: 1,
      pegName: "Stanowisko 1",
      reservation: [
        {
          startDay: "12.05.2022",
          endDay: "14.05.2022",
          createdAt: "2022-05-10T10:53:06",
          status: "PENDING",
          cost: 0.0,
          paymentType: null,
          reservation_FEE: null,
        },
        {
          startDay: "01.06.2022",
          endDay: "02.06.2022",
          createdAt: "2022-05-26T09:01:43",
          status: "PENDING",
          cost: 55.5,
          paymentType: null,
          reservation_FEE: 5.0,
        },
        {
          startDay: "05.06.2022",
          endDay: "07.06.2022",
          createdAt: "2022-05-26T09:08:39",
          status: "PAID",
          cost: 55.5,
          paymentType: null,
          reservation_FEE: 5.0,
        },
        {
          startDay: "10.06.2022",
          endDay: "13.06.2022",
          createdAt: "2022-05-27T11:54:35",
          status: "PENDING",
          cost: 55.5,
          paymentType: null,
          reservation_FEE: 5.0,
        },
        {
          startDay: "03.08.2022",
          endDay: "04.08.2022",
          createdAt: "2022-08-03T11:14:59",
          status: "PAID",
          cost: null,
          paymentType: null,
          reservation_FEE: 5.0,
        },
      ],
    },
    {
      id: 26,
      pegNumber: 2,
      pegName: "Stanowisko 2",
      reservation: [
        {
          startDay: "12.05.2022",
          endDay: "14.05.2022",
          createdAt: "2022-05-10T10:53:06",
          status: "PENDING",
          cost: 0.0,
          paymentType: null,
          reservation_FEE: null,
        },
        {
          startDay: "01.06.2022",
          endDay: "02.06.2022",
          createdAt: "2022-05-26T09:01:43",
          status: "PENDING",
          cost: 55.5,
          paymentType: null,
          reservation_FEE: 5.0,
        },
        {
          startDay: "01.06.2022",
          endDay: "02.06.2022",
          createdAt: "2022-05-26T09:08:39",
          status: "PENDING",
          cost: 55.5,
          paymentType: null,
          reservation_FEE: 5.0,
        },
        {
          startDay: "01.06.2022",
          endDay: "02.06.2022",
          createdAt: "2022-05-27T11:54:35",
          status: "PENDING",
          cost: 55.5,
          paymentType: null,
          reservation_FEE: 5.0,
        },
        {
          startDay: "03.08.2022",
          endDay: "04.08.2022",
          createdAt: "2022-08-03T11:14:59",
          status: "PENDING",
          cost: null,
          paymentType: null,
          reservation_FEE: 5.0,
        },
      ],
    },
  ],
  additionalList: [],
};

const Lowisko = ({ params }) => {
  const { id } = params;

  const [opened, setOpened] = useState(false);
  const [lowiskoData, setLowiskoData] = useState(null);
  const [isError, setIsError] = useState(false);

  const toggleOpened = () => setOpened((value) => !value);

  console.log("lowiskoData in[id].js", lowiskoData);

  useEffect(() => {
    const loadLowiskoData = async () => {
      try {
        const response = await axios.get(
          `https://karpteam.herokuapp.com/api/lakes/${id}`,
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
        setLowiskoData(response.data);
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

    loadLowiskoData();

    // get data from API
  }, [id]);

  if (!lowiskoData)
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "auto",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          position: "absolute",
        }}
      >
        <h2>
          {isError ? (
            <span>{isError}</span>
          ) : (
            <span>...ładowanie danych łowiska</span>
          )}
        </h2>
      </div>
    );

  return (
    <>
      <ConfigProvider locale={plPL}>
        <LowiskoCss>
          <div className="lowisko">
            <div className="breadcrumbs">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link to="/">{}</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Łowiska</Breadcrumb.Item>
                <Breadcrumb.Item>
                  {lowiskoData && lowiskoData.city}
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {lowiskoData && lowiskoData.name}
                </Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div className="lowisko_body container">
              <div className="lowisko_card">
                <h1 className="lowisko_name">
                  {lowiskoData && lowiskoData.name}
                </h1>
                <div className="lowisko_city">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span> {lowiskoData && lowiskoData.city}</span>
                </div>
                <div
                  className="lowisko_image"
                  style={{
                    backgroundImage: `url(${
                      lowiskoData && lowiskoData.imagePath
                    })`,
                  }}
                ></div>
              </div>
              <Reservation pegs={lowiskoData && lowiskoData.pegs} />
              <section>
                {lowiskoData && (
                  <CalendarMedium
                    id={id}
                    lowiskoData={lowiskoData}
                    maxPegs={
                      lowiskoData?.pegs?.length > 5
                        ? 5
                        : lowiskoData.pegs?.length
                    }
                    maxDays={14}
                  />
                )}
              </section>
              <div className="lowisko_udogo"></div>
              <div className="lowisko_regu">
                <h2>Regulamin Łowiska</h2>
                <div className="lowisko_regu_body">
                  <h3 className="text_toggle" onClick={toggleOpened}>
                    Regulamin Łowiska Extra-Carp Radymno {opened ? " v" : " >"}
                  </h3>
                  <Collapse isOpened={opened}>
                    <p>
                      1. Wszystkie opłaty dokonujemy u właściciela łowiska lub
                      osoby upoważnionej. Marcin tel: 793-026-620, Kamil
                      791-130-256, Maciek 570-510-088, Mateusz 505-973-234
                      e-mail: kontakt@extra-carp.pl
                    </p>{" "}
                    <p>
                      2. Opłata za wędkowanie to 60 zł za dobę (Każdy wędkarz ma
                      prawo łowić max. na 3 wędki)
                    </p>{" "}
                    <p>
                      3. W przypadku opuszczenia łowiska przez osobę wędkującą
                      podczas trwania opłaconej doby opłaty za wędkowanie
                      pobierane są ponownie.
                    </p>{" "}
                    <p>
                      4. Przed wjazdem na łowisko i jego opuszczeniem należy
                      powiadomić właściciela lub osobę upoważnioną.
                    </p>{" "}
                    <p>
                      5. Doba na łowisku trwa od godz 12.00 do 12.00 następnego
                      dnia jednak istnieje możliwość wcześniejszego przyjazdu na
                      stanowisko lub późniejsze jego opuszczenie po uzgodnieniu
                      z właścicielem, ale tylko w przypadku gdy na dane
                      stanowisko nie ma kolejnej rezerwacji w tym terminie.
                    </p>{" "}
                    <p>
                      6. Łowisko czynne od 1 kwietnia do 31 październik, w
                      miesiącu marcu i listopadzie zależności o warunków
                      pogodowych.
                    </p>{" "}
                    <p>
                      7. Poza wyznaczonymi terminami obowiązuje całkowity zakaz
                      wstępu na łowisko bez wiedzy właściciela.
                    </p>{" "}
                    <p>
                      8. W razie wypadków losowych i braku możliwości przyjazdu
                      na łowisko zwroty zaliczki będą rozpatrywane
                      indywidualnie.
                    </p>{" "}
                    <p>
                      9. Zaliczkę należy wpłacać z podaniem danych osoby
                      rezerwującej, terminu przyjazdu oraz numeru
                      zarezerwowanego stanowiska.
                    </p>{" "}
                    <p>
                      10. Od Karpiarzy wymagane jest posiadanie na stanowisku:
                      maty karpiowej o długości przynajmniej 120 cm, szerokości
                      80cm, grubości 8cm wypełnionej wewnątrz miękką-stabilną
                      otuliną lub tzw. maty-kołyski, środka do dezynfekcji,
                      podbieraka o rozstawie ramion 1 metr, żyłki minimum
                      0,30mm. Na łowisku można stosować plecionkę, ale należy
                      wtedy zastosować przypon strzałowy z żyłki mono lub
                      fluocarbon min 10 m. Dopuszczone wszystkie modele haków
                      zadziorowych z wyłączeniem haków typu Longshank nailer
                      tzw. Bananówbr{" "}
                    </p>
                    <p>
                      11. Na łowisku obowiązuje zakaz nęcenia surowymi zbożami:
                      kukurydza, orzech tygrysi, łubin, pszenica itp.{" "}
                    </p>
                    <p>
                      12. Dozwolone jest wywożenie zestawów oraz nęcenie ze
                      środka pływającego. Osoby poruszające się po akwenie
                      środkami pływającymi obligatoryjnie muszą używać kapoków
                      lub kamizelek asekuracyjnych.{" "}
                    </p>
                    <p>
                      13. Złowione ryby należy po delikatnym wypięciu jak
                      najszybciej z powrotem wpuścić do akwenu, ryb tych nie
                      wolno przetrzymywać w workach karpiowych ani też różnego
                      rodzaju siatkach. Ze złowionymi rybami należy obchodzić
                      się w sposób bardzo delikatny dbając o ich zdrowie i
                      bezpieczeństwo, należy polewać je wodą. Złowione okazy
                      można zważyć i wykonać sesję zdjęciową, która jednak nie
                      może trwać dłużej niż 5 minut. Ryby o wadze powyżej 20 kg,
                      muszą być zgłoszone do opiekuna.{" "}
                    </p>
                    <p>
                      14. Szczególnie mile będą widziani wędkarze zachowujący
                      się kulturalnie, spokojnie oraz pozostawiający po sobie
                      czystość i porządek. Wędkarz zobowiązany jest wysprzątać
                      swoje stanowisko wędkarskie przed i po zakończeniu
                      wędkowania (śmieci należy pozostawić w kontenerze
                      przeznaczonym do tego celu lub zabrać z łowiska ze sobą).
                      Zaśmiecanie będzie karane karą grzywny 100 zł.
                    </p>
                    <p>
                      15. Właściciele łowiska nie ponoszą odpowiedzialności za
                      wypadki losowe oraz rzeczy pozostawione na łowisku, a
                      także zastrzegają sobie prawo do zmiany regulaminu.{" "}
                    </p>
                    <p>
                      16. Osoby łamiące regulamin zostaną wydalone z terenu
                      obiektu bez zwrotu opłat i bez możliwości ponownego
                      przyjazdu. Dotyczy to także osób towarzyszących.{" "}
                    </p>
                    <p>
                      17. Osoby, które zostaną przyłapane na kradzieży ryb
                      zostaną ukarane oraz zatrzymane do dyspozycji policji.{" "}
                    </p>
                    <p>
                      18. Właściciele lub osoby upoważnione mają prawo
                      kontrolować osoby przebywające na łowisku oraz ich
                      pojazdy.{" "}
                    </p>
                    <p>
                      19. Każdy przywłaszczony kilogram ryby podlega karze 1000
                      zł. Nie tolerujemy tzw. „mięsiarzy ” – będą surowo karani.{" "}
                    </p>
                    <p>
                      20. Jeśli ktoś zostanie złapany na łowieniu wędkami za
                      które nie została uiszczona opłata poniesie karę w
                      wysokości 100 zł za każdą nieopłaconą wędkę.{" "}
                    </p>
                    <p>
                      21. Dopuszcza się możliwość wędkowania, rozbijania
                      namiotów w obrębie stanowiska, jak również zanęcania,
                      sondowania, stawiania markerów (Nie wolno znaczyć łowiska
                      przedmiotami innymi niż przeznaczone do tego celu np.
                      markery). Czynności te nie mogą utrudniać wędkowania
                      wędkarzom przebywającym na innych stanowiskach.{" "}
                    </p>
                    <p>
                      22. Na łowisku obowiązuje zakaz spiningowania i łowienia
                      „na żywca”. Osoby łamiące regulamin zostaną wyproszone z
                      łowiska.{" "}
                    </p>
                    <p>23. Obowiązuje metoda ZŁÓW i WYPUŚĆ „NO KILL” </p>
                    <p>
                      24. Kategorycznie zabrania się: – Obowiązuje całkowity
                      zakaz zabierania ryb. – Przetrzymywania ryb w siatce ,
                      worku itp. – Brania ryb pod skrzela. – Całkowity zakaz
                      palenia ognisk (dozwolony grill) – Kąpieli w łowisku. –
                      Zanieczyszczania łowiska i zaśmiecania terenu łowiska. –
                      Nadużywania alkoholu, całkowity zakaz zakłócania spokoju
                      innym użytkownikom łowiska. – Niszczenia zieleni, łamania
                      drzewek i niszczenia przyrody. – Puszczania psów bez
                      smyczy i kagańca, poza obrębem swojego stanowiska. –
                      Nakazuje się łowić na tzw. zestaw z bezpiecznym klipsem. W
                      razie udaremnienia kłusownictwa na zbiorniku obowiązuje:
                      Przestępstwo kłusownictwa w ustawie o rybactwie
                      śródlądowym: Art. 27a. 1. Kto: 1) poławia ryby nie będąc
                      uprawnionym do rybactwa (art. 4), 2) dokonuje połowu ryb
                      bez upoważnienia, o którym mowa w art. 5, 3) narusza
                      zakazy określone w art. 8 ust. 1 pkt 1–10 i ust. 2, z
                      zastrzeżeniem art. 27 ust. 1 pkt 2, 4) narusza zakazy
                      określone w art. 10 ust. 1, art. 14 ust. 2 oraz art. 19
                      ust. 1 – podlega grzywnie, karze ograniczenia wolności
                      albo pozbawienia wolności do lat 2. 2. W razie skazania za
                      przestępstwa określone w ust. 1 orzeka się: 1) nawiązkę na
                      rzecz pokrzywdzonego uprawnionego do rybactwa w wysokości
                      określonej przez sąd, 2) przepadek narzędzi lub innych
                      przedmiotów, które służyły lub były przeznaczone do
                      popełnienia przestępstwa, a także przedmiotów pochodzących
                      bezpośrednio lub pośrednio z przestępstwa. 3. Orzeczenie o
                      przepadku, o którym mowa w ust. 2 pkt 2, może dotyczyć
                      również przedmiotów niestanowiących własności sprawcy.
                      Wejście lub wjazd na teren łowiska oznacza zgodę oraz
                      akceptację regulaminu Łowiska Extra-Carp.
                    </p>
                  </Collapse>
                  <div className="text_toggle" onClick={toggleOpened}>
                    {opened ? "Zwiń..." : "Rozwiń..."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </LowiskoCss>
      </ConfigProvider>
    </>
  );
};

const LowiskoCss = styled.div`
  scroll-behavior: smooth;
  height: calc(100vh - 120px);
  overflow-x: hidden;
  font-size: 16px;

  .lowisko {
    background: var(--white);
    width: 100vw;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 12px;
  }

  .lowisko_body {
    display: grid;
    grid-template-rows: auto auto auto auto auto;
    grid-template-columns: 2fr 1fr;
    grid-gap: 12px;
    /* margin-top: 132px; */
    width: 100vw;
    /* height: 100%; */
    /* padding-top: 121px; */
    overflow: hidden;
    max-width: 1340px;
    overflow: visible;
  }
  .lowisko_card {
    grid-row: 1;
    grid-column: 1;
  }
  .lowisko_image {
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    height: 390px;
  }
  .lowisko_name {
    color: var(--black);
    margin-bottom: 0;
  }
  .losiwko_cal_menu {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
  }
  .lowisko_cal_menu_right {
    display: flex;
    align-items: center;
  }
  .key_indicate {
    margin: 0 9px 0 0;
    color: var(--black);
    display: inline-flex;
    align-items: center;
  }
  .key_indicate_green:before {
    content: "0";
    width: 26px;
    height: 23px;
    border-radius: 9px;
    margin-right: 4px;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: var(--litegreen);
  }
  .key_indicate_yellow:before {
    content: "0";
    width: 26px;
    height: 23px;
    border-radius: 9px;
    margin-right: 4px;
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: var(--yellow);
  }
  .lowisko_cal_filter {
    width: 169px;
    margin-left: 6px;
  }

  /* .lowisk_map {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 1;
  } */

  .lowisko_cal {
    grid-row: 2;
    grid-column-start: 1;
    grid-column-end: 2;
    border-bottom: 1px solid var(--greymi);
    padding-bottom: 21px;
  }
  .lowisko_cal h2 {
    padding-left: 12px;
  }

  .lowisko_cal_row {
    margin-bottom: 6px;
    border-radius: 6px;
    display: flex;
    justify-content: space-evenly;
    padding: 3px 2px;
  }

  .lowisko_cal_row--1 {
    /* border: 2px solid rgba(209, 77, 1, 0.49); */
  }
  .lowisko_cal_row--2 {
    /* border: 2px solid rgba(51, 192, 180, 0.49); */
  }
  .lowisko_cal_row--3 {
    /* border: 2px solid rgba(161, 222, 82, 0.49); */
    /* background: rgb(156, 183, 131);
    background: linear-gradient(
      10deg,
      rgba(156, 183, 131, 0.79) 0%,
      rgba(77, 120, 83, 0.89) 100%,
      rgba(66, 93, 74, 0.6) 100%
    ); */
    background: rgb(167, 137, 73);
    background: linear-gradient(
      90deg,
      rgba(177, 143, 70, 0.79) 0%,
      rgba(191, 134, 38, 0.89) 100%
    );
  }
  .lowisko_cal_row--4 {
    /* border: 2px solid rgba(203, 184, 255, 0.49); */
  }
  .lowisko_cal_row--4 {
    /* border: 2px solid rgba(0, 148, 254, 0.49); */
  }
  .lowisko_cal_row--5 {
    /* border: 2px solid rgba(255, 200, 0, 0.49); */
  }
  .lowisko_cal_day {
    display: inline-block;
    width: 32px;
    height: 100%;
    /* border: 1px solid #ddd; */
    border-radius: 9px;
    text-align: center;
    margin-right: 2px;
    font-size: 20px;
    color: var(--greymi);
    transition: background 0.3s ease-out;
    background: rgba(var(--offwhitergba), 0.49);
  }

  .owisko_cal_day--available {
    background: var(--litegreen);
    cursor: pointer;
    color: var(--black);
  }
  .owisko_cal_day--selected {
    background: var(--yellow);
    cursor: pointer;
  }

  .owisko_cal_day--available:hover {
    background: var(--yellow);
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1);
  }
  .owisko_cal_day--available:hover {
    background: var(--yellow);
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1);
  }

  .lowisko_udogo {
    grid-row: 3;
    grid-column: 1;
    /* margin-left: -15px; */
    /* width: 84%; */
  }

  .lowisko_regu {
    grid-row: 4;
    grid-column: 1;
    background: var(--white);
    /* margin: 12px; */
    /* border-radius: 9px; */
    padding-right: 21px;
    margin-right: 21px;
    /* border-right: 2px solid var(--offwhite); */
    /* margin: 21px 0; */
    /* box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1); */
    border-radius: 9px;
    padding: 12px;
  }
  .lowisko_regu h2 {
    color: var(--black) !important;
  }

  .lowisko_regu_body {
    font-size: 16px;
  }

  .lowisko_pricing {
    grid-row: 1;
    grid-column: 2;
    margin: 0 0;
    overflow-y: auto;
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.1);
    border-radius: 9px;
    padding: 12px 19px 26px;
    margin-left: 19px;
    position: sticky;
    top: 90px;
    height: fit-content;
  }
  .lowisko_pricing_cennik {
    border-bottom: 1px solid var(--greymi);
    margin-bottom: 19px;
  }

  .lowisko_itm {
    border: 2px solid var(--offwhite);
    border-radius: 9px;
    padding: 12px;
    background: var(--white);
    margin-bottom: 12px;
    box-shadow: 0px 3px 9px 0 rgb(0 24 69 / 5%);
    cursor: pointer;
    transition: all 0.3s ease-out;
  }
  .lowisko_itm:hover {
    transform: translate3d(1px, -1px, -1px);
    border: 2px solid var(--yellow);
  }

  .lowisko_itm_header {
    font-size: 21px;
  }

  .lowisko_itm_amnt {
    display: flex;
    white-space: pre-wrap;
  }
  .lowisko_itm_amnt svg {
    margin-right: 3px;
  }

  .ant-breadcrumb {
    padding: 126px 0 59px;
    max-width: 1340px;
    width: 100%;
    margin: 0 auto;
  }

  .breadcrumbs {
    width: 100vw;
  }

  .lowisko_filter {
    width: 100%;
    border: none;
    margin-bottom: 12px;
  }

  .text_toggle {
    cursor: pointer;
    transition: opacity 0.3s ease-out;
  }
  .text_toggle:hover {
    opacity: 0.69;
  }
`;

export default Lowisko;
