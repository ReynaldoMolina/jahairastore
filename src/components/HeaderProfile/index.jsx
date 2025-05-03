import React from "react";
import { ReactComponent as SvgLogout } from './logout.svg';
import { ReactComponent as SvgClose } from './close.svg';
import './HeaderProfile.css';

function HeaderProfile({ user, isProfileOpen, setIsProfileOpen }) {
  return (
    <div className={`flx flx-col header-profile-container ${isProfileOpen || "header-profile-hidden"}`}>
      <button
        className="flx header-profile-close"
        type="button"
        onClick={() => setIsProfileOpen(false)}
      >
        <SvgClose className="header-profile-close-icon" />
      </button>
      <img className="header-profile-img" src={user.pictureUrl} alt="User picture" />
      <h2>{`¡Hola, ${user.username}!`}</h2>
      <button
        className="flx header-profile-logout"
        type="button"
      >
        <SvgLogout className="logout-icon"/>
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
}

export { HeaderProfile };