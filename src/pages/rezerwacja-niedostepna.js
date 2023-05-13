import React, { useEffect, useState } from "react";
import { Div } from "../components/cssComponents";
import { Link } from "gatsby";

const ReservationDatesUnavailable = ({ location }) => {
  const [from, setFrom] = useState("");
  useEffect(() => {
    console.log("location", location);
    console.log("component Mounted");
    setFrom(location.state?.fromUrl);
    return () => {
      console.log("component will unmount");
    };
  }, []);
  // console.log("location?", location);
  // if (location.state && !location.state.fromURL) {
  //   return (
  //     <Div>
  //       <h2>Upss cos poszlo nie tak</h2>
  //       <p>za chwile nastapie przekierowanie do strony glownej</p>
  //     </Div>
  //   );
  // }
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
        <Link to={from}>Przejdz do łowiska</Link>{" "}
        <span style={{ fontSize: "0.7em" }}>
          "tu nastapi przekierwoanie do tego samego łowiska"
        </span>
      </Div>
    </>
  );
};

export default ReservationDatesUnavailable;
