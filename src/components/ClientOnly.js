/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from "react";

function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = React.useState(false);
  React.useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}

export default ClientOnly;
