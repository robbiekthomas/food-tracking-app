import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";

import FoodList from "../components/FoodList";
import FoodTracker from "../components/TrackingPrecise";
import TrackingIntuitive from "../components/TrackingIntuitive";
import TrackingStandard from "../components/TrackingStandard";
import TrackingPrecise from "../components/TrackingPrecise";
import { FoodToggleDay } from "../components/FoodToggleDay";
import { useModeContext } from "../contexts/mode-status";
import { useStateContext } from "../contexts/ContextProvider";
import { Box } from "@mui/system";
import Fade from '@mui/material/Fade';

import {
  getTargetCalories,
  getMaintenanceCalories,
  getTodaysDate,
  getFat,
  getCarbs,
  getProtein,
} from "../helper-functions/nutritionCalculations";

import { getUserRow } from "../api-requests/dashboard";

const TrackingPage = () => {
  const { mode, setMode } = useModeContext();
  const { planet } = useStateContext();
  useEffect(() => {}, [mode]);

  const [mealToggle, setMealToggle] = useState("breakfast");

  const handleToggle = (event, meal) => {
    setMealToggle(meal);
  };


  return (
    <div>
      <Box
        component="img"
        sx={{
          height: "100%",
          width: "60%",
          position: "absolute",
          top: 0,
          right: "-500px",
          "z-index": "-1",
          opacity: 0.2,
        }}
        src={planet}
      />

      {mode === "precise" && <TrackingPrecise mealToggle={mealToggle} handleToggle={handleToggle} />}

      {mode === "intuitive" && <TrackingIntuitive mealToggle={mealToggle} handleToggle={handleToggle} />}
      {mode === "standard" && <TrackingStandard mealToggle={mealToggle} handleToggle={handleToggle} />}
    </div>
  );
};

export default TrackingPage;
