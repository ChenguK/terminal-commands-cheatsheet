import { useEffect, useState } from "react";
import { fetchCommands as fetchCommandsApi} from "../services/api";

export default function useCommands() {
  const [commands, setCommands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCommands = async (search = "") => {
    try {
      setLoading(true);
      setError(null);

      const data = await fetchCommandsApi(search);

      setCommands(Array.isArray(data) 
        ? data 
        : data.results || []);


    } catch (err) {
      if(err.name === "AbortError") {
        return; // Ignore abort errors
      }
      console.error(err);
      setError(err.message);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommands();
  }, []);

  return {
    commands,
    loading,
    error,
    retry: fetchCommands
  };
}
