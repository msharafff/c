import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const res = await fetch(url, config);
  const resData = await res.json();

  if (!res.ok) {
    throw new Error(resData.message || "failed to send request");
  }

  return resData;
}

export default function useHttp(url, config, initial) {
  const [data, setData] = useState(initial);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  function clearData() {
    setData(initial);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError(error.message || "something went wrong");
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if (config && (config.method === "GET" || !config.method || !config)) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}
