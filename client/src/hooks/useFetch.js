import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "../pages/Loading";
import { useNavigate } from "react-router-dom";

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (error) {
    navigate("/500");
    return null;
  }

  return (
    <>
      {loading && <Loading />}
      {data && <div>{JSON.stringify(data)}</div>}
    </>
  );
}
