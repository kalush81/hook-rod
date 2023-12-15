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
            setLoading(false);
            if (!data) {
              return reject('server nie odpowiedział');
            }
            if (data.status >= 400 && data.status < 600) {
              return reject(data);
            }
            resolve(data);
          })
          .catch((error) => {
            console.error('error in useFetch catch block ', error);
            setLoading(false);
            reject(error);
          });
      });
    },
    [baseUrl]
  );

  return { get, post, loading };
}
