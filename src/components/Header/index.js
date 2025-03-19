import React from "react";
import { ToggleMenuButton } from './ToggleMenuButton';
import profilePic from "./store-logo-minimal.png";
import "./Header.css";

function Header() {
  console.log('Render Header')
  return (
    <header className="flx flx-center header">
      <ToggleMenuButton />
      <h1>Jahaira Store</h1>
      <img src={profilePic} className="header-profile-pic" alt="User"></img>
    </header>
  )
}

export { Header };