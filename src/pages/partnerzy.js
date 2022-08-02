import React from "react";
import styled from "styled-components";
import zwedka from "../assets/images/partner-zwedka.png";
import pvaking from "../assets/images/partner-pva.png";
import pescador from "../assets/images/partner-pescador.png";
import meus from "../assets/images/partner-meus.png";
import bg from "../assets/images/partnerzy-cover.jpg";

const Partnerzy = () => {
  return (
    <Css style={{ backgroundImage: `url(${bg})` }}>
      <div className="main">
        <div className="main_div">
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.facebook.com/groups/142539496494765"
          >
            <div className="partner_div">
              <img className="zwedka" alt="zwedka" src={zwedka}></img>
              <div className="text_div"></div>
            </div>
          </a>
          <a
            href="https://www.pvaking.pl/sklep/"
            rel="noreferrer"
            target="_blank"
          >
            <div className="partner_div">
              <img className="pva" alt="zwedka" src={pvaking}></img>
              <div className="text_div"></div>
            </div>
          </a>
          <a
            href="https://www.pescadorbaits.pl/reklamacje"
            rel="noreferrer"
            target="_blank"
          >
            <div className="partner_div">
              <img className="zwedka" alt="zwedka" src={pescador}></img>
              <div className="text_div"></div>
            </div>
          </a>
          <a href="https://meus.net.pl/" rel="noreferrer" target="_blank">
            <div className="partner_div">
              <img className="zwedka" alt="zwedka" src={meus}></img>
              <div className="text_div"></div>
            </div>
          </a>
        </div>
      </div>
    </Css>
  );
};

const Css = styled.div`
  height: calc(100vh - 120px);
  background-size: cover;
  background-position: bottom !important;
  box-shadow: inset 0 0 0 1000px rgba(0, 0, 0, 0.2);
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 11;
  font-family: Lato;
  overflow-y: scroll;
  overflow-x: hidden;

  .main_div {
    width: 100%;
    max-width: 1630px;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 60px;
  }
  .partner_div {
    display: flex;
    opacity: 1;
    align-items: center;
    justify-content: center;
    width: 270px;
    height: 270px;
    background: rgba(237, 237, 237);
    border-radius: 50px;
    padding: 15px;
    margin: 6px;
    box-shadow: 1px 2px 9px rgba(0, 0, 0, 0.5);
  }
  @media screen and (max-width: 510px) {
    height: 100%;
  }
  @media screen and (max-width: 564px) {
    align-items: flex-start;
  }
  @media screen and (min-width: 865px) {
    overflow-y: hidden;
  }
  @media screen and (max-height: 692px) {
    height: 100%;
  }
`;

export default Partnerzy;
