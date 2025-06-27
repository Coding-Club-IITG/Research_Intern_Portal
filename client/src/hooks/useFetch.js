import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url, {
          withCredentials: true,
        });
        setData(response.data);
        setMessage(response.data.message);
      } catch (err) {
        setError(err);
        setMessage(err.message);
        // navigate("/500");
      } finally {
        setLoading(false);
      }
    })();
  }, [url, navigate]);

  return { data, loading, error, message };
}
