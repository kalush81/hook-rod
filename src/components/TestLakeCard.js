import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function TestLakeCard({ lakeImageFile }) {
  console.log("lakeImageFile", lakeImageFile);
  return (
    <div>
      <p>test lake card</p>;
      <GatsbyImage image={getImage(lakeImageFile)}></GatsbyImage>
    </div>
  );
}

export default TestLakeCard;
