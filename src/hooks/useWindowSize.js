import { useState, useLayoutEffect } from 'react';

const useWindowSize = () => {
  const [size, setSize] = useState(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 501) return 7;
      if (window.innerWidth > 500 && window.innerWidth < 601) return 8;
      if (window.innerWidth > 600 && window.innerWidth < 701) return 9;
      if (window.innerWidth > 700 && window.innerWidth < 801) return 10;
      if (window.innerWidth > 800 && window.innerWidth < 901) return 11;
      if (window.innerWidth > 900 && window.innerWidth < 1001) return 12;
      return 13;
    } else {
      return null;
    }
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      // Your window size update logic
      console.log('useUeffect in useWindowSize worked!!!');
      console.log('size', size);
      const handleResize = () => {
        if (window.innerWidth < 501) return setSize(7);
        if (window.innerWidth > 500 && window.innerWidth < 601)
          return setSize(8);
        if (window.innerWidth > 600 && window.innerWidth < 701)
          return setSize(9);
        if (window.innerWidth > 700 && window.innerWidth < 801)
          return setSize(10);
        if (window.innerWidth > 800 && window.innerWidth < 901)
          return setSize(11);
        if (window.innerWidth > 900 && window.innerWidth < 1001)
          return setSize(12);
        else {
          return setSize(13);
        }
      };

      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    } else {
      return null;
    }
  }, []);

  return size;
};

export default useWindowSize;
