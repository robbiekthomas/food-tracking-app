import React, { useState, useEffect } from "react";


import { Button, Container, Typography, Box, Card } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import { DataGrid } from "@mui/x-data-grid";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";

import HabitGoalTracker from "./HabitGoalTracker";
import Card from "./charts/Card";
import { format } from 'date-fns';


const TrackingPrecise = (targetCalories, stringifiedDate, allTimeStats, dailyMealSummary, setDailyMealSummary) => {

  const [meal, setMeal] = useState("");
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [mealSummary, setMealSummary] = useState({ 1: [], 2: [], 3: [], 4: [] });
  const [date, setDate] = useState('');


  useEffect((res) => {
    setDate(stringifiedDate);
  }, [stringifiedDate])

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const showFoodList = (mealID) => {
    setMeal(mealID);
    setOpen(true);
  };

  useEffect((res) => {
    setMealSummary(dailyMealSummary);
  }, [dailyMealSummary])


  return (

    <Box>
      <Typography variant="h4" gutterBottom>
        Precise Food Tracker
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
      <Dialog onClose={handleClose} open={open} maxWidth="l" PaperProps={{
    sx: {
      width: 900,
      maxHeight: "90vh",
      height: 600
    }
  }}>
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>


      <div>
      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
        <Typography variant="h6">Breakfast</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(1)}>
          Add Breakfast
        </Button>
        <FoodLog
        meal={"breakfast"}
        mealID={1}
        onUpdate={setMealSummary}
        mealSummary={mealSummary}
        showList={showList}
        //selectedDate={dateStr}
      />
      </Card>

      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
      <Typography variant="h6">Lunch</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(2)}>
          Add Lunch
        </Button>
         <FoodLog
        meal={"lunch"}
        mealID={2}
        mealSummary={mealSummary}
        showList={showList}
        //selectedDate={dateStr}
      />
      </Card>

      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
      <Typography variant="h6">Dinner</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(4)}>
          Add Dinner
        </Button>
         <FoodLog
        meal={"dinner"}
        mealID={4}
        mealSummary={mealSummary}
        showList={showList}
        //selectedDate={dateStr}
      />
      </Card>

      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
      <Typography variant="h6">Snack</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(3)}>
          Add Snack
        </Button>
        <FoodLog
        meal={"snack"}
        mealID={3}
        mealSummary={mealSummary}
        showList={showList}
        //selectedDate={dateStr}
      />
      </Card>
      </div>

      <HabitGoalTracker />
      </Box>
    </Box>

    
  );
};

export default TrackingPrecise;
