import { useState } from 'react';
import axios from 'axios';

const useSubmitData = (url, method = 'POST') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const submitData = async (bodyData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        method: method,
        url: url,
        data: bodyData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setData(response.data);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, submitData };
};

export default useSubmitData;
