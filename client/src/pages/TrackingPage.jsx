import React, { useEffect, useState } from "react";
import TrackingIntuitive from "../components/TrackingIntuitive";
import TrackingStandard from "../components/TrackingStandard";
import TrackingPrecise from "../components/TrackingPrecise";
import { FoodToggleDay } from "../components/FoodToggleDay";
import { useModeContext } from "../contexts/mode-status";
import { useStateContext } from "../contexts/ContextProvider";
import { Box } from "@mui/system";

import Fade from '@mui/material/Fade';

import Header from '../components/Header';
import { getUserRow } from "../api-requests/dashboard";
import { getDailyMacroStats, getFoodList } from "../api-requests/tracker";
import { format, parseISO } from 'date-fns';


import {
  getTargetCalories,
  getMaintenanceCalories,
  getTodaysDate,
  getFat,
  getCarbs,
  getProtein
}
  from "../helper-functions/nutritionCalculations";
import FoodList from "../components/FoodList";


const TrackingPage = () => {
  const { mode, setMode } = useModeContext();
  const { planet } = useStateContext();
  useEffect(() => { }, [mode]);


  const [mealToggle, setMealToggle] = useState("breakfast");

  const handleToggle = (event, meal) => {
    setMealToggle(meal);
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
    hungerAfter: 0
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [stringifiedDate, setStringifiedDate] = useState();
  const [dailyMealSummary, setDailyMealSummary] = useState({ 1: [], 2: [], 3: [], 4: [] }) //br, lu, sn, di
  const renderDataByDate = () => {

  }

  const maintenanceCalories = getMaintenanceCalories(inputs.weight, inputs.body_fat_percentage);
  const targetCalories = getTargetCalories(inputs.weight_change_goal, maintenanceCalories);
  const protein = getProtein(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);

  useEffect(() => {
    getUserRow()
      .then((res) => {
        setUserInputs(res[0]);

      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  useEffect(() => {
    getDailyMacroStats()
      .then((res) => {
        setAllTimeStats(res);
      })
  }, [])

  //get data depending on current date
  useEffect(() => {
    if (selectedDate) {
      const d = format(selectedDate, "yyyy/MM/dd");
      setStringifiedDate(d);
  
      for (const i of allTimeStats) {
        if (i.date === d) {
          setDailyStats(i); //set stats for dashboard
        }
      }

      getFoodList(d)
        .then((res) => {
          setDailyMealSummary('res', res);
        }) //get food to render on page

    }
  }, [selectedDate, allTimeStats, dailyMealSummary])

 
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
    stringifiedDate, 
    mealToggle,
    handleToggle
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


      <Header
        day={selectedDate}
        changeDay={setSelectedDate}
        dailyStats={dailyStats}
        targetCalories={targetCalories}
        protein={protein}
        carbs={carbs}
        fat={fat}
      >

      </Header>

      {(stringifiedDate && mode === "precise") && <TrackingPrecise {...props} />}
      {(stringifiedDate && mode === "intuitive") && <TrackingIntuitive {...props}/>}
      {(stringifiedDate && mode === "standard") && <TrackingStandard {...props}/>}




    </div>



  );
};

export default TrackingPage;
