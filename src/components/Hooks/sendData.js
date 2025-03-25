async function sendData(fetchRegister, url, registerId) {
  let method, fetchUrl;
 
  if (registerId !== '') {
    fetchUrl = url + registerId;
    method = "PATCH";
  } else {
    fetchUrl = url;
    method = "POST";
  }

  const response = await fetch(fetchUrl, {
    method: method,
    body: JSON.stringify(fetchRegister),
    headers: {
      "Content-type": "application/json"
    }
  })
  const data = await response.json();
  
  return data;
}

export { sendData };