import React from "react";
import Layout from "./src/components/Layout";

export function wrapPageElement({ element, props }) {
  return <Layout {...props}>{element}</Layout>;
}

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition,
}) => {
  if (location.pathname === "/rezerwacja-niedostepna") {
    return false;
  } else {
    return true;
  }
};
