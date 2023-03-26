import React, { useState, useEffect } from "react";

import { Button, Container, Typography, Box, Card } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DataGrid } from "@mui/x-data-grid";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";
import classNames from "classnames";
import HabitGoalTracker from "./HabitGoalTracker";

const TrackingPrecise = (
  inputs,
  setUserInputs,
  targetCalories,
  protein,
  carbs,
  fat,
  date
) => {
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
        <FoodLog meal={"breakfast"} mealID={1} showList={showList} />
      </Card>

      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
      <Typography variant="h6">Lunch</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(2)}>
          Add Lunch
        </Button>
        <FoodLog meal={"lunch"} mealID={2} showList={showList} />
      </Card>

      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
      <Typography variant="h6">Dinner</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(4)}>
          Add Dinner
        </Button>
        <FoodLog meal={"dinner"} mealID={4} showList={showList} />
      </Card>

      <Card variant="outlined" sx={{ width: 790, p: 2, m: 2, borderRadius: '16px' }}>
      <Typography variant="h6">Snack</Typography>
        <Button sx={{ width: "100%", p: 1 }} variant="outlined" onClick={() => showFoodList(3)}>
          Add Snack
        </Button>
        <FoodLog meal={"snack"} mealID={3} showList={showList} />
      </Card>
      </div>

      <HabitGoalTracker />
      </Box>
    </Box>
  );
};

export default TrackingPrecise;
