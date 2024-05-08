import { useEffect, useState } from "react";

type FetchFunction = () => Promise<any[]>;

const useFetch = (apiToFetch: FetchFunction) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiToFetch();
        setData(result);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiToFetch]);

  return { data, loading, error };
};

export default useFetch;
