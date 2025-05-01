import { baseUrl } from "../urls/menuOptionsList";

async function sendData(fetchRegister, url, registerId, token) {
  let method, fetchUrl;
 
  if (registerId !== '') {
    fetchUrl = `${baseUrl}${url}/${registerId}`;
    method = "PATCH";
  } else {
    fetchUrl = url;
    method = "POST";
  }

  const response = await fetch(fetchUrl, {
    method: method,
    body: JSON.stringify(fetchRegister),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const data = await response.json();
  
  return data;
}

export { sendData };