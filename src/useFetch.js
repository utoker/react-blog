import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      const getData = async () => {
        try {
          const res = await fetch(url, { signal: abortCont.signal });
          const data = await res.json();
          if (!res.ok) {
            throw Error("could not fetch the data from that resource");
          }
          setData(data);
          setIsLoading(false);
        } catch (err) {
          if (err.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            setError(err.message);
            setIsLoading(false);
          }
        }
      };
      getData();
    }, 444);

    return () => abortCont.abort();
  }, [url]);

  return { data, error, isLoading };
};

export default useFetch;
