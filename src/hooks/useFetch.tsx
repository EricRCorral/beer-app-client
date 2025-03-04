import { useState, useEffect, useCallback } from "react";

type Error = { error: string };

const useFetch = <T,>(url: string, options?: RequestInit) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const resp = await fetch(url, options);

      if (!resp.ok) {
        const dataResp: Error = await resp.json();

        setError(dataResp.error);
        return;
      }

      const dataResp: T = await resp.json();

      setData(dataResp);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
