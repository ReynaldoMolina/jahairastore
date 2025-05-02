import React from "react";
import "./Header.css";

function Header({ children, menuOption, user }) {
  return (
    <header className="flx flx-center header">
      {children}
      <h1>{menuOption.name}</h1>
      <img src={user.pictureUrl} className="header-profile-pic" alt="User"></img>
    </header>
  )
}

export { Header };