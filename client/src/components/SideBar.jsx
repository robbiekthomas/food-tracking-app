import React, { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import EditAvatar from "./EditAvatar";


const SideBar = ({
  inputs,
  setUserInputs,
  currentHabits,
  setCurrentHabits,
}) => {
  
  return (
    <div className="bg-white w-1/4 h-screen flex-column text-center">
      <EditAvatar  />
      
      <EditProfileForm
        inputs={inputs}
        change={setUserInputs}
        
        currentHabits={currentHabits}
        setCurrentHabits={setCurrentHabits}
      />
      <h1 className="mt-3 text-center bold uppercase text-2xl font-bold">
        {inputs.name}
      </h1>
    </div>
  );
};

export default SideBar;
