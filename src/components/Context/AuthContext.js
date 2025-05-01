import React from "react";

const AuthContext = React.createContext();

function AuthProvider({ children }) {  
  const [auth, setAuth] = React.useState({
    isAuthenticated: false,
    token: ''
  });

  return (
    <AuthContext.Provider value={{
      auth, setAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };