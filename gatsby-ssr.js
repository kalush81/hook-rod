import React from "react";

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    <link rel="stylesheet" href="ant/dist/reset.css" key="antd-stylesheet" />,
  ]);
};
