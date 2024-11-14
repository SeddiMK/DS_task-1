import { SERVER_URL } from "@/config/paths";
import { useEffect, useState } from "react";

export const useDB = (query: string, endpoint = SERVER_URL) => {
  const [fetchData, setFetchData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const requestFetchData = async () => {
    setLoading(true);
    const queryParam = query ? `${query}` : "";

    try {
      const response = await fetch(`${endpoint}${queryParam}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setFetchData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestFetchData();
  }, [query, endpoint]);

  return { fetchData, loading, error };
};
