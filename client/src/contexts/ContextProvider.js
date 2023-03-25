import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import mercury from '../assets/mercury.png'

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [themeSettings, setThemeSettings] = useState(false);
  const [planet, setPlanet] = useState("")

  useEffect(() => {
    const colorMode = localStorage.getItem("colorMode");
    setCurrentColor(colorMode);
  }, []);

  const setColor = (mode, image) => {
    setCurrentColor(mode);
    localStorage.setItem("colorMode", mode);
    setPlanet(image)
  };

  return (
    <StateContext.Provider
      value={{
        currentColor,
        setCurrentColor,
        themeSettings,
        setThemeSettings,
        setColor,
        setPlanet,
        planet
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
