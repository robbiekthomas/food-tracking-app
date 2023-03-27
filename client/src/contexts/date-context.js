import React, { createContext, useContext, useEffect, useState } from "react";
import format from 'date-fns/format'

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const currentDate = new Date();

  const [selectedContextDate, setSelectedContextDate] = useState(currentDate);


  useEffect(() => {

  }, []);

  return (
    <DateContext.Provider value={{ selectedContextDate, setSelectedContextDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
