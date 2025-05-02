import React from "react";
import { DataContext } from "../Context/DataContext";
import { AuthContext } from "../Context/AuthContext";
import { baseUrl } from "../urls/menuOptionsList";

function useGetData(endpoint) {
  const { isUpdating, setIsUpdating, isNew } = React.useContext(DataContext);
  const { auth } = React.useContext(AuthContext);
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const url = baseUrl + endpoint;
  
  React.useEffect(() => {
    const fetchData = async () => {
      if (isNew) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const apiData = await response.json();
        setData(apiData);
        setError(false);
      } catch (err) {
        console.error('Error occurred when fetching data', err);
        setError(true);
      } finally {
        setIsLoading(false);
        setIsUpdating(false);
      }
    };

    if (auth.token) {
      fetchData();
    }
  }, [url, isUpdating, auth.token]);

  return { data, isLoading, error };
}

export { useGetData };
