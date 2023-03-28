import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const MealToggle = (props) => {
  const gradientStyling =
  "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";

 

  return (
    <div className={`my-3 shadow-sm relative rounded-lg text-dimWhite align-center flex justify-center w-1/2  px-5 ${gradientStyling}`}>
      <ToggleButtonGroup
        value={props.mealToggle}
        exclusive
        onChange={(event)=> props.setMealToggle(event.target.value)}
        aria-label="text alignment"
        sx={{
          borderRadius: "16px",
          backgroundColor: "rgba(0, 0, 0, 0.25)",
          color: "white",
          width: "600px",
          height: "50px",

        }}
      >
        <ToggleButton
          sx={{ color: "white" }}
          value="breakfast"
          aria-label="breakfast"
        >
          Breakfast
        </ToggleButton>
        <ToggleButton sx={{ color: "white" }} value="lunch" aria-label="lunch">
          Lunch
        </ToggleButton>
        <ToggleButton
          sx={{ color: "white" }}
          value="dinner"
          aria-label="dinner"
        >
          Dinner
        </ToggleButton>
        <ToggleButton sx={{ color: "white" }} value="snack" aria-label="snack">
          Snack
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
};

export default MealToggle;
