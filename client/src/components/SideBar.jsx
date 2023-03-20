import React, { useState } from 'react';
import EditProfileForm from './EditProfileForm';


const SideBar = ({ inputs, setUserInputs }) => {


  return (
    <div className="bg-slate-100 w-60 h-screen flex-column">
     
     
          <div className="circle-frame" />
          <h1>{inputs.name}</h1>
          < EditProfileForm
            inputs={inputs}
            change={setUserInputs}
          />
          <p><strong>Body Fat:</strong> {inputs.body_fat_percentage}</p>
          <p><strong>Targe Weight Change:</strong> {inputs.weight_change_goal
}</p>
   
    </div>
  );
};

export default SideBar;
