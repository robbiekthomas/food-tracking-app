import React, { useState, useEffect } from "react";

import { Button, Typography, Box, Card } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";

import HabitGoalTracker from "./HabitGoalTracker";
import { format } from "date-fns";
import MealToggle from "./MealToggle";

const TrackingPrecise = ({
  targetCalories,
  stringifiedDate,
  allTimeStats,
  dailyMealSummary,
  setDailyMealSummary,
  mealToggle,
  setMealToggle,
}) => {
  const [meal, setMeal] = useState("");
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  // const mealToggle=props.mealToggle;
  // const handleToggle=props.handleToggle;

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const showFoodList = (mealID) => {
    setMeal(mealID);
    setOpen(true);
  };

  const gradientStyling =
    "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";

  return (

    <div className="flex justify-around bg-primary ">
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>

      <div className="flex flex-col">
        <MealToggle mealToggle={mealToggle} setMealToggle={setMealToggle} />

        {mealToggle === "breakfast" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center .w-1/2 px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Breakfast</h1>
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(1)}
            >
              Add Breakfast
            </Button>
            <FoodLog meal={"breakfast"} mealID={1} showList={showList} />
          </div>
        )}

        {mealToggle === "lunch" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center .w-1/2 px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Lunch</h1>
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(1)}
            >
              Add Lunch
            </Button>
            <FoodLog meal={"lunch"} mealID={2} showList={showList} />
          </div>
        )}

        {mealToggle === "dinner" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center .w-1/2 px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Dinner</h1>
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(1)}
            >
              Add Dinner
            </Button>
            <FoodLog meal={"dinner"} mealID={4} showList={showList} />
          </div>
        )}

        {mealToggle === "snack" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center .w-1/2 px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Snack</h1>
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(1)}
            >
              Add Snack
            </Button>
            <FoodLog meal={"snack"} mealID={3} showList={showList} />
          </div>
        )}
      </div>

      <HabitGoalTracker />
    </div>
  );
};

export default TrackingPrecise;
