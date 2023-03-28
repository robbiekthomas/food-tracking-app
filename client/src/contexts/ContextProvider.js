import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";

const StateContext = createContext();

export const ContextProvider = ({ children }) => {
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [themeSettings, setThemeSettings] = useState(false);
  const [planet, setPlanet] = useState("");
  const [background, setBackground] = useState();

  useEffect(() => {
    const colorMode = localStorage.getItem("colorMode");
    setCurrentColor(colorMode);
    const backgroundMode = localStorage.getItem("planet");
    setBackground(backgroundMode);
  }, []);

  const setColor = (mode, image, background) => {
    setCurrentColor(mode);
    localStorage.setItem("colorMode", mode);
    // setPlanet(image);
    setBackground(background);
    localStorage.setItem("planet", background);
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
        planet,
        background,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
