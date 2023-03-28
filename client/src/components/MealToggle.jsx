import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const MealToggle = (props) => {

 

  return (
    <div>
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
          height: "40px",

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
