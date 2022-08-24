//todos
//1. get fishery data from gatsby data layer using grapql;

import React from "react";
import Map from "../../components/MapCss";

const Voivodeships = () => {
  // const loadLowiskaByVoivodeship = async () => {
  //   // get data from API
  //   const response = await axios.get(
  //     `https://karpteam.herokuapp.com/api/lakes/woj?voivodeship=${voiv}`,
  //     {
  //       mode: "cors",
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       withCredentials: false,
  //       credentials: "same-origin",
  //       crossdomain: true,
  //     }
  //   );
  //   console.log("Lowiska Data", response.data);
  //   setLowiska(response.data);
  //   if (response.data.length === 0) {
  //     setError(true);
  //   } else {
  //     setError(false);
  //     ref.current.scrollIntoView({ behavior: "smooth" });
  //   }
  // };
  // useEffect(() => {
  //   if (voiv === null) {
  //     return;
  //   }
  //   loadLowiskaByVoivodeship();
  // }, [voiv]);
  return <Map />;
};

export default Voivodeships;
