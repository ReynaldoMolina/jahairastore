import React from "react";
import { MobileContext } from "../Context/MobileContext";
import { DataContext } from "../Context/DataContext";
import { MenuContext } from "../Context/MenuContext";
import { SideMenuIcon } from "./SideMenuIcon";
import "./SideMenu.css";

function SideMenu() {
  console.log('Render SideMenu');
  const { isMobile } = React.useContext(MobileContext);
  const {
    menuOptions,
    menuOption, setMenuOption,
    isMenuOpen, setIsMenuOpen,
  } = React.useContext(MenuContext);
  const { setOpenModal, setDebe } = React.useContext(DataContext);

  return (
    <>
      <menu
        className={`flx flx-col side-menu ${isMenuOpen || "hidden"}`}
      >
        <h2 className="flx flx-center sidebar-logo">Jahaira Store</h2>
        <nav className="flx flx-col flx-center side-menu-options">
          {menuOptions.map(option => (
            <div
              key={option.id}
              className="flx flx-col flx-center side-menu-div"
            >
              <button
                className={`flx flx-center side-menu-opt ${(menuOption.name === option.name) && "menu-option-active"}`}
                onClick={() => {
                  if (isMobile) {                    
                    setIsMenuOpen(false);
                  }
                  setOpenModal(false);
                  setDebe(true);
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
      <div
        className={`
          close-menu
          ${isMobile || "hidden"}
          ${isMenuOpen || "hidden"}
        `}
        onClick={() => setIsMenuOpen(state => !state)}
      ></div>
    </>
  )
}

export { SideMenu };