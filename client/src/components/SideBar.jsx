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
    <div className="bg-primary text-dimWhite w-1/4 h-screen flex-column text-center">
      <div className="bg-secondary m-10 p-10 rounded-3xl">
        <Avatar
          alt="Remy Sharp"
          src={avatar}
          sx={{ width: 200, height: 200, margin: "auto", marginTop: "20px" }}
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
    </div>
  );
};

export default SideBar;
