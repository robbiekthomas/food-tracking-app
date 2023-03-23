import { ColumnDirective, ColumnsDirective, GridComponent } from '@syncfusion/ej2-react-grids';
import React, { useEffect, useState } from 'react';
import { getUserDetails, getUserMacros, getUserRow } from '../api-requests/dashboard';
import { SideBar } from '../components';
import ChartHeader from '../components/charts/ChartsHeader';
import LineChart from '../components/charts/LineChart';
import PieChart from '../components/charts/PieChart';
import Stacked from '../components/charts/Stacked';
import { createHabitGridData } from '../data/chartData';
import { getCarbs, getFat, getMaintenanceCalories, getProtein, getTargetCalories } from '../helper-functions/nutritionCalculations';
import DashboardIntuitive from "../components/DashboardIntuitive";
import DashboardPrecise from "../components/DashboardPrecise";
import DashboardStandard from "../components/DashboardStandard";
import { useModeContext } from "../contexts/mode-status";

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

  //calculate nutrition targets
  const maintenanceCalories = getMaintenanceCalories(inputs.weight, inputs.body_fat_percentage);
  const targetCalories = getTargetCalories(inputs.weight_change_goal, maintenanceCalories);
  const protein = getProtein(inputs.weight, inputs.sex,inputs.body_fat_percentage);
  const fat = getFat(inputs.weight, inputs.sex, inputs.body_fat_percentage);
  const carbs = getCarbs(targetCalories, protein, fat);


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
    maintenanceCalories
  }

  return (
    <div className="bg-slate-100">
      {mode === "precise" && <DashboardPrecise {...props} />}
      {mode === "intuitive" && <DashboardIntuitive {...props} />}
      {mode === "standard" && <DashboardStandard {...props} />}
    </div >
  );
};

export default DashboardPage;
