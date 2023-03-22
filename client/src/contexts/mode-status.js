import React, { createContext, useContext, useState } from "react";


export const ModeContext = createContext();

export const ModeProvider = ({ children }) => {
  const [mode, setMode] = useState("precise");

  return (
    <ModeContext.Provider value={{mode, setMode}}>
      {children}
    </ModeContext.Provider>
  )
}

export const useModeContext = () => useContext(ModeContext);