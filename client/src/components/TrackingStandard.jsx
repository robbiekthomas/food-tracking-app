import React, { useState, useEffect } from "react";

import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { DataGrid } from "@mui/x-data-grid";
import { FoodLogStandard} from "./FoodLogStandard";
import FoodList from "./FoodList";

const TrackingPrecise = (props) => {
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
    <div>
      <h1 className="font-xl">Standard Food Tracker</h1>

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>
      <h1>Breakfast</h1>
      <FoodLogStandard meal={"breakfast"} mealID={1} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(1)}>
        Add Breakfast
      </Button>
      <h1>Lunch</h1>
      <FoodLogStandard meal={"lunch"} mealID={2} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(2)}>
        Add Lunch
      </Button>
      <h1>Dinner</h1>
      <FoodLogStandard meal={"dinner"} mealID={4} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(4)}>
        Add Dinner
      </Button>
      <h1>Snack</h1>
      <FoodLogStandard meal={"snack"} mealID={3} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(3)}>
        Add Snack
      </Button>
    </div>
  );
};

export default TrackingPrecise;
