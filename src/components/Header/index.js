import React from "react";
import { HeaderProfile } from "../HeaderProfile";
import "./Header.css";

function Header({ children, menuOption, user, setUser }) {
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <header className="flx flx-center header">
      {children}
      <h1>{menuOption.name}</h1>
      <img
        src={user.pictureUrl} 
        className="header-profile-pic"
        alt="User"
        onClick={() => setIsProfileOpen(state => !state)}  
      ></img>
      <HeaderProfile user={user} setUser={setUser} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />
    </header>
  )
}

export { Header };