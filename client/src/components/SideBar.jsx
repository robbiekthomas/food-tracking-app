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
      <div className="m-10 p-10 rounded-3xl bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.1]">
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
