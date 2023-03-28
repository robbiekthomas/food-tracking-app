import React, { useState, useEffect, useRef } from "react";
import DateSelector from "./DateSelector";
import { Button, Typography, Box, Card, Slide } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";

import HabitGoalTracker from "./HabitGoalTracker";
import { format } from "date-fns";
import MealToggle from "./MealToggle";

import dab from "../assets/dab.png";

const TrackingPrecise = ({ mealToggle, setMealToggle }) => {
  const [meal, setMeal] = useState("");
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const [checked, setChecked] = useState(false);
  const containerRef = useRef(null);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

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
    <div className="flex justify-evenly items-start">
      <Dialog
        onClose={handleClose}
        open={open}
        sx={{ width: "100%" }}
        maxWidth="xl"
      >
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>

      <div className="flex flex-col">
        {/**DATE PICKER */}
        <div
          className={`shadow-sm relative rounded-lg text-dimWhite flex justify-items-center justify-center items-center ${gradientStyling} w-[410px] py-1 mb-5`}
        >
          <DateSelector />
        </div>

      <HabitGoalTracker />
      </div>

      <div
        className={`flex flex-col items-center shadow-sm relative rounded-lg "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-[#f8fafc]/[0.2] z-10"`}
      >
        <MealToggle mealToggle={mealToggle} setMealToggle={setMealToggle} />

        {mealToggle === "breakfast" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full  px-7 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Breakfast</h1>
            <FoodLog meal={"breakfast"} mealID={1} showList={showList} />
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(1)}
            >
              Add Breakfast
            </Button>
          </div>
        )}

        {mealToggle === "lunch" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Lunch</h1>
            <FoodLog meal={"lunch"} mealID={2} showList={showList} />
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(2)}
            >
              Add Lunch
            </Button>
          </div>
        )}

        {mealToggle === "dinner" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Dinner</h1>
            <FoodLog meal={"dinner"} mealID={4} showList={showList} />
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(4)}
            >
              Add Dinner
            </Button>
          </div>
        )}

        {mealToggle === "snack" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full px-8 pt-5 pb-5 ${gradientStyling}`}
          >
            <h1>Snack</h1>
            <FoodLog meal={"snack"} mealID={3} showList={showList} />
            <Button
              sx={{ width: "100%", p: 1 }}
              variant="outlined"
              onClick={() => showFoodList(3)}
            >
              Add Snack
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackingPrecise;
