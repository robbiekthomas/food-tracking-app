import React from "react";
import Home from "../components/Home";
import {useStateContext} from "../contexts/ContextProvider";

const LandingPage = () => {
const {currentMode} = useStateContext();

  return (
    <div className={currentMode === 'Dark' ? "bg-main-dark-bg h-[92.9vh]" : "h-[92.9vh] bg-white"}>
      <Home/>
    </div>
  );
};

export default LandingPage;
