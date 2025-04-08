import React from "react";
import profilePic from "./store-logo-minimal.png";
import "./Header.css";

function Header({ children, menuOption }) {
  return (
    <header className="flx flx-center header">
      {children}
      <h1>{menuOption.name}</h1>
      <img src={profilePic} className="header-profile-pic" alt="User"></img>
    </header>
  )
}

export { Header };