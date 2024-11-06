import { useEffect, useState } from "react";
import { RootObject, ContactsType, Menu, Sections } from "@/types/db";

const SERVER_URL = "http://localhost:4000/";

export const useDB = (query: string, endpoint = SERVER_URL) => {
  const [fetchData, setFetchData] = useState(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const queryParam = query ? `${query}` : "";

      console.log(`${endpoint}${queryParam}`); //!!!

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

    fetchData();
  }, [query, endpoint]);

  return { fetchData, loading, error };
};
