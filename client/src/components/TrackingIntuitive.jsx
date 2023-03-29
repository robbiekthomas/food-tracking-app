import React, { useState, useEffect } from "react";
import HabitGoalTracker from "./HabitGoalTracker";
import IntuitiveList from "./IntuitiveList";
import IntuitiveLog from "./IntuitiveLog";
import MealToggle from "./MealToggle";
import DateSelector from "./DateSelector";
import { Button, Typography, Box, Card } from "@mui/material";

const TrackingIntuitive = ({ getDataIntuitive, mealToggle, setMealToggle }) => {
  const [toggle, setToggle] = useState(false);

  const gradientStyling =
    "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";
  return (
    <div className="flex justify-around">
      <h1 className="font-xl">Intuitive Food Tracker</h1>

      <div className="flex flex-col">
        {/**DATE PICKER */}
        <div
          className={`shadow-sm relative rounded-lg text-dimWhite flex justify-items-center justify-center items-center ${gradientStyling} w-[410px] py-1 mb-5`}
        >
          <DateSelector />
        </div>

      <HabitGoalTracker />
      </div>

      <div className="flex flex-col">
        <MealToggle mealToggle={mealToggle} setMealToggle={setMealToggle} />

        {mealToggle === "breakfast" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full  px-7 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Breakfast</h1>
            <IntuitiveLog
              toggle={toggle}
              setToggle={setToggle}
              meal={"breakfast"}
              mealId={1}
        
            />
            <IntuitiveList
              setToggle={setToggle}
              mealId={1}
              meal={"Breakfast"}
              getDataIntuitive={getDataIntuitive}
            />
          </div>
        )}

        {mealToggle === "lunch" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full  px-7 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Lunch</h1>
            <IntuitiveLog
              toggle={toggle}
              setToggle={setToggle}
              meal={"lunch"}
              mealId={2}
              
            />
            <IntuitiveList getDataIntuitive={getDataIntuitive} setToggle={setToggle} mealId={2} meal={"Lunch"} />
          </div>
        )}

        {mealToggle === "dinner" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full  px-7 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Dinner</h1>
            <IntuitiveLog
              toggle={toggle}
              setToggle={setToggle}
              meal={"dinner"}
              mealId={4}
       
            />
            <IntuitiveList getDataIntuitive={getDataIntuitive} setToggle={setToggle} mealId={4} meal={"Dinner"} />
          </div>
        )}

        {mealToggle === "snack" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full  px-7 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Snack</h1>
            <IntuitiveLog
              toggle={toggle}
              setToggle={setToggle}
              meal={"snack"}
              mealId={3}
          
            />
            <IntuitiveList getDataIntuitive={getDataIntuitive} setToggle={setToggle} mealId={3} meal={"Snack"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingIntuitive;
