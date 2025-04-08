import React from "react";
import { menuOptionsList, apiUrl } from "../urls/menuOptionsList";

const MenuContext = React.createContext();

function MenuProvider({ children }) {  
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);
  const [menuOptions] = React.useState(menuOptionsList);
  const [apiBaseUrl] = React.useState(apiUrl);
  const [menuOption, setMenuOption] = React.useState({ name: "Home" });

  return (
    <MenuContext.Provider value={{
      isMenuOpen, setIsMenuOpen,
      menuOption, setMenuOption,
      apiBaseUrl,
      menuOptions,
    }}>
      {children}
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider };