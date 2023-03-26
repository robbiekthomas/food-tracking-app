import React, { useEffect, useState } from 'react';
import { createHabitGridData } from '../data/chartData';
import DashboardIntuitive from "../components/DashboardIntuitive";
import DashboardPrecise from "../components/DashboardPrecise";
import DashboardStandard from "../components/DashboardStandard";
import { useModeContext } from "../contexts/mode-status";
import '../styles/Dashboard.css'; 

import {
  getUserDetails,
  getUserMacros,
  getUserRow,
  getProteinProportion,
  getHungerScore,
  getMood
} from '../api-requests/dashboard';

import {
  getCarbs,
  getFat,
  getMaintenanceCalories,
  getProtein,
  getTargetCalories,
  getweelkyMacroDistribution,
  getProteinWeeklyAverage,
  getFatWeeklyAverage,
  getCarbsWeeklyAverage,
  getCalorieWeeklyAverage,
  getHunger,
  getTodaysDate
}
from '../helper-functions/nutritionCalculations';


const DashboardPage = () => {
  const { mode, setMode } = useModeContext();
  useEffect(() => { }, [mode]);

  //will store the users old data technically then get submitted as package for post request
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

  //Set and store current habit goals
  const [currentHabits, setCurrentHabits] = useState([]);
  
  const [habitGoal1, setCurrentHabitGoal1] = useState({
    goal_id: 0,
    is_complete: false,
    goal_name: "",
    date: "",
  });

  const [habitGoal2, setCurrentHabitGoal2] = useState({
    goal_id: 0,
    is_complete: false,
    goal_name: "",
    date: "",
  });

  const [habitGoal3, setCurrentHabitGoal3] = useState({
    goal_id: 0,
    is_complete: false,
    goal_name: "",
    date: "",
  });


  //set and store chart data
  const [lineChartData, setLineChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [proteinBarChartData, setProteinBarChartData] = useState([]);
  const [hungerScore, setHungerScore] = useState([]);
  const [mood, setMood] = useState([]);


  //calculate nutrition targets
  const maintenanceCalories = getMaintenanceCalories(inputs.weight, inputs.body_fat_percentage);
  const targetCalories = getTargetCalories(inputs.weight_change_goal, maintenanceCalories);
  const protein = getProtein(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);
  const date = getTodaysDate();

  const weelkyMacroDistribution = getweelkyMacroDistribution(barChartData); //pro, fat, cho, n
  const proteinWeeklyAverage = getProteinWeeklyAverage(weelkyMacroDistribution);
  const fatWeeklyAverage = getFatWeeklyAverage(weelkyMacroDistribution);
  const carbsWeeklyAverage = getCarbsWeeklyAverage(weelkyMacroDistribution);
  const  calorieWeeklyAverage = getCalorieWeeklyAverage(weelkyMacroDistribution)
  const avgWeeklyHungerBefore = getHunger(hungerScore, 7, 0); //data, days, index
  const avgWeeklyHungerAfter = getHunger(hungerScore, 7, 1); //data, days, index
  

  //gets user details and habit goals from the database
  useEffect(() => {
    getUserRow()
      .then((res) => {
        setUserInputs(res[0]);
        setCurrentHabitGoal1(res[0]);
        setCurrentHabitGoal2(res[1]);
        setCurrentHabitGoal3(res[2]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const d = createHabitGridData(habitGoal1, habitGoal2, habitGoal3);
    setCurrentHabits(d);
  }, [habitGoal1, habitGoal2, habitGoal3]);


  //get data for weight change chart and bf%
  useEffect(() => {
    getUserDetails()
      .then((res) => {
        setLineChartData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //get macro data
  useEffect(() => {
    getUserMacros()
      .then((res) => {
        setBarChartData(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);


  //get protein data
  useEffect(() => {
    getProteinProportion()
      .then((res) => {
        setProteinBarChartData(res);
  
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //get hunger data
  useEffect(() => {
    getHungerScore()
      .then((res) => {
        setHungerScore(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

  //get mood data
  useEffect(() => {
    getMood()
      .then((res) => {
        setMood(res);
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);

 


  const props = {
    currentHabits,
    inputs,
    setUserInputs,
    setCurrentHabits,
    targetCalories,
    protein,
    carbs,
    fat,
    barChartData,
    lineChartData,
    maintenanceCalories,
    proteinBarChartData,
    weelkyMacroDistribution,
    proteinWeeklyAverage,
    fatWeeklyAverage,
    carbsWeeklyAverage,
    avgWeeklyHungerBefore,
    avgWeeklyHungerAfter,
    mood,
    habitGoal1,
    habitGoal2,
    habitGoal3,
    calorieWeeklyAverage,
    date
  }

  return (
    <div className="bg-slate-100">
      {mode === "precise" && <DashboardPrecise {...props} />}
      {mode === "standard" && <DashboardStandard {...props} />}
      {mode === "intuitive" && <DashboardIntuitive {...props} />}
    </div >
  );
};

export default DashboardPage;
