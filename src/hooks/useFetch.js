import { useState, useMemo } from 'react';

export default function useFetch(baseUrl) {
  const [loading, setLoading] = useState(true);

  const get = useMemo(
    () => async (url) => {
      try {
        const response = await fetch(baseUrl + url);
        const data = await response.json();
        setLoading(false);
        return data;
      } catch (error) {
        setLoading(false);
        throw error;
      }
    },
    [baseUrl]
  );

  const post = useMemo(
    () => (url, body) => {
      return new Promise((resolve, reject) => {
        fetch(baseUrl + url, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        })
          .then((response) => response.json())
          .then((data) => {
            if (!data) {
              setLoading(false);
              return reject('server nie odpowiedział');
            }
            if (data.status === 200) {
            }
            if (data.status >= 400 && data.status < 600) {
              setLoading(false);
              return reject(data);
            }
            setLoading(false);
            resolve(data);
          })
          .catch((error) => {
            setLoading(false);
            reject(error);
          });
      });
    },
    [baseUrl]
  );

  return { get, post, loading };
}
