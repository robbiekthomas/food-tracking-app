import React, { createContext, useContext, useEffect, useState } from "react";


export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const loginMode = localStorage.getItem("login");
    setLoggedIn(loginMode)
  }, [])

  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext);