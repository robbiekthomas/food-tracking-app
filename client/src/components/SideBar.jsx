import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';


const SideBar = ({ inputs, setUserInputs, currentHabits, setCurrentHabits }) => {

  return (
    <div className="bg-white w-1/4 h-screen flex-column">
      <div className="circle-frame" />
      <h1>{inputs.name}</h1>
      < EditProfileForm
        inputs={inputs}
        change={setUserInputs}
        currentHabits={currentHabits}
        setCurrentHabits={setCurrentHabits}
      />
    </div>
  );
};

export default SideBar;
