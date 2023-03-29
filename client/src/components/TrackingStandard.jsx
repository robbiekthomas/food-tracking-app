import React, { useState, useEffect } from "react";

import { Button, Typography, Box, Card } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DataGrid } from "@mui/x-data-grid";
import { FoodLogStandard } from "./FoodLogStandard";
import FoodList from "./FoodList";
import MealToggle from "./MealToggle";
import HabitGoalTracker from "./HabitGoalTracker";
import DateSelector from "./DateSelector";

const TrackingStandard = ({ mealToggle, setMealToggle }) => {
  const [meal, setMeal] = useState("");
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const showFoodList = (mealID) => {
    setMeal(mealID);
    setOpen(true);
  };

  const gradientStyling =
    "bg-gradient-to-r from-[#f8fafc]/[0.1] via-[#f8fafc]/[0.02] to-[#f8fafc]/[0.1] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";

  return (
    <div className="flex justify-center">
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

      <div className="flex flex-col mr-3">
        {/**DATE PICKER */}
        <div
          className={`shadow-sm relative rounded-lg text-dimWhite flex justify-items-center justify-center items-center ${gradientStyling} w-[400px] py-1 mb-3`}
        >
          <DateSelector />
        </div>

        <HabitGoalTracker />
      </div>

      <div
        className={`flex flex-col items-center shadow-sm relative rounded-lg bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.15] to-[#f8fafc]/[0.01] border-t-2 border-[#f8fafc]/[0.2] z-10`}
      >
        <MealToggle mealToggle={mealToggle} setMealToggle={setMealToggle} />

        {mealToggle === "breakfast" && (
          <div
            className={`shadow-sm relative rounded-lg text-dimWhite align-center w-full  px-7 pt-5 pb-5 ${gradientStyling}`}
          >
            <p className="w-full text-center font-bold text-gray-400 text-xl mb-1">
              Breakfast
            </p>
            <FoodLogStandard
              meal={"breakfast"}
              mealID={1}
              showList={showList}
            />
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
            <p className="w-full text-center font-bold text-gray-400 text-xl mb-1">
              Lunch
            </p>
            <FoodLogStandard meal={"lunch"} mealID={2} showList={showList} />
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
            <p className="w-full text-center font-bold text-gray-400 text-xl mb-1">
              Dinner
            </p>
            <FoodLogStandard meal={"dinner"} mealID={4} showList={showList} />
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
            <p className="w-full text-center font-bold text-gray-400 text-xl mb-1">
              Snack
            </p>
            <FoodLogStandard meal={"snack"} mealID={3} showList={showList} />
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

export default TrackingStandard;
