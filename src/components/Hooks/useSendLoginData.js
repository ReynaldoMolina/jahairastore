import { useState, useEffect } from "react";
import { baseUrl } from "../urls/menuOptionsList";

function useSendLoginData(userData) {
  const url = `${baseUrl}auth/login`;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            "Content-type": "application/json"
          }
        })
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
        setShouldSubmit(false);
      }
    }

    if (shouldSubmit) {
      fetchData();
    }
    
  }, [shouldSubmit]);

  return { data, isLoading, setShouldSubmit };
}

export { useSendLoginData };