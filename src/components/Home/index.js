import React from "react";
import logo from "./store-logo.png";
import "./Home.css";

function Home() {
  return (
    <section className="flx flx-col flx-center home">
      <img src={logo} alt="Logo"></img>
      <h1>Elegancia y tendencias de Shein a tu alcance</h1>
    </section>
  )
}

export { Home };