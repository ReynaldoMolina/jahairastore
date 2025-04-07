import React from "react";

const MobileContext = React.createContext();

function MobileProvider({ children }) {  
  const [isMobile, setIsMobile] = React.useState(
    window.innerWidth < 651 ? true : false
  );

  return (
    <MobileContext.Provider value={{
      isMobile, setIsMobile
    }}>
      {children}
    </MobileContext.Provider>
  )
}

export { MobileContext, MobileProvider };