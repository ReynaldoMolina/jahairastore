import React, { useState, useEffect } from "react";
import { baseUrl } from "../urls/menuOptionsList";
import { AuthContext } from "../Context/AuthContext";

function useSendLoginData(userData) {
  const url = `${baseUrl}auth/login`;
  const { setAuth } = React.useContext(AuthContext);
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
        
        if (data.token) {
          setAuth({
            isAuthenticated: true,
            token: data.token
          })
        }
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