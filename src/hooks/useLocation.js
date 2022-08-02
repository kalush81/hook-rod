import { useState, useEffect } from "react";

export const useLocation = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const geo = navigator.geolocation;

    const onChange = ({ coords }) => {
      setLocation({
        latGeo: coords.latitude,
        lngGeo: coords.longitude,
      });
    };
    const onError = (error) => {
      setError(error.message);
    };

    if (!geo) {
      setError("Location not supported");
      return;
    }
    const watcher = geo.watchPosition(onChange, onError);
    return () => geo.clearWatch(watcher);
  }, []);

  return { ...location, error };
};
