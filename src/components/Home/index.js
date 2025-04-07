import React from "react";
import { useGetData } from "../Hooks/useGetData";
import logo from "./store-logo.png";
import "./Home.css";

function Home() {
  // const { data, isLoading } = useGetData('https://frasedeldia.azurewebsites.net/api/phrase');

  return (
    <div className="flx flx-col flx-center home">
      <img src={logo} alt="Logo"></img>
      <h1>Elegancia y tendencias de Shein a tu alcance</h1>
      {/* <p>Frase: {data.phrase}</p>
      <p>Autor: {data.author}</p> */}
    </div>
  )
}

export { Home };