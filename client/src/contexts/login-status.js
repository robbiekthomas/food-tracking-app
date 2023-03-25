import React, { createContext, useContext, useEffect, useState } from "react";
import Avatar1 from "../assets/avatar1.png";
import Avatar2 from "../assets/avatar2.png";
import Avatar3 from "../assets/avatar3.png";
import Avatar4 from "../assets/avatar4.png";
import Avatar5 from "../assets/avatar5.png";
import Avatar6 from "../assets/avatar6.png";
import Avatar7 from "../assets/avatar7.png";
import Avatar8 from "../assets/avatar8.png";


export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [avatar, setAvatar] = useState(Avatar1)

  useEffect(() => {
    const loginMode = localStorage.getItem("login");
    setLoggedIn(loginMode)

    const avatarMode = localStorage.getItem("avatar")
    setAvatar(avatarMode);

  }, [])

  return (
    <LoginContext.Provider value={{loggedIn, setLoggedIn, avatar, setAvatar}}>
      {children}
    </LoginContext.Provider>
  )
}

export const useLoginContext = () => useContext(LoginContext);