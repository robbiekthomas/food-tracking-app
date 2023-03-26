import React, { createContext, useContext, useEffect, useState } from "react";
import { format } from 'date-fns';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const currentDate = format(new Date(), "yyyy/MM/dd");

  const [selectedContextDate, setSelectedContextDate] = useState(currentDate);


  useEffect(() => {
    // setDate();
    console.log('curr', selectedContextDate)
  }, []);

  return (
    <DateContext.Provider value={{ selectedContextDate, setSelectedContextDate }}>
      {children}
    </DateContext.Provider>
  );
};

export const useDateContext = () => useContext(DateContext);
