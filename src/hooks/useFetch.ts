import { useEffect, useState } from "react";
import { Contract, Items } from "../types/types";

const useFetch = (url: string) => {
  const [data, setData] = useState<Contract[] | Items[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url)
        const result = await res.json()
        setData(result);
      } catch (error: any) {
        console.log(error)
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
