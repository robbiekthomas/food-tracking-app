import React, { useState } from 'react'
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


const MealToggle = (props) => {
  

  return (
    <div>
       <ToggleButtonGroup
        value={props.mealToggle}
        exclusive
        onChange={props.handleToggle}
        aria-label="text alignment"
        sx={{borderRadius: "16px"}}
      >
        <ToggleButton value="breakfast" aria-label="breakfast">
          Breakfast
        </ToggleButton>
        <ToggleButton value="lunch" aria-label="lunch">
          Lunch
        </ToggleButton>
        <ToggleButton value="dinner" aria-label="dinner">
          Dinner
        </ToggleButton>
        <ToggleButton value="snack" aria-label="snack">
          Snack
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default MealToggle