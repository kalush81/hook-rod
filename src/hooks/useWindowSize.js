import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState(() => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 501) return 7;
      if (width > 500 && width < 601) return 8;
      if (width > 600 && width < 701) return 9;
      if (width > 700 && width < 801) return 10;
      if (width > 800 && width < 901) return 11;
      if (width > 900 && width < 1001) return 12;
      return 14;
    }
    return 14; // Fallback in case window is undefined
  });

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 501) setSize(7);
      else if (width > 500 && width < 601) setSize(8);
      else if (width > 600 && width < 701) setSize(9);
      else if (width > 700 && width < 801) setSize(10);
      else if (width > 800 && width < 901) setSize(11);
      else if (width > 900 && width < 1001) setSize(12);
      else setSize(14);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return size;
};

export default useWindowSize;
