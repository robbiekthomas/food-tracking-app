import React, { createContext, useContext, useState } from "react";


export const LoginContext = createContext({loggedIn: false, setLoggedIn: () => {}});

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn}}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext);