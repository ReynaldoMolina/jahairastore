import React from "react";
import { MenuContext } from "../Context/MenuContext";
import { ToggleMenuButton } from './ToggleMenuButton';
import profilePic from "./store-logo-minimal.png";
import "./Header.css";

function Header() {
  console.log('Render Header')
  const { menuOption } = React.useContext(MenuContext);
  return (
    <header className="flx flx-center header">
      <ToggleMenuButton />
      <h1>{menuOption.name}</h1>
      {/* <h1>{menuOption.name}</h1> */}
      <img src={profilePic} className="header-profile-pic" alt="User"></img>
    </header>
  )
}

export { Header };