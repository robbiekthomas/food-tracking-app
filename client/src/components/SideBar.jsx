import React, { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import { Avatar } from "@mui/material";
import { useLoginContext } from "../contexts/login-status";



const SideBar = ({
  inputs,
  setUserInputs,
  currentHabits,
  setCurrentHabits,
}) => {
  const { avatar, setAvatar } = useLoginContext();
  return (
    <div className="bg-white w-1/4 h-screen flex-column text-center">
      
      <Avatar
        alt="Remy Sharp"
        src={avatar}
        sx={{ width: 200, height: 200, margin: "auto" }}
      />
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
