import React from "react";
import { menuOptionsList } from "../urls/menuOptionsList";
import { MobileContext } from "./MobileContext";

const MenuContext = React.createContext();

function MenuProvider({ children }) {  
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const [menuOptions] = React.useState(menuOptionsList);
  const [menuOption, setMenuOption] = React.useState({ name: "Home" });

  return (
    <MenuContext.Provider value={{
      isMenuOpen,
      setIsMenuOpen,
      menuOptions,
      menuOption,
      setMenuOption,
    }}>
      {children}
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider };