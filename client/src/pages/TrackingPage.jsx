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

import { 
  getTargetCalories, 
  getMaintenanceCalories,
  getTodaysDate,
  getFat, 
  getCarbs, 
  getProtein 
} 
from "../helper-functions/nutritionCalculations";

import { getUserRow } from "../api-requests/dashboard";


const TrackingPage = () => {
  const { mode, setMode } = useModeContext();
  const { planet } = useStateContext();
  useEffect(() => {}, [mode]);

  const [inputs, setUserInputs] = useState({
    id: 1,
    name: "",
    email: "",
    birthdate: "",
    sex: "",
    toggleBF: false,
    mainGoal: "",
    bodyFatPercentage: 0,
    waist: 0,
    hips: 0,
    neck: 0,
    height: 0,
    toggleWCC: false,
    weight_change_goal: 0,
  });

  const maintenanceCalories = getMaintenanceCalories(inputs.weight, inputs.body_fat_percentage);
  const targetCalories = getTargetCalories(inputs.weight_change_goal, maintenanceCalories);
  const protein = getProtein(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);
  const date = getTodaysDate();


  useEffect(() => {
    getUserRow()
    .then((res) => {
      setUserInputs(res[0]);
      
    })
    .catch((err) => {
      console.log(err);
    });
  }, [])

  const props = {
    inputs,
    setUserInputs,
    targetCalories,
    protein,
    carbs,
    fat,
    date
  }

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

      {mode === "precise" && <TrackingPrecise {...props} />}

      {mode === "intuitive" && <TrackingIntuitive />}
      {mode === "standard" && <TrackingStandard />}
    </div>
  );
};

export default TrackingPage;
