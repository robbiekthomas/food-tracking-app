import React from "react";
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("light");
  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
    
  };

  const setColor = (e) => {
    setCurrentColor(e.target.value);
    localStorage.setItem("colorMode", e.target.value);
    
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,
        currentMode,
        setCurrentColor,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
