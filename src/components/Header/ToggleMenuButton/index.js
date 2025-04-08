import React from "react";
import { ReactComponent as SvgMenu } from './menu.svg';
import './ToggleMenuButton.css';

function ToggleMenuButton({ setIsMenuOpen }) {
  return (
    <SvgMenu
      className="toggle-menu-button"
      onClick={() => setIsMenuOpen(state => !state)}
    />
  )
}

export { ToggleMenuButton };