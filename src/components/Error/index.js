import React from "react";
import "./Error.css";

function Error({ errorMessage }) {
  return (
    <div className="flx flx-col flx-center error">
      <p>Ha ocurrido un error:</p>
      <p>{errorMessage}</p>
      <button className="retry-button">Reintentar</button>
    </div>
  )
}

export { Error };