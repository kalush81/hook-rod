import React, { useEffect, useState } from "react";
import { Div } from "../components/cssComponents";
import { Link } from "gatsby";

const ReservationDatesUnavailable = ({ location }) => {
  //const [goTo, setGoTo] = useState("");
  //console.log("goto:", goTo);
  console.log("location.state", location.state);
  // useEffect(() => {
  //   setGoTo(location.state.fromUrl);
  //   return () => {
  //     setGoTo("/");
  //   };
  // }, []);

  return (
    <>
      <Div>
        <p>Niestety rezerwacja w podanych datach jest niemozliwa</p>
        <p>
          Prawdopodobnie ktos przed Toba juz zarezerwowal te daty na pegu nr:xxx
          i lowisku nr xxx
        </p>
        <p>Sprawdz terminarz dostepnosci i sprobuj ponownie</p>
        <span style={{ fontSize: "0.7em" }}>
          "w miejscach xxx bedą dane nieudanej rezerwacji"
        </span>
      </Div>
      <Div>
        <Link to={"/"}>Przejdz do łowiska</Link>{" "}
        <span style={{ fontSize: "0.7em" }}>
          "tu nastapi przekierwoanie do tego samego łowiska"
        </span>
      </Div>
    </>
  );
};

export default ReservationDatesUnavailable;
