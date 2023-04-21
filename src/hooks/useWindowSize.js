import React, { useState, useEffect } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState(() => {
    return window.innerWidth;
  });

  const handleResize = () => {
    //console.log(window.innerWidth);
    if (window.innerWidth < 501) return setSize(7);
    if (window.innerWidth > 500 && window.innerWidth < 601) return setSize(8);
    if (window.innerWidth > 600 && window.innerWidth < 701) return setSize(9);
    if (window.innerWidth > 700 && window.innerWidth < 801) return setSize(10);
    if (window.innerWidth > 800 && window.innerWidth < 901) return setSize(11);
    if (window.innerWidth > 900 && window.innerWidth < 1001) return setSize(12);
    if (window.innerWidth > 1000) return setSize(14);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
