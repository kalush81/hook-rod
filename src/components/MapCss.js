import React, { useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "gatsby";

function Map({ children, disabled }) {
  const initialName = "Wybierz Województwo";

  const [name, setName] = useState(initialName);
  const [voiv, setVoiv] = useState(null);

  const ref = useRef();

  const handleClick = (e) => {
    setVoiv(e.target.id);
  };

  return (
    <MapCss disabled={disabled}>
      <div className="mapdiv">
        <h1>{name}</h1>
        {/* <h3 className={`errordiv ${error ? "" : "hidden"}`}>
          Brak łowisk w tym województwie.
        </h3> */}
        <svg viewBox="0 0 1000 948" xmlns="http://www.w3.org/2000/svg">
          <Link to={"/warmińsko-mazurskie"}>
            <path
              d="M866.3 77.7l0.3 1.3-2.5 8.3-5.7 6-6.6 4.5-22.2 3.1-9.4 13.3 10.1 13.5 0.5 5.1 1.1 4.7 5 5 10.6 14.8-0.4 7.9-4 7.8-3.5 9.8-5.7 6.1-27.8 17.3-9.6 10.9-17.2 11.9-7.5 1.1-3.1 1.3-2.9 2.4-6.3 2.2-14.2-0.9-7.3 3.2-12 1-2.5 1.3-2.8 5.6-4.1 2.9-4.5 0.7-8.9-0.8-7.5 9-9 2.9-9.5 0-7.3 4.2-6.3 1.3-7.2-0.1-3.6 2.9-3.3 4-13.9 8.1-3.7 1-3.8-0.4-3.1 2.5-1.6 5.6-2.6 3-3 1.5-7.5 1.4-31.5-4.9-0.9-1-0.6-1.5-1.6-1.1-1.7-0.3-3.9 1.2-2.6 5.1-2.9 2.4-3.4 0.9-1.5-15.2-5.1-13-5.6-3.9-11.4-3-10.6-6.5-7.6-2.5-1.9-0.1-2.4-1-1.5-2.2-3-5.8-2.5-7.1-8.6-16.9 14.7-27.5 3.5-3.8 4.2-2.7 8 0.6 5.6-2.5 0.2-2.7 1.2-1.9 1.6-4.8 1.8-1.9 1.2-2.2 0-2.8 0.4-2.8-5-1.3-9.8 0.8-3.6-1.8 2-6.6-2.6-3.6-5.1-0.6-4.8-2.9-3.4-5.5-1.8-7.3-0.3-3.3 1.6-2.4 4.4-4.4 1.5-2.8 1.2-3.1-1.1-4.3-2-3.6-2.2-6.5 0.7-5.8 2.4-2.8 8.8 1.1 2.4-0.3-0.4 1.6-0.9 1.3-0.4 0.8-0.4 2.1 0 2.5 1.4-1.6 1.7-4.4 0.4-0.5 0.8-1 2.5-4.1 2.6-2.5 2-1 0.6-0.2 7.7-4.9 1.7-0.7 3.9-0.5 6.4-4.8 1.4-0.5 1.4-0.2 0.6-0.6 0.4-0.8 0.8-2.2 1-1 0.8-0.6-0.1-0.9-0.4-2.1 1.5-0.1 59.2 3.1 57.5 3.1 35.6 1.9 43.2 2.3 55.4 3 42 2.2 6.8-2.3 1.9-1.5 2.5-4.7z"
              id="warmińsko-mazurskie"
              name="Warmińsko-Mazurskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/pomorskie"}>
            <path
              d="M524.8 99.1l0.4-1.6-2.4 0.3-8.8-1.1-2.4 2.8-0.7 5.8 2.2 6.5 2 3.6 1.1 4.3-1.2 3.1-1.5 2.8-4.4 4.4-1.6 2.4 0.3 3.3 1.8 7.3 3.4 5.5 4.8 2.9 5.1 0.6 2.6 3.6-2 6.6 3.6 1.8 9.8-0.8 5 1.3-0.4 2.8 0 2.8-1.2 2.2-1.8 1.9-1.6 4.8-1.2 1.9-0.2 2.7-5.6 2.5-8-0.6-4.2 2.7-3.5 3.8-14.7 27.5-5.4 2.4-11.4 0.7-5.4-2.2-3.1-2-6.5-6.8-1.7-1-1.3-1.6-2-1.2-8.1-1.1-5.7 2.1-3.7 2.4-8.5-5.1-17.9-3-3.3-3.1-2.9-3.7-3.5-0.4-16.9 2.6-12.7-2.5-2.7 2.1-4 7.5-6.9 2.5-3.2 3-0.5 2.2-0.4 2.4-0.1 3.6-6.2 2.5-13.8-3.7-3.7 0.4-2.7 3.9-2.5 5.3-3 10.5-2.8 1.7-4.4-5.3-5.3-2.9-20.3-0.8-5.8-3.6-4.1-7.3-4.8-5.9-1.8-18.3 4.2-4.2 3-5.3-1.2-3.6-1.7-2.8-2-1-0.1-3.3 5-2.4 5.5 0.8-1.9-4.1-2.3-3.3-2.8-2.5-3.7-7.6-2.4-2.9-4.3-3.1 0-9.3-0.8-9.4-6.3-19.3 13.9-3.4 1.6-2.5-0.4-4.2-1.9-2.7-1.1-2.4 0.7-3.1 2.7-2.7 1-4.6-0.7-8.2-3.1-6.3-8.2-11.9-7.1-14.4 7.4-2.9 4.2-0.8 3.8-1.3 9.5-10.5 30.1-14.2 37.7-7.1 16.9-5.8 26.6-2.5 16.4 0 2.2 0.8 3.6 3.2 1.4 0.7 2 0.5 34.1 20.4 6.2 8.1 1 1.9 1 2.7 0.1 2.3-1.8 0.8-1.5-3-1.8-1.3-1.2-3.3-1.7-2.1-4.7-8-0.9-0.5-3.5-0.7-0.9-0.4-1-1.6-2.8-1-5.9-4.1-5.9-2.8-0.9-1.3-3.3-2.5-0.8-0.4-1.2 0.5-0.7 0.9-1.4 4.9-0.2 1.2 0 2.5 0.6 0.6 2.4 1.1 1.7 2.8 1.4 3.1-0.4 2.5 0 1.1 1.2 1.3-0.6 3.3 1.1 1.5 1.9-0.4 1.7-2.2-0.6 2.9 0.8 2.3 1.2 1.9 2.6 7.8 0.7 1.7-0.4 3.9 0.1 6.8 0.7 6.4 1.4 2.9 1.5 0.5 3.1 2.3 1.5 0.6 1.4 0.1 1.6 0.5 1.5 1 0.6 1.5 1.6 2.3 16.8 5.5 3.7 0.2 3.2-1.7 0.8 0.9 1.2 0.6 2.7 0.9 37.4-5.6 8.2-4 3.9-1 3.2-1.4 6.1-6.4 1.7-0.8 1.1 0.9-17.7 13.7-4.3 2.2-4.2 1.2-8.7 0.8-4.1 1.6 0 1 2.3 3.1 1.1 0.6-1.1 1-0.3 2.4 2.5 1.5 8.8 1.1 2.4-0.3 0 1.3-0.4 0.3z"
              id="pomorskie"
              name="Pomorskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/dolnośląskie"}>
            <path
              d="M224.8 516.3l8.7-1.6 4.1 1 11.2 6.2 1.8 4 0.3 5.2 4.3 7.7 9.7 5.4 5.4 6 11.5 4.1 20.6-3.6 3.7-8.6 4.2-0.9 11.7 0.1 11 3 9.9 6.4-1 4.6-1.3 4-2.5 1.6-1.3 3.4 0.6 6.9 2.3 5.9 5.9 1.4 6.1-1.3 3.8 1.1 3.5 2.9-2.8 6.7 1.2 16.3 1.3 7.9-3.3 2.1-3.5 0.8-3.4-0.2-3.3 1.1-2.6 2.8-5.8 13.3-1 3.9-0.6 4.1-1.6 4.8-3.2 2.1-4.7 6.2-3.6 8.3-8.3 12.3-7.2 13.7-2.3 8.8-3.5 6.2-6.1 1-5.2 4-7.2 17.9-0.4 1.9-2.8-1.7-2.3-0.3-2.7 1.7 0 2.1 3.2 4.8 1.1 2.8 0.8 3.3 1 3.1 1.8 1.9 2.5 1.4 1.8 2 1 2.8 0.2 3.8 1.3 1.7 0.2 2.1-0.7 1.3-1.2-0.4-1.5-2.6-0.6-0.4-1.5 0-0.2 0.4 0 1.9-1.2 0.6-1.8-0.6-0.9 0-1.2 0.8-1.6 2.3-1 0.9-2.3 0.6-2-0.2-2 0.3-2.2 1.9-1.8 2.8-1.1 2.1-1.2 1.7-2.2 1.6-3.1 4.2-4 0.3-4.2-2.2-3.4-3.1-1.8-2.3-0.9-2-1.2-5.3-1-2.9-3-3.2-1.3-2.3-1.5-2-2.5-4.6-1.4-2-2.2-1.6-4.5-1.6-1.7-2.4-0.3-1.3 0-2.9-0.7-1.4-0.9-0.3-4.6 0-2.6 1.1-1.3-1-0.4-0.9-1.3-4-3.2-0.6-1-2.8 0.8-2.5 2 0.5-0.7-2.3 2.1-0.8 1.5-1.3 1.8-1.1 1.5-1.2 0.7-2.1 1.6-0.5 3.2 0.9 1.7-0.4 0.9-1.3 2.1-2 0.6-1.1 0.2-2.9 0.7-1.4-0.3-1.7 3.1-1.3-0.9-3-8.5-9-3.1-1.7-3.2-0.9-3.6 0-1.3 0.2-1.5 3.6-1.2 1.6-1.6 0.3-1.6-0.7-3.1-2.4-4.2-0.4-6.2 6-4.2 0.8-0.3-1 0.3-1 1.4-1.2 0.2-1.9-0.5-2.1-0.9-2.2-1.3-2.4-1.3-1.3-1.7-0.3-5.9 2.3-2.7 0-0.7-0.2-5-8.6-0.5-2-2.5-0.2-8.3 2-1-0.4-0.7-0.7-1.4-2-1.1-0.8-19.9-7-4.2 0.4-0.9 1.1-1 1.7-1.1 1.2-1.4-0.5-0.6-1.3 0.4-3.1-0.1-1.5-1.2-2.9-1.5-1.3-1.8-0.8-2-1.6-1-1.7-1.2-2.6-0.9-2.8-0.3-2.3 0.7-2.9 0.8-1.6 0.1-1.6-1.6-2.5-2.6-1.4-5.7-0.1-0.9-2.3-0.5-2.4-1.1-0.6-1.3 0.9-0.9 2.1-0.4 1.6-1.1 0.3-1.4-0.7-1.2-1.2-0.8-1.6-5-1.1-1.9-1.7-0.8 2-1.4 1.1-1.2 0.4-0.9 0.9 0.4 1.8 1.6 1.3 1.5 2.2 0.1 4.6-1.2 1.9-0.4 1.4 0.2 1.1 0.1 5.5-0.2 1.3-11.4-0.8-3.6 1-2.1-0.1 0-2.9 1.4-2.3 3.5-4 5.1-12 4.4-11.3 0.3-1.8 0-3.1 0.2-1.5 0.5-1.1 1.5-1.8 0.2-2.1 0.1-4 0.8-4.4 1.4-4.3 1.7-3.3-0.8-1 0.5-4.6-1.4-3.1-2.3-2.7-1.8-3.2-0.8-4.1-0.6-6.8 1.9-1.1 16-8.4 2.8 0 5.9 5.1 2.9 0.2 5-8.7 3.3-4 7.3-2.5 14 7.7 7.1-1.7 11-14.6 9.8-19.2 2.2-1.6 3.5-1.2 3-3 1.4-4.2 2-2.7 15.1 2.8 2.6 2.9 0.4 5.6 5.5 7.1 7.9-1.8 6.1-5.3 4.8-8z"
              id="dolnośląskie"
              name="Dolnośląskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/zachodnio-pomorskie"}>
            <path
              d="M282.3 214.1l-3.8-1.2-3.8 0.1-3.5 1.6-2.6 4.6-2 5.5-2.5 10.7-3 0.5-18.3-0.4-2.3 3.2 0.1 6.6 1.6 6 6.2 6.1 7.5 1.9 3.7 1.9 3.1 4 0.7 4.8-3.1 3.8-2.3 4.2-2.9 2.7-7.4 2.3-14.4 8.5-8 12.7-9.7 9.1-6.1 2.4-6.2 0.8-6.1-3.6-5.5-1.9 1.8-7.8-2.6-8.2-5-1.1-5.4 0.8-5.2 4.1-9 11.5-5 3.7-20.5-0.1-16.9 5.8-5.7 0.3 2 2.7 2.7 0.5-3.7 7.2-6.2 7.1-5.2 0.8-16.6-5.5-9.7 5.4-6.4 13.9-7.8 11-5 2.1-8.5 1.4-2.1 3.3-2.5 8.8-5.8-6.6-5.9-2.3-2.9-4-1.9-0.9-1-1-3.4-6.7-1.6-1.8-10.6-7.9-2.7-1.4-3.2-3.9-2-0.9-2.2-0.1-2.1-0.7-1.8-1.4-1.1-2.3 2.6-2.3 1.1-2 0.4-3.1-0.2-2.1-1.3-5.8-0.6-1.7 0-1 4.9-3.6 6-3.2 5.9-4.7 3.1-3.2 1.3-3 0.3-1.4 3-9.4-0.2-2.4-0.6-2.4-0.4-2.7 0.3-2.2 0.7-2 1-1.5 1-0.6 0.8-1 2.5-5.2-1.3-1.2-0.3-0.9-1.6-1.3-0.6-1.1-0.3-1.6-0.2-4.4-2.8-12.9-1-8.7-2.1-3.5-1-3.5-2.4-3.8-0.8-3.4 0-3.7 0.2-6.2-0.2-1.6-2-6.6-1.5-3.3 0.4-2.6-0.2-4.7 1-0.1 1.8-0.8 1.3-1.2 0.2-1.4-1.8-1.2 1-0.6 0-1.2-1-0.5 0.6-1.3 0.9 0.9 2.7 1.6 1.1 3.3 1.4 1.1 2.8 1.3 2 2.1 1.1 0.9 4.3 0.8 5.4 1.9 1.8 1.5 1.6 2.2 3.2 6.3 1.2 1.5 0.5-0.5 0.1-2.7 0.5-1.6 0.8-1 1.4-1.1 0-2.3-1.1-0.3-2.5-0.2-1.2-0.6-3.1-7.5 0.7-3.7 2.4-7.3 1.2 1 2-1 1.6 0-0.7-4.3 0.4-3.4 0.6-3 0.4-3.2-0.7 0-0.3 2-0.7 1.4-2.4 2.4-1 0.3-1.1-1.5 2.1-2.3-1.4-2.8-2.4-1.4-11-1.1-1.6-1.8 1.3-3.3-0.6-1.1-1 1.7-0.8 0.2-2-0.8-0.9 0.4-2.2 3 3 0.6 1.6 0.7 0.9 1.1-0.2 2.1-1.1 1.5-1.2 0.5-0.9-0.6-2.8 1.7-2.7 0.6 0 1.1 1.3 0.6-1.3 0.6-1-0.1-1.6-0.9-1.1-0.2-1.7-1.1-4.8-6.9-2.5-1.1-0.8-2.6-1.8-2.2 1.8-0.8 1.7-4.6 1.6 0.8 1.1 0.9 3.1 1.1 9.8 0.9 4-0.9 3.8-2 7.2-5.3 26.3-11.8 22.8-6 27.7-11.7 17.9-4.8 19.7-5.3 19.3-8.8 16-2 11.1-3.7-1.3 1.2-4.9 2.3 2.1 1.5 8.8-1.5-0.7-1.1 0-1.3 4.8 0-0.7-1.1 0.2-2.8-2.3-0.1-5.4 1.7 3.4-1.7 4.1-2.7 6.2-7.3-1.2 2.6-2.3 2.3 0.1 1 1.8-0.4 1.6-0.7 1.3-1.6 3.5-1.7 1.3-1.5-1.2-2.5-1.9 0-2.4 2.5 4.2-7.3 11.6-14.9 0 1.1-0.6 1.6 1 0.5 1.7-0.6 1.2-1.5 0.7-2.3-0.6-0.7-1.3 0.5-1.5 1.4 2-4.1 3.5-3.5 6.8-4.2 20.8-3.1 0.7-0.3 7.1 14.4 8.2 11.9 3.1 6.3 0.7 8.2-1 4.6-2.7 2.7-0.7 3.1 1.1 2.4 1.9 2.7 0.4 4.2-1.6 2.5-13.9 3.4 6.3 19.3 0.8 9.4 0 9.3 4.3 3.1 2.4 2.9 3.7 7.6 2.8 2.5 2.3 3.3 1.9 4.1-5.5-0.8-5 2.4 0.1 3.3 2 1 1.7 2.8 1.2 3.6-3 5.3-4.2 4.2 1.8 18.3z"
              id="zachodnio-pomorskie"
              name="Zachodnio-Pomorskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/lubuskie"}>
            <path
              d="M191.7 311l-2 9.6 0.4 10.5-9.7 12.5 3 2.8 2.2 8.2-1 2.5-1.9 1.3-9.4 3-1.6-0.2-0.7 1.5-0.1 3.7-0.4 3.5 0.4 9.2 3.5 9.7 1.2 5.7 0.8 6 0 4.9-2.7 0-2.1 1.5 4.2 7.5 2 4.8 0.2 10.1-3.2 9.5-0.5 2.4-0.2 2.5-1.2 4.8 0 5.4 0.7 5.1 2.4 3.5 2.7 2.8 5.5 3 1.8 5 2.3 4.2 3.5 3.6 3.7 0.1 1.7-0.8 1.7 1.1 0.1 3.2-0.9 3.1-0.4 5.6 1.4 4.3 4.3 2.9 4.5 1.5 7.3-4.9 6.5 7.1 3.1 12-4.8 8-6.1 5.3-7.9 1.8-5.5-7.1-0.4-5.6-2.6-2.9-15.1-2.8-2 2.7-1.4 4.2-3 3-3.5 1.2-2.2 1.6-9.8 19.2-11 14.6-7.1 1.7-14-7.7-7.3 2.5-3.3 4-5 8.7-2.9-0.2-5.9-5.1-2.8 0-16 8.4-1.9 1.1-0.3-4.2 0.8-2-1-2.2-1.9-2-1.5-1.2-2.3-1.1-4.6-1.4-2.3-1.3-2.1-1.5-6.5-2.2-2.2-2.3-0.6-2.8 0.8-3.2 2-3 1.2-3.2-0.2-4.3-1-4.1-1.3-2.7-4.8-4.1-2.3-2.6-1-4.1-0.4-4.3-1.4-1.8-1.8-1.3-1.6-2.5-0.3-3.4 1.3-2.8 5.7-5.8 1.9-2.5 1.5-2.9 0.8-3.2 0.4-9.8 0.5-1.6 2.2-3.9 0.4-1.6 0.5-2.9 0.8-1.4 1.8-2.3-6.5-4.8-1-2.4 0.6-4.2 1.1-2.9 0.4-2.4-1.5-2.2 0-1 2-2.6 0-3.3-1.5-2.9-2.8-1.2-2.8-0.7-3.4-1.7-2.3-2.5 0.6-3-2-4.7-2.4-7.2-0.6-6.5 5.2-4.5 2.4-3.9 1.6-3.8-0.4-1.7-1.9-1.8 0.8-3.8 2.8-5.8-3.1-2.6-0.6-0.6 2.5-8.8 2.1-3.3 8.5-1.4 5-2.1 7.8-11 6.4-13.9 9.7-5.4 16.6 5.5 5.2-0.8 6.2-7.1 3.7-7.2-2.7-0.5-2-2.7 5.7-0.3 16.9-5.8 20.5 0.1 5-3.7 9-11.5 5.2-4.1 5.4-0.8 5 1.1 2.6 8.2-1.8 7.8z"
              id="lubuskie"
              name="Lubuskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/wielkopolskie"}>
            <path
              d="M282.3 214.1l4.8 5.9 4.1 7.3 5.8 3.6 20.3 0.8 5.3 2.9 4.4 5.3-2.7 6.2-7.2 9.5 1.2 5 8.4 6.6 4.8 10.8-9.1 7.7 0.9 7.1 3.1 5.9-1.4 10.3-4.5 10.4 8.1 2.9 7.5 5.7 4.9 10.8-2.1 11.6-1.2 2.3-1.6 0.6-1.8-0.1-1.7 1.2-0.6 4.3 3.6 3.4 1.5 3.9 2 3.2 4 0.8 4-1.4 1.8-1.6 3.1 2.7 0.9 2.2 0.4 2.7 0.8 1 1.1 0.6 6.4 2.2 6.9 0.4 7.5 4.1 10.2 9.3 3.5 1.9 3.7 0.2 3.4 1.4 2.9 3.6 3.2 3.1 10.1 2.6 3.4-1.5 5.8-6.8 1.9 0.5 1.4 1 0.8 3 1.2 2.6 1.9 2.8 2.4 0.8 1.5-0.9 1-1.8 1.8-0.8 1.9-0.2 3.5 1.6 3 3.6 16.5 13.5 2.7 6.2 3.6-0.3 10.4-4.4 3.5-0.5 9.5 7.2 0.2 5.3 1.9 4.1 1.5 0.4 0.2 1.6-6.1 5.9-10 4.3-1 4.5-0.9 10.2-5.1 5.9-6.6 1.6-3.5-0.4-3.1 0.3-1.4 5-0.7 5.5 1.1 5.7 1.9 5.2-0.4 5.1-4.8 8.4-1.1 1.3-14.5-1.6-5.7 2.7-2.5 3.5-4.7 11.1-2.5 9.8-0.5 10.6 1 8.8 0.1 8.5-2.8 7.6-4.7 3.4-5.4-2.7-5 1.6-1.7 5-2.5 3.9-7.2 1.7-1.6 3.5 0.2 5.2 1.9 4.4 5.7 5.1 1 4.3 0.6 7.5-11.3 6.8-11.8 4.3-6.4-0.3-5.2-4.3-0.6-3.8-1.3-3.5-3.3-1.7-3.4 0.2-1.3-7.9-1.2-16.3 2.8-6.7-3.5-2.9-3.8-1.1-6.1 1.3-5.9-1.4-2.3-5.9-0.6-6.9 1.3-3.4 2.5-1.6 1.3-4 1-4.6-9.9-6.4-11-3-11.7-0.1-4.2 0.9-3.7 8.6-20.6 3.6-11.5-4.1-5.4-6-9.7-5.4-4.3-7.7-0.3-5.2-1.8-4-11.2-6.2-4.1-1-8.7 1.6-3.1-12-6.5-7.1-7.3 4.9-4.5-1.5-4.3-2.9-1.4-4.3 0.4-5.6 0.9-3.1-0.1-3.2-1.7-1.1-1.7 0.8-3.7-0.1-3.5-3.6-2.3-4.2-1.8-5-5.5-3-2.7-2.8-2.4-3.5-0.7-5.1 0-5.4 1.2-4.8 0.2-2.5 0.5-2.4 3.2-9.5-0.2-10.1-2-4.8-4.2-7.5 2.1-1.5 2.7 0 0-4.9-0.8-6-1.2-5.7-3.5-9.7-0.4-9.2 0.4-3.5 0.1-3.7 0.7-1.5 1.6 0.2 9.4-3 1.9-1.3 1-2.5-2.2-8.2-3-2.8 9.7-12.5-0.4-10.5 2-9.6 5.5 1.9 6.1 3.6 6.2-0.8 6.1-2.4 9.7-9.1 8-12.7 14.4-8.5 7.4-2.3 2.9-2.7 2.3-4.2 3.1-3.8-0.7-4.8-3.1-4-3.7-1.9-7.5-1.9-6.2-6.1-1.6-6-0.1-6.6 2.3-3.2 18.3 0.4 3-0.5 2.5-10.7 2-5.5 2.6-4.6 3.5-1.6 3.8-0.1 3.8 1.2z"
              id="wielkopolskie"
              name="Wielkopolskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/kujawsko-pomorskie"}>
            <path
              d="M499.5 219.5l8.6 16.9 2.5 7.1 3 5.8 1.5 2.2 2.4 1 1.9 0.1 7.6 2.5 10.6 6.5 11.4 3 5.6 3.9 5.1 13 1.5 15.2-4.8 3.9-5.1 2.4 0.6 3.1 0.1 3.3 0.8 4.9-0.3 3.2-0.5 3.3-1 2.8-1.9-0.3-1.8-1.3-1.9-0.8-2.2 2.1-1.8 2.8-4.2 3.5-4.8-0.6 1.5 6.7-0.5 6.1-2 2.2-0.8 3.4 1.1 3.4 1.6 3.1 2.9 7 0.1 5.4-4.3 1.2-6.7 19.5-2.6 5.4-0.6 6.3 2.1 2.1 0.4 3-7.4 12.2-0.4 2.8-0.6 2.8-2-0.1-1.9 0.3-1.2 1.9-0.9 1.8-3.8 1.2-12.3 0.2-1.7 1-0.7 1.5-1 1.2-9.5-7.2-3.5 0.5-10.4 4.4-3.6 0.3-2.7-6.2-16.5-13.5-3-3.6-3.5-1.6-1.9 0.2-1.8 0.8-1 1.8-1.5 0.9-2.4-0.8-1.9-2.8-1.2-2.6-0.8-3-1.4-1-1.9-0.5-5.8 6.8-3.4 1.5-10.1-2.6-3.2-3.1-2.9-3.6-3.4-1.4-3.7-0.2-3.5-1.9-10.2-9.3-7.5-4.1-6.9-0.4-6.4-2.2-1.1-0.6-0.8-1-0.4-2.7-0.9-2.2-3.1-2.7-1.8 1.6-4 1.4-4-0.8-2-3.2-1.5-3.9-3.6-3.4 0.6-4.3 1.7-1.2 1.8 0.1 1.6-0.6 1.2-2.3 2.1-11.6-4.9-10.8-7.5-5.7-8.1-2.9 4.5-10.4 1.4-10.3-3.1-5.9-0.9-7.1 9.1-7.7-4.8-10.8-8.4-6.6-1.2-5 7.2-9.5 2.7-6.2 2.8-1.7 3-10.5 2.5-5.3 2.7-3.9 3.7-0.4 13.8 3.7 6.2-2.5 0.1-3.6 0.4-2.4 0.5-2.2 3.2-3 6.9-2.5 4-7.5 2.7-2.1 12.7 2.5 16.9-2.6 3.5 0.4 2.9 3.7 3.3 3.1 17.9 3 8.5 5.1 3.7-2.4 5.7-2.1 8.1 1.1 2 1.2 1.3 1.6 1.7 1 6.5 6.8 3.1 2 5.4 2.2 11.4-0.7 5.4-2.4z"
              id="kujawsko-pomorskie"
              name="Kujawsko-Pomorskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/śląskie"}>
            <path
              d="M561.5 666.9l8.5 1.6 1.2 0.7 0.4 1.8 0 1.9-0.5 1.3-6.8 1.1-3.7 7.1 2.7 3.3 7.5 2.1 3.5 2.7 2.7 6.2 4.8 5.8-4 0.6-6.9 5.8-2 4.3 3.5 1.8 6.8 1 2.8 1.1 0.6 3.4 0.3 2.8-12.6 8-3.2 0.5-5.5-0.5-5.5 0.9-8.8 6.8-2.6 0.6-2.5 0-5.5-3.2-2.7 4-2.8 5.6-4.3 6.2-6.7-0.9-3.1 2.4 5.3 5.3 4.6 6.4-23.6 26.6-2.2 3.3-2.2 4.5-1.1 5.2 2 2.6 2.6 0.3 2.2 2.7 0.2 5.2 3 5.3 5 2 2.1 3.7 1.5 4.8 3.2 3 3.7 1.7 6.8 1.2-0.4 4-1.7 3.5-0.8 3.2 1.2 2.8 2.4 1.6 0.5 1.7-1.1 0.1-0.4 0.7-8.6 9.6-0.8 0.6-2.4 0.8-3.1-0.1-1.9 0.5-1.6 0.8-1.5 1.3-1.3 2.2-1.6 5 0.7 1.4-0.7 1.3-1.5 0.1-0.7 3-0.3 1.9-0.7 1.2-3.1 1.3-2.5 0.5-1-0.1-3-1.9-0.9-0.4-2.1 0.6-3.9 2.2-2.5 0.2-2-0.4-0.5-1.7 0.4-5-0.3-2.3-0.4-2.1-0.1-2.2 0.8-2.5-2.9-1.8-9.8-0.9 0.4-2.6-0.3-3.2-1.4-6.5-1.6-4.1-0.5-1.5-0.7-5.3-0.4-1.2-1.5-1.1-1.5 0.3-1.6 0.7-1.4 0.1-1.3-0.8-1.9-2.3-1.3-1-1.5-0.5-3-0.2-1.4-1-0.6-1.1-1-4.5-2.3-4.9-1.8-4.7 0-4.1 2.7-3.2-2.6-1.4-0.4-1.9 0.2-2.4-0.6-2.8-1.5-0.9-3.9 2.5-2.3 0-7.4-4.1-3.9-1.3-3.6 0.5 0.3 0.5-2.8 2.4-1.5 0.3-2-1.6-0.5-1.1-1.1-3.2-1.2-0.9-2.3-0.5-1.2-0.5-3.2-2.7-1.5-0.9-6.3-1.2-1.3-1.5 0.6-2.8-5.8-3.9-1.4-0.3 0.1-2.6 6-11.6 12.5-2.7 6-4.5 9.6-4.5 1.1-4.6 0.1-7.9-1.7-20.1 0.9-3.2 2.1-0.4 2.2-1 0.2-2.9-1.1-2.7 1.3-3.5 3-0.7 14.4 0.1-1.1-5.7-3.2-3.4-3.2-2.5-2.7-3.6-1.9-5.9 2.4-6.5 1.8-9.8 2.6-5.6 7.8-5.1 0.7-5.6-1.3-2.9-0.6-3.6 0.7-2.4 1.3-1.5 3.4-12.2 5-2.4 14.1-0.5 3.2-1.5 3.2-2.2 3.5 0.7 3 3.1 13.1 7 6.4 1.4 8-0.1 3.4-3 6.7 1.3 6 5.5 9.3 14.9 3.4 1 9.9-0.5 10.9 5.5z"
              id="śląskie"
              name="Śląskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/łódzkie"}>
            <path
              d="M516.2 421.6l9.6 6.6 10.5 2.2 5.1 2.4 9.2 7.5 20.7-4.3 3.2-3.3 3.7-0.3 2.7 3.5 2.4 4.1 3.1 1.7 3.5 1 2.8 1.9 1.2 4.2 0.4 5.7 2 4.5 1.4 0.8 1.6-0.4 6.8 2.8 3.9 2.6 1.4 1.7-1.1 8.1-3.3 2 0.8 3.4 2.7 3.1 2.4 3.6-0.3 3 0.9 2.6 3.6 1.2 10.6-1.2 6.6 3 7.2 5.6 5.9 7.9 0.6 2.6-0.9 1.9-1 1.5-0.5 2 0.9 4.6 5.4 5.6 1.5 4.1-0.3 3.8-1.2 2.7-7.3-1-5.9-3.3-7.8 0-2.6 9.1 3 7.1 0.9 4.9 0.4 5.1 0.8 2.6 3.6 1.8 1.3 1.4 0 5.2-1.6 4.4-6.4 6-1.3 4.3 0.3 4.7-2.8 2.1-3.7 9.1-3.3 1.5-3.3 0.5-3.2 1.6-6.9 6.6-3.2 0.9-11-1.6-3.1 1.2-2.4 3.2-2.5 9.6 4.5 6.9 3.1 2.5 1 5.3-0.8 5.1-2.3 2.7-13.1-9.6-3.5 0.6-1.3 5.1-0.1 5.1 0.4 4.9-1.7 4.8-3.4 2.3-2.9 2.7-2.3 3.9-10.9-5.5-9.9 0.5-3.4-1-9.3-14.9-6-5.5-6.7-1.3-3.4 3-8 0.1-6.4-1.4-13.1-7-3-3.1-3.5-0.7-3.2 2.2-3.2 1.5-14.1 0.5-5 2.4-7.5-6-2.3-4.6-2.7-3.2-1.2 0.6-0.9 1.7-1.3 1.1-7 0.2-22.3-5.7-2.9-2.4-2.3-4-0.6-7.5-1-4.3-5.7-5.1-1.9-4.4-0.2-5.2 1.6-3.5 7.2-1.7 2.5-3.9 1.7-5 5-1.6 5.4 2.7 4.7-3.4 2.8-7.6-0.1-8.5-1-8.8 0.5-10.6 2.5-9.8 4.7-11.1 2.5-3.5 5.7-2.7 14.5 1.6 1.1-1.3 4.8-8.4 0.4-5.1-1.9-5.2-1.1-5.7 0.7-5.5 1.4-5 3.1-0.3 3.5 0.4 6.6-1.6 5.1-5.9 0.9-10.2 1-4.5 10-4.3 6.1-5.9-0.2-1.6-1.5-0.4-1.9-4.1-0.2-5.3 1-1.2 0.7-1.5 1.7-1 12.3-0.2 3.8-1.2 0.9-1.8 1.2-1.9 1.9-0.3 2 0.1z"
              id="łódzkie"
              name="Łódzkie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/mazowieckie"}>
            <path
              d="M893.8 428.4l-3.2 6-9.5 14-2.8 6.7-3.3 4.2-3.9 1.5-11.7-6.1-4-0.9-1.8 1.2-1.7 1.8-0.6 2-0.5 2.4-5.5 4.6-11-1.1-3.8 0.5-9.5 7.1-3.5 1.1-5.1-0.9-13.6 2.7-14.4-0.1-7.6 2.2-7.1 5.3 0.6 4.1 1.6 4.5 2 4.2 0.4 4.3 2.4 6 3.5 5.3-5.5 3.4-3.8 5.4 5 7.7-0.6 3.7-2.5 2.4-7.1 2.5-7.2-1.2-3.6-1.4-3.6 0.9-1 4.1 0.1 1.7 1.3 2.1 1.4 1.8 2.8 1.3 5.1 1 1.8-0.1 2.4-1.1 1 0.1 1.5 1 0.4 1.4-0.1 1.9 0.2 2.2 1.8 2.8 0.3 2-1.5 1.8 0 1.1 3.1 0.3-0.1 6.5-2.4 3.4-2.4 1.9-0.2 3.9 4 4.8-0.6 4.5-1.2 4.9 0.2 3.3-1.1 0.2-0.9 0.8-1.3 2.5-1.8 9.9-1.2 3.7-0.1 1.8 0.2 1.3 0.9 2.8 0.8 5.1 2.4 6.1-31.8 6.7-16.5-5.2-7.7-0.7-6.8-4.4-0.6-2.4-0.4-2.7-3-3.3-0.9-5.4-3-1-3.1 3-2.9 4-3.3 1.9-13.9 2.2-12-2.5-2.6-1.9-2.1-3.4-2.3-2.6-16.4-10.1-3-7.5-5.5-2-0.3-4.7 1.3-4.3 6.4-6 1.6-4.4 0-5.2-1.3-1.4-3.6-1.8-0.8-2.6-0.4-5.1-0.9-4.9-3-7.1 2.6-9.1 7.8 0 5.9 3.3 7.3 1 1.2-2.7 0.3-3.8-1.5-4.1-5.4-5.6-0.9-4.6 0.5-2 1-1.5 0.9-1.9-0.6-2.6-5.9-7.9-7.2-5.6-6.6-3-10.6 1.2-3.6-1.2-0.9-2.6 0.3-3-2.4-3.6-2.7-3.1-0.8-3.4 3.3-2 1.1-8.1-1.4-1.7-3.9-2.6-6.8-2.8-1.6 0.4-1.4-0.8-2-4.5-0.4-5.7-1.2-4.2-2.8-1.9-3.5-1-3.1-1.7-2.4-4.1-2.7-3.5-3.7 0.3-3.2 3.3-20.7 4.3-9.2-7.5-5.1-2.4-10.5-2.2-9.6-6.6 0.6-2.8 0.4-2.8 7.4-12.2-0.4-3-2.1-2.1 0.6-6.3 2.6-5.4 6.7-19.5 4.3-1.2-0.1-5.4-2.9-7-1.6-3.1-1.1-3.4 0.8-3.4 2-2.2 0.5-6.1-1.5-6.7 4.8 0.6 4.2-3.5 1.8-2.8 2.2-2.1 1.9 0.8 1.8 1.3 1.9 0.3 1-2.8 0.5-3.3 0.3-3.2-0.8-4.9-0.1-3.3-0.6-3.1 5.1-2.4 4.8-3.9 3.4-0.9 2.9-2.4 2.6-5.1 3.9-1.2 1.7 0.3 1.6 1.1 0.6 1.5 0.9 1 31.5 4.9 7.5-1.4 3-1.5 2.6-3 1.6-5.6 3.1-2.5 3.8 0.4 3.7-1 13.9-8.1 3.3-4 3.6-2.9 7.2 0.1 6.3-1.3 7.3-4.2 9.5 0 9-2.9 7.5-9 8.9 0.8 4.5-0.7 4.1-2.9 2.8-5.6 2.5-1.3 12-1 1.3 5.8 2.3 5.4 1.6 6.6 2.5 19.2 5.6 14 3.6 7.1 5.3 2.8 5.5 0.8 4.6 3.6-1.7 3 0.5 4.2 2.5 4.5 3.8 2.1 2.4 2.6 1.5 4.1 1.4 6 2.6 4.9 7.1 3.7 7.6-1.2 4.9-5.4 4.8 3.7-1.5 9.1 2.5 3.5 3.1 2.2 5.6-2.8 5.8-1.6 1.5 7.7 0.6 8.6 1.2 5.8 0.4 6.1-0.3 3.6 5.5 5.9 2.1 2.9 2.2 1.9 0.7 1 0.2 1.6-0.7 2.6-0.1 1.5 0.3 2.1 0.5 1.3 0.8 0.8 1.4 0.2 0.3 0.8-0.6 5.4 0.7 1.8 1.7 2.4 2 1.5 1.7-0.7 1.2 1.9 2.4 0.6 5.3-0.3 15.5 3.2 7.7-1.1 3 1 2.2 2.2 1 3.7 2.1-1.1 1.8 1.1 2.8 3.4-0.5 0.8-0.8 2.5 1.7 1 1.6-0.5 1.5-1z"
              id="mazowieckie"
              name="Mazowieckie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/świętokrzyskie"}>
            <path
              d="M767.1 627.2l0.4 2.2-1.2 1.6-1.5 0.5 0 1.1 1.8 1.4 0.3 3.1-0.7 6.8-0.7 1.3 0.1 1.9 1 0.7 0.4 2 2.5 9.7 0.5 3.4 0.3 2.1 0.1 5.8-0.8 6.2-0.7 2.5-1.2 2.8-1.5 2.4-1.8 0.9-2.6 0.4-1.7 1.3-2.8 4.8-4.8 5.6-0.7 2.4-0.5 3.1-1.2 2.4-3.1 3.7-1.8 1.6-6.4 1.6-9.5 4.3 1.3 3.2-1.9 2-2.5 1.5-2.5 0.5-1.9-0.8-6.1 5.3-0.4 0.2-1.8 0.2 0.1 1.9-1.2 0.8-0.6 0-1-0.8-0.5 2.2-1.2 1.1-1.1 0.6-0.6 0.8-0.1 1.3-1.6 0.9-1.7 2.4-1.8 0.7-1.9-2.1-1.4-0.5-1 0.2-4.1 2-3 2.8-1.5 0.4-7.4 0.2-1 0.4-1.8 2-1 0.6-2.7 0.2-1.3 0.9-1.6-1-1.3 0.9-1.4 1.4-1.6 0.8-3.8-3.7-0.7 1-0.6 2.7-2.1 2.1-1.2 0.2-0.8 1.1-0.4 2.5-1.4 1.3-3.2 1.6-1.2 1.9-0.4 1.7-3 3.1-13.1-0.3-7.3-4.4-1.9-4-4.5-6.4-1.7-3.6-1.7-7.2-4.5-9-7.7-5.2-8.4-2.6-3.3-3.5-3.9-2.1-9.4-0.1-2.8-1.1-6.8-1-3.5-1.8 2-4.3 6.9-5.8 4-0.6-4.8-5.8-2.7-6.2-3.5-2.7-7.5-2.1-2.7-3.3 3.7-7.1 6.8-1.1 0.5-1.3 0-1.9-0.4-1.8-1.2-0.7-8.5-1.6 2.3-3.9 2.9-2.7 3.4-2.3 1.7-4.8-0.4-4.9 0.1-5.1 1.3-5.1 3.5-0.6 13.1 9.6 2.3-2.7 0.8-5.1-1-5.3-3.1-2.5-4.5-6.9 2.5-9.6 2.4-3.2 3.1-1.2 11 1.6 3.2-0.9 6.9-6.6 3.2-1.6 3.3-0.5 3.3-1.5 3.7-9.1 2.8-2.1 5.5 2 3 7.5 16.4 10.1 2.3 2.6 2.1 3.4 2.6 1.9 12 2.5 13.9-2.2 3.3-1.9 2.9-4 3.1-3 3 1 0.9 5.4 3 3.3 0.4 2.7 0.6 2.4 6.8 4.4 7.7 0.7 16.5 5.2 31.8-6.7z"
              id="świętokrzyskie"
              name="Świętokrzyskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/podlaskie"}>
            <path
              d="M902.7 429.6l-0.8 0.5-1.8 0-3.1-1.9-1.9-0.4-1.3 0.6-1.5 1-1.6 0.5-1.7-1 0.8-2.5 0.5-0.8-2.8-3.4-1.8-1.1-2.1 1.1-1-3.7-2.2-2.2-3-1-7.7 1.1-15.5-3.2-5.3 0.3-2.4-0.6-1.2-1.9-1.7 0.7-2-1.5-1.7-2.4-0.7-1.8 0.6-5.4-0.3-0.8-1.4-0.2-0.8-0.8-0.5-1.3-0.3-2.1 0.1-1.5 0.7-2.6-0.2-1.6-0.7-1-2.2-1.9-2.1-2.9-5.5-5.9 0.3-3.6-0.4-6.1-1.2-5.8-0.6-8.6-1.5-7.7-5.8 1.6-5.6 2.8-3.1-2.2-2.5-3.5 1.5-9.1-4.8-3.7-4.9 5.4-7.6 1.2-7.1-3.7-2.6-4.9-1.4-6-1.5-4.1-2.4-2.6-3.8-2.1-2.5-4.5-0.5-4.2 1.7-3-4.6-3.6-5.5-0.8-5.3-2.8-3.6-7.1-5.6-14-2.5-19.2-1.6-6.6-2.3-5.4-1.3-5.8 7.3-3.2 14.2 0.9 6.3-2.2 2.9-2.4 3.1-1.3 7.5-1.1 17.2-11.9 9.6-10.9 27.8-17.3 5.7-6.1 3.5-9.8 4-7.8 0.4-7.9-10.6-14.8-5-5-1.1-4.7-0.5-5.1-10.1-13.5 9.4-13.3 22.2-3.1 6.6-4.5 5.7-6 2.5-8.3-0.3-1.3 2.7-1.4 2.1 0.3 5.9 3.1 1.1 0.1 2.3-0.5 1 0.3 1.1 1.1 1 2.6 0.6 1.1 1.1 0.8 3.4 0.4 0.7 0.9-1 3.6 0 1.8 1.8 2.5 2.3 0 2.4-1 2-0.4 1.8 0.8 6.2 5.2 3.8 2.4 8 3 3.8 3.3 1 1.5 1.8 3.5 0.9 1.3 1.1 0.7 2.1 0.6 0.9 0.5 1.7 2.5 1.3 3.4 1.1 3.8 0.8 3.6 1.5 7.9 0 3.9-1.5 2.6-1.2 1-1 1.4-0.1 1.8 0.4 1.5 0.8 1.3 1.1 0.9 0.9 1.6-0.5 1.9 0.1 4.9 1.1 4.2 1.3 3.9 1 4.2 0.9 9 1.1 3.5 2.4 3.5 0.2 10.4 2.4 11.7 8.4 26.1 4.7 9.8 2 5.3 4 15.7 1.8 4.8 1.8 2.4 1 2.3 0.7 2.5 1.2 2.5 1.8 2 1.7 1.3 1 2-0.2 4.1-0.9 2.4-1.2 2-0.9 2.2-0.2 3.3 0.9 2.8 3 3.9 1.1 2.4 0.2 1.3-0.2 3.1 0.8 4.6-0.2 2.3-1.1 2.2-0.3 1.3 0.1 1.8 0.7 1.8 0.3 1.3 1 24.9-1.3 7.1-4 4.9-13.2 9-16.7 4.8-8.8 5.2-8.8 7.3-12.1 18.7-4 4.9-1.8 2.9-4.7 9.5 1.1 0.7z"
              id="podlaskie"
              name="Podlaskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/lubelskie"}>
            <path
              d="M902.7 429.6l0.7 0.6 1.1 1.6 0.3 2.1-0.8 2.9 2.3 1.5 7.1 1.9 1.6-0.6 1.3 1.3 6.2 2.4 2.1 0.2 0 1-0.8 1.5 1.7-0.3 1.3 0.6 0.9 0.9 0.9 0.2 1.4-1.7 0.4 0.7 1.6 1.6 1.7-1.6 0.4 1.2-0.3 2-0.4 0.5 2.8 5.6 1.9 0.6 4.7-0.1 1.9 1.1 1.8 3.6 2.1 1.3 0.4 1.8 0.1 1.9 0.9 2 1.4 6.1 1.1 2.8-1.6 1.2-1.3 2-1.8 4.5-0.7 3-0.1 5.2-0.6 1.9 0.7 1.1-1.2 0.6-0.4 3.5-1.1 1.4 1.5 2.9 1.9 2.5-1.2 3.7-1.9 1.9-2.1 1.3-1.7 2-0.8 2.9-0.5 3.7 1 1.9 0.2 1-1.3 0.9 0.3 1.1 1.1 1.8-1.2 1.6-1.5 0.4 0 1.2 1.1 1.3 0.1 1.5-0.5 4.4 0.4 2.3 0.8 2.2 2.2 3.8-1.4 0 1.3 2.5 1.6 0.6 1.3 0.8 0.6 3.1 0.7 2.3 1.5 1.1 1.8 0.6 1.4 1-1.5 3.2 0.1 1 4.1 6 0.8 1.9-1.1 0.6-0.7 1.1-0.2 1.6 0.6 2.2-1.8 0.7-1.7 1.9-1.4 2.3-0.5 2.2 0.6 3.3 1.6 0.9 1.9 0 1.7 1.1 5.5 12.1 2.3 2.8 5 3.2 4.8 4.8 1.1 2-1.7 0.8-0.4 1.5 1.5 3.1 2.6 4.1 0.9 2.1 1.2 6.6-0.5 2.3 0.8 0.6 2.5 1.4 1.1 1.7 0.3 2.7 0.6 2.1 1.5 2.4 6.7 6.3 8.3 4.6 1.3 2-1.2 2.7-3.1 0.6-3.3 0.1-2 0.9-2.6-1.5-2.8 0.3-2.3 1.8-1.2 2.7 0.2 3 1.5 2 2.3 1.1 2.8 0.4 0 0.9-1.3 2.8 1.4 2.4 2.7 1.7 2.7 0.7-0.6 3.5 0.8 3.4 2.5 6.1-2.3 4 1 7.5 1.1 2.9-1.2 1.8-1.9 2-6.4 3.3-0.3 1.9 0.2 3-0.2 2.1-0.4 1.7-2.2 5.1-5.3 2.2-18 0.2-3.4 1.1-1.8 0.9-1.3 1.3-1.1 2.3-1.3 4.2-10-5.9-3.2-4.9-6.3-4-7.3-0.8-5.7 0.5-2.6 1.2-8.2 9.3-6.5 5.2-7.5 1.6-22.4-0.7-13.6-3.9-1-2.3 3.4-0.8 1.5-0.9-2.6-1.9-13.9 2.8-3.5-1.6-2.6-4-0.7-3.9 1.6-3.3 2.5-3.3 3.1-1 3.1 0.4 2.8-1.6-1.2-3.8-2.3-4.4-0.3-2.2 0.1-2.1-0.9-1.5-15.7-8.4-23.2-5.9-1.9-3.3 4.6-8.5 1.4-4-3.2-2.8-3.5-2.2-3.9-1.5-3.9 0.2-6.6 4.6-7.4-0.4-13.2-8.9-0.5-3.4-2.5-9.7-0.4-2-1-0.7-0.1-1.9 0.7-1.3 0.7-6.8-0.3-3.1-1.8-1.4 0-1.1 1.5-0.5 1.2-1.6-0.4-2.2-2.4-6.1-0.8-5.1-0.9-2.8-0.2-1.3 0.1-1.8 1.2-3.7 1.8-9.9 1.3-2.5 0.9-0.8 1.1-0.2-0.2-3.3 1.2-4.9 0.6-4.5-4-4.8 0.2-3.9 2.4-1.9 2.4-3.4 0.1-6.5-3.1-0.3 0-1.1 1.5-1.8-0.3-2-1.8-2.8-0.2-2.2 0.1-1.9-0.4-1.4-1.5-1-1-0.1-2.4 1.1-1.8 0.1-5.1-1-2.8-1.3-1.4-1.8-1.3-2.1-0.1-1.7 1-4.1 3.6-0.9 3.6 1.4 7.2 1.2 7.1-2.5 2.5-2.4 0.6-3.7-5-7.7 3.8-5.4 5.5-3.4-3.5-5.3-2.4-6-0.4-4.3-2-4.2-1.6-4.5-0.6-4.1 7.1-5.3 7.6-2.2 14.4 0.1 13.6-2.7 5.1 0.9 3.5-1.1 9.5-7.1 3.8-0.5 11 1.1 5.5-4.6 0.5-2.4 0.6-2 1.7-1.8 1.8-1.2 4 0.9 11.7 6.1 3.9-1.5 3.3-4.2 2.8-6.7 9.5-14 3.2-6 1.3-0.6 1.9 0.4 3.1 1.9 1.8 0 0.8-0.5z"
              id="lubelskie"
              name="Lubelskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/podkarpackie"}>
            <path
              d="M950.7 741.8l-1.4 2.2-7.9 8.6-2.9 2.3-9.9 7.7-22.8 24.8-3 4.6-3.6 2.9-4 4.4-10.8 15.9-4.1 4.3-0.6 1.2-0.8 3.2-0.4 1.1-0.9 0.8-1.8 0.7-0.8 0.6-1 1.2-6.1 11.1-1.7 1.7-1.1 0.5-2.1 0.4-1.2 1-0.7 1.3-1.7 4.9-7.6 10.2-2.4 5.9 1.9 5.5 0.6 2.3 0.7 6.5 0.6 2.6 1.3 2 2.2 2.3 0.5 1.2 0.5 2.4 1.3 14-0.4 2.3-1.6 4.6-1.5 5.4-1.5 3.3-0.6 1.9 1.1 0.5 1.3-1.7 1.1 1.3 3.2 2.2 2.9 3.9 1.9 1.4 4.4 2.5 1.2 1.5 0 1.3-0.9 3-0.1 2 0.4 1.5 2 3.6-1.2 2.4-2-0.9-2.2-2-2.9-1.3-1.8-2.5-1-1-1.1-0.1-2.3 0.7-3.6-0.3-2.1 0.2-2.1-0.3-2.5-1.6-3.7-4.2-2-0.6-2.1 2-3.5-1.7-7.8-0.3-3.6-1.2-5.1-5-2.1-0.9-5.5 0.2-4.7-1.4-0.7-0.6-0.2-1 0.2-2.1-1.1-1.2-0.8-0.1-2.4 0.3-2.1-0.6-3.3-2.1-7-1.4-2.8-2-0.7-4.9-1.3-5.4-2.8-4.6-3.6-3.4-5.4-2.7-3.6-3.4-1.8-1-2.1 0.3-1.7 1.6-1.4 1.7-1 0.7-1.6-1.2-3.3-5.2-1.7-1.7-1-0.3-1.5 0.3-1.8-0.8-1.8-1.8-1-0.7-1.9-0.5-7.1 0.8-1.5 0.6-3.8-10.6-1.8-11.2 0.6-5.4-0.4-5.4-3.4-10.7-6-6.5-10.7-4.6-3-2.7 1.7-3.9 9.9-7.6-1.3-4.5-3.7-2-2.9-0.2-2.1-2.5-0.8-2.2-0.9-1.7 0.1-6 0.8-6.9-2.7-23.4 0.7-8.8 3.7-6.4 3-7.4 1.1-13.1 0.4-0.2 6.1-5.3 1.9 0.8 2.5-0.5 2.5-1.5 1.9-2-1.3-3.2 9.5-4.3 6.4-1.6 1.8-1.6 3.1-3.7 1.2-2.4 0.5-3.1 0.7-2.4 4.8-5.6 2.8-4.8 1.7-1.3 2.6-0.4 1.8-0.9 1.5-2.4 1.2-2.8 0.7-2.5 0.8-6.2-0.1-5.8-0.3-2.1 13.2 8.9 7.4 0.4 6.6-4.6 3.9-0.2 3.9 1.5 3.5 2.2 3.2 2.8-1.4 4-4.6 8.5 1.9 3.3 23.2 5.9 15.7 8.4 0.9 1.5-0.1 2.1 0.3 2.2 2.3 4.4 1.2 3.8-2.8 1.6-3.1-0.4-3.1 1-2.5 3.3-1.6 3.3 0.7 3.9 2.6 4 3.5 1.6 13.9-2.8 2.6 1.9-1.5 0.9-3.4 0.8 1 2.3 13.6 3.9 22.4 0.7 7.5-1.6 6.5-5.2 8.2-9.3 2.6-1.2 5.7-0.5 7.3 0.8 6.3 4 3.2 4.9 10 5.9z"
              id="podkarpackie"
              name="Podkarpackie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/opolskie"}>
            <path
              d="M402 614.4l2.3 4 2.9 2.4 22.3 5.7 7-0.2 1.3-1.1 0.9-1.7 1.2-0.6 2.7 3.2 2.3 4.6 7.5 6-3.4 12.2-1.3 1.5-0.7 2.4 0.6 3.6 1.3 2.9-0.7 5.6-7.8 5.1-2.6 5.6-1.8 9.8-2.4 6.5 1.9 5.9 2.7 3.6 3.2 2.5 3.2 3.4 1.1 5.7-14.4-0.1-3 0.7-1.3 3.5 1.1 2.7-0.2 2.9-2.2 1-2.1 0.4-0.9 3.2 1.7 20.1-0.1 7.9-1.1 4.6-9.6 4.5-6 4.5-12.5 2.7-6 11.6-0.1 2.6-1.7-0.4 0.5 3.5 0.5 0.2 1.6-0.2 0.7 1.1 0.2 1.5-0.5 0.7-3.2 1-4 0.1-1.8 0.5-3 2.6-3.6 1.1-3.6-0.8-6.5-6.4-1.1-1.6-0.8-1.8-1.2-3.7-2-2.2-0.4-0.9 1.3-2.2-1.4-0.3-2.7-1.3-1.3-0.4-2.9 0.9-1.6-0.7-4.8-6.1-0.2-1.2 0.7-1.5 1.1-0.6 4.8-0.2 2.7-1 4.2-2.6 2-1.7 0.9-2.4-1.5-2.8-1.1-1.1-0.2-1.6 0.2-1.4 1.3-3.4 0-0.9-2-2.8-0.6-0.5-1.7-0.7-0.6 0.4-0.8 2.4-3 4.1-1.7 1.4-2.3 0.6-8.9-1.6-4.8 0.4-2.9 3.6-1 0.5-1.1-0.5-0.9-2.9-2.2-1.8-2.2 0.2-1.1 2.9-1.3-1-0.7-1.6-0.2-2 0.2-2.1-1.5-1.9 1.8-0.8-2.1-0.8-4.6 0.1-2.4-0.7-3.5-2.2-1-1.1-0.6-1.3-0.9-3.7-1-0.8-3 0.6-1.4 0-1.3-0.7-2.3-2-1.1-0.6-10.2-2.9-2.3 0.3-1.5-0.9 0.4-1.9 7.2-17.9 5.2-4 6.1-1 3.5-6.2 2.3-8.8 7.2-13.7 8.3-12.3 3.6-8.3 4.7-6.2 3.2-2.1 1.6-4.8 0.6-4.1 1-3.9 5.8-13.3 2.6-2.8 3.3-1.1 3.4 0.2 3.5-0.8 3.3-2.1 3.4-0.2 3.3 1.7 1.3 3.5 0.6 3.8 5.2 4.3 6.4 0.3 11.8-4.3 11.3-6.8z"
              id="opolskie"
              name="Opolskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <Link to={"/małopolskie"}>
            <path
              d="M715.3 728.7l-1.1 13.1-3 7.4-3.7 6.4-0.7 8.8 2.7 23.4-0.8 6.9-0.1 6 0.9 1.7 0.8 2.2 2.1 2.5 2.9 0.2 3.7 2 1.3 4.5-9.9 7.6-1.7 3.9 3 2.7 10.7 4.6 6 6.5 3.4 10.7 0.4 5.4-0.6 5.4 1.8 11.2 3.8 10.6-1.9 0.8-1.4-0.4-3.7 0.8-1.7 0-9.7-2.8-5.6-3-1.3-0.3-1.8 1.3-3.1 4.6-1.8 1.6-2.1 0.3-1.5-1-1.4-1.6-1.8-1.2-1.6-0.2-4 0.8-1.6 0.8-2 2.2 1.2 1.4 2.3 1.4 1.3 2.3-0.9 1.4-1.8 0.4-2.1 0-1.6 0.4-2 2-3.3 4.7-2.1 1.9-2.4 0.9-1.8-0.4-1.6-1.2-1.6-1.7-1.9-1.4-1.6-0.2-1.7 0.1-2.2-0.3-1.6-1.2-8.8-10.6-1.6-0.3-3.7 0.6-3.1-0.2-1 0.6-1.6 1.9-1.1 1.1-2.4 0.8-2.2-0.5-8.4-4.3-1.6 0.4 0.1 2.6-5.2 0.2-4.1-1.6-1.2 0.1-1 0.7-0.3 1-0.8 3.6-0.7 2.1-0.5 0.7-7.7 0.7-1.5 0.8-2.1 2.6-1 0.9-2.2-0.2-0.8 0.5-1.9 4.3-1.3 3.5-1.2 1.5-0.6 5.3-1 3.8-2 1.5-3.3-1.6-5.1-4.8-2.8-1.5-3.2 0.4-1.8 1.3-3.3 3.5-2.2 0.8-4.6-0.3-2.5-1-1.3-1.7 0.4-2.1 3.8-6.1 1.6-0.9 0.1-1.5-1-1.3-1.4-1-0.3-1.2 0.9-1.7-0.5-7.4-0.6-2.6-0.9-2.9-0.9-0.7-3.3 1.4-2 0.2-2.2-0.2-5.7-2 0.2-1.9-0.1-2.3 0.6-1.8-4-0.1-2-0.5-1.7-1.4-0.6-1.1-1.6-4.8-1.8-7.8-1.2-3.1-2.3-1.5-0.8-0.8-1.6-3-0.9-0.4-0.5-1.7-2.4-1.6-1.2-2.8 0.8-3.2 1.7-3.5 0.4-4-6.8-1.2-3.7-1.7-3.2-3-1.5-4.8-2.1-3.7-5-2-3-5.3-0.2-5.2-2.2-2.7-2.6-0.3-2-2.6 1.1-5.2 2.2-4.5 2.2-3.3 23.6-26.6-4.6-6.4-5.3-5.3 3.1-2.4 6.7 0.9 4.3-6.2 2.8-5.6 2.7-4 5.5 3.2 2.5 0 2.6-0.6 8.8-6.8 5.5-0.9 5.5 0.5 3.2-0.5 12.6-8-0.3-2.8-0.6-3.4 9.4 0.1 3.9 2.1 3.3 3.5 8.4 2.6 7.7 5.2 4.5 9 1.7 7.2 1.7 3.6 4.5 6.4 1.9 4 7.3 4.4 13.1 0.3 3-3.1 0.4-1.7 1.2-1.9 3.2-1.6 1.4-1.3 0.4-2.5 0.8-1.1 1.2-0.2 2.1-2.1 0.6-2.7 0.7-1 3.8 3.7 1.6-0.8 1.4-1.4 1.3-0.9 1.6 1 1.3-0.9 2.7-0.2 1-0.6 1.8-2 1-0.4 7.4-0.2 1.5-0.4 3-2.8 4.1-2 1-0.2 1.4 0.5 1.9 2.1 1.8-0.7 1.7-2.4 1.6-0.9 0.1-1.3 0.6-0.8 1.1-0.6 1.2-1.1 0.5-2.2 1 0.8 0.6 0 1.2-0.8-0.1-1.9 1.8-0.2z"
              id="małopolskie"
              name="Małopolskie"
              onMouseOver={(e) => setName(e.target.getAttribute("name"))}
              onMouseLeave={() => setName(initialName)}
              //onClick={handleClick}
            ></path>
          </Link>
          <circle cx="117.2" cy="233.1" id="0"></circle>
          <circle cx="611.2" cy="696.4" id="1"></circle>
          <circle cx="678" cy="712.1" id="2"></circle>
        </svg>
      </div>
      {children}
    </MapCss>
  );
}

export const MapCss = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  align-items: center;
  .mapdiv {
    display: ${(props) => (props.disabled ? "none" : "flex")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: calc(100vh - 180px);
    width: 100%;
    padding-top: 30px;
  }
  .lowiskadiv {
    max-width: 1430px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 160px);
    scroll-margin: 60px;
  }
  .errordiv {
    color: red;
  }
  .hidden {
    visibility: hidden;
  }
  h1 {
    margin-top: 40px;
    font-size: 40px;
    margin-bottom: 0px;
  }
  svg {
    // height: 625px;
    // width: 625px;
    path {
      fill: var(--yellow);
      stroke: #fff;
      stroke-width: 2px;
      transition: fill 0.3s;
    }
    path:hover {
      fill: #003600;
    }
  }

  // .lowiskadiv {
  //   max-width: 1430px;
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: center;
  //   align-items: center;
  //   width: 100%;
  //   height: calc(100vh - 160px);
  //   scroll-margin: 60px;
  // }
  // .errordiv {
  //   color: red;
  // }
  // .hidden {
  //   //visibility: hidden;
  // }
  // h1 {
  //   margin-top: 40px;
  //   font-size: 40px;
  //   margin-bottom: 0px;
  // }
  // svg {
  //   height: 625px;
  //   width: 625px;
  //   path {
  //     fill: var(--yellow);
  //     stroke: #fff;
  //     stroke-width: 2px;
  //     transition: fill 0.3s;
  //   }
  //   path:hover {
  //     fill: #003600;
  //   }
  // }
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
    svg {
      width: 40px;
    }
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
    margin-bottom: 0.567em;
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
  @media screen and (max-height: 692px) {
    .mapdiv {
      height: 90vh;
    }
  }
  @media screen and (max-width: 625px) {
    .mapdiv {
    }
    h1 {
      font-size: 30px;
      margin-top: 60px;
    }
  }
  @media screen and (max-width: 330px) {
    h1 {
      font-size: 25px;
    }
  }
  @media screen and (max-height: 692px) {
    height: 100%;
    .lowiskadiv {
      height: 100vh;
    }
  }
  @media screen and (min-width: 1420px) {
    flex-direction: row;
    overflow-y: hidden;

    .lowiskadiv {
      padding-top: 60px;
      overflow-y: scroll;
    }
  }
`;

export default Map;
