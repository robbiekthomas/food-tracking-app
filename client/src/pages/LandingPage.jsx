import React from "react";
import Home from "../components/Home";
import { useStateContext } from "../contexts/ContextProvider";

const LandingPage = () => {

  return (
    <div className={" h-[92.9vh]"}>
      <Home />
    </div>
  );
};

export default LandingPage;
