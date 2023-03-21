import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';


const SideBar = ({ inputs, setUserInputs, habitGoal1, setCurrentHabitGoal1 }) => {


  return (
    <div className="bg-white w-1/4 h-screen flex-column">
      <div className="circle-frame" />
      <h1>{inputs.name}</h1>
      < EditProfileForm
        inputs={inputs}
        change={setUserInputs}
        habitGoal1={habitGoal1}
        setCurrentHabitGoal1={setCurrentHabitGoal1}
      />
    </div>
  );
};

export default SideBar;
