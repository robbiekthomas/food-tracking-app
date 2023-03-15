import React from 'react'
import { useContext, StateContext } from 'react';

export const ContextProvider = ({ children }) => {
  return (
      <StateContext.Provider>
        {children}
      </StateContext.Provider>
    );
  };
  
  export const useStateContext = () => useContext(StateContext);


