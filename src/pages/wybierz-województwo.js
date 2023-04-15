import React from "react";
import Map from "../components/Map";
import styled from "styled-components";

function Wybierz() {
  return (
    <Div>
      <Map />
    </Div>
  );
}

export const Div = styled.div`
  width: 90%;
  max-width: 1400px;
  border: 2px solid red;
  margin: 0 auto;
  padding: 80px 0 120px 0;
`;

// export const LongDiv = styled.div`
//   min-height: 200vh;
//   border: 4px solid red;
// `;
// export const FixedDiv = styled.div`
//   padding-top: 100px;
//   height: 100vh;
//   width: 160px;
//   position: fixed;
//   top: 0;
//   left: 0;
//   background: brown;
//   li {
//     font-size: 24px;
//     padding: 1rem;
//     margin: 1rem;
//     background: white;
//   }
//   li.isVisible {
//     background: grey;
//   }
// `;
export default Wybierz;
