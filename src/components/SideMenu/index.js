import React from "react";
import { SideMenuIcon } from "./SideMenuIcon";
import "./SideMenu.css";

function SideMenu({
  setOpenModal,
  setLoadAll,
  menuOptions,
  menuOption,
  setMenuOption,
  isMenuOpen
}) {
  return (
    <menu
      className={`flx side-menu ${isMenuOpen || "hidden"}`}
    >
      <h2 className="flx flx-center sidebar-logo">Jahaira Store</h2>
      <nav className="flx flx-center side-menu-options">
        {menuOptions.map(option => (
          <div
            key={option.id}
            className="flx flx-center side-menu-div"
          >
            <button
              className={`flx flx-center side-menu-opt ${(menuOption.name === option.name) && "menu-option-active"}`}
              onClick={() => {
                setOpenModal(false);
                setLoadAll(false);
                setMenuOption(option);
              }}
            >
              <SideMenuIcon name={option.name} />
              {option.name}
            </button>
            {option.divider && (
              <div className="side-menu-divider"></div>
            )}
          </div>
        ))}
      </nav>
    </menu>
  )
}

export { SideMenu };