import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [themeSettings, setThemeSettings] = useState(false);

  useEffect(() => {
    const colorMode = localStorage.getItem("colorMode");
    setCurrentColor(colorMode);
  }, []);

  const setColor = (mode) => {
    setCurrentColor(mode);
    localStorage.setItem("colorMode", mode);
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,

        setCurrentColor,

        themeSettings,
        setThemeSettings,

        setColor,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
