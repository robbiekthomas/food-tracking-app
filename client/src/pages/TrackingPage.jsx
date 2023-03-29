import React, { useEffect, useState } from "react";
import TrackingIntuitive from "../components/TrackingIntuitive";
import TrackingStandard from "../components/TrackingStandard";
import TrackingPrecise from "../components/TrackingPrecise";
import { FoodToggleDay } from "../components/FoodToggleDay";
import { useModeContext } from "../contexts/mode-status";
import { useStateContext } from "../contexts/ContextProvider";
import { getQualitativeStats } from "../api-requests/tracker";
import { useDateContext } from "../contexts/date-context";


import { Box } from "@mui/system";

import Fade from "@mui/material/Fade";

import Header from "../components/Header";
import { getUserRow } from "../api-requests/dashboard";
import { getDailyMacroStats, getFoodList } from "../api-requests/tracker";
import { format } from "date-fns";

import {
  getTargetCalories,
  getMaintenanceCalories,
  getTodaysDate,
  getFat,
  getCarbs,
  getProtein,
} from "../helper-functions/nutritionCalculations";
import FoodList from "../components/FoodList";

const TrackingPage = () => {
  const { mode, setMode } = useModeContext();
  const { selectedContextDate, setSelectedContextDate } = useDateContext();
  const { background } = useStateContext();

  const { planet } = useStateContext();
  useEffect(() => { }, [mode]);

  const [mealToggle, setMealToggle] = useState("breakfast");

  const handleToggle = (event) => {
    setMealToggle(event.target.value);
  };

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

  //date selection functionality for tracker and header
  const [allTimeStats, setAllTimeStats] = useState([]);
  const [dailyStats, setDailyStats] = useState({
    carbs: 0,
    protein: 0,
    fat: 0,
    hungerBefore: 0,
    hungerAfter: 0,
  });

  const [moodArray, setMoodArray] = useState([]);
  const [dailyMealSummary, setDailyMealSummary] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  }); //br, lu, sn, di

  //helper funtions
  const maintenanceCalories = getMaintenanceCalories(
    inputs.weight,
    inputs.body_fat_percentage
  );
  const targetCalories = getTargetCalories(
    inputs.weight_change_goal,
    maintenanceCalories
  );
  const protein = getProtein(
    inputs.weight,
    inputs.sex,
    inputs.body_fat_percentage
  );
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);

  //set user inputs on the tracker
  useEffect(() => {
    getUserRow()
      .then((res) => {
        setUserInputs(res[0]);
      })
      .catch((err) => {
        console.log("getUserRow", err);
      });
  }, []);

  //get data to fill macro cards on standard and precise
  useEffect(() => {
    getDailyMacroStats()
      .then((res) => {
        console.log('ljlj', res)
        setAllTimeStats(res);
      })
      .catch((err) => {
        console.log("getDailyMacroStats", err);
      });
  }, [selectedContextDate]);

  useEffect(() => {
    let d = 0;
    if (selectedContextDate) {
      d = format(selectedContextDate, "yyyy/MM/dd");

      for (const i of allTimeStats) {
        if (i.date === d) {
          setDailyStats(i);
          break; //set stats for dashboard
        } else {
 
          setDailyStats({protein: 0, carbs: 0, fat: 0, calories: 0, hungerBefore: 0, hungerAfter: 0})
        }
      }

      getFoodList(d)
        .then((res) => {
          setDailyMealSummary(res);
        })
        .catch((err) => {
          console.log("getFoodList", err);
        });
    }
  }, [selectedContextDate, allTimeStats]);


  //get the correct qualitative information from the database
  const getDataIntuitive = () => {
    const d = format(selectedContextDate, "yyyy/MM/dd");
    getQualitativeStats(d)
      .then((res) => {
  
        setMoodArray(res);
      })
      .catch((err) => {
        console.log("getQualitativeStats", err);
      });
  }

  useEffect(() => {
    if (selectedContextDate) {
      getDataIntuitive();

    }
  }, [selectedContextDate]);



  const props = {
    inputs,
    setUserInputs,
    targetCalories,
    protein,
    carbs,
    fat,
    dailyStats,
    dailyMealSummary,
    setDailyMealSummary,
    mealToggle,
    setMealToggle,
  };

  return (
    <div>
     
        <Header
          dailyStats={dailyStats}
          targetCalories={targetCalories}
          protein={protein}
          carbs={carbs}
          fat={fat}
          mood={moodArray}

        ></Header>
  


      {selectedContextDate && mode === "precise" && (
        <TrackingPrecise {...props} />
      )}
      {selectedContextDate && mode === "intuitive" && (
        <TrackingIntuitive getDataIntuitive={getDataIntuitive} {...props} />
      )}
      {selectedContextDate && mode === "standard" && (
        <TrackingStandard {...props} />
      )}

      <Box
        position="fixed"
        bottom={20}
        sx={{ zIndex: -1, width: "100vw", height: "100vh" }}
      >
        <img src={background} alt="mercury" />
      </Box>
    </div>
  );
};

export default TrackingPage;
