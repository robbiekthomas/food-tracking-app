import React, { useState, useEffect } from "react";

import { Button, Typography, Box, Card } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";

import HabitGoalTracker from "./HabitGoalTracker";
import { format } from "date-fns";
import MealToggle from "./MealToggle";

const TrackingPrecise = (
  targetCalories,
  stringifiedDate,
  allTimeStats,
  dailyMealSummary,
  setDailyMealSummary,
  mealToggle,
  handleToggle
) => {
  const [meal, setMeal] = useState("");
  const [showList, setShowList] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [mealSummary, setMealSummary] = useState({
    1: [],
    2: [],
    3: [],
    4: [],
  });
  

  // useEffect(
  //   (res) => {
  //     setDate(stringifiedDate);
  //   },
  //   [stringifiedDate]
  // );


  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const showFoodList = (mealID) => {
    setMeal(mealID);
    setOpen(true);
  };

  useEffect(
    (res) => {
      setMealSummary(dailyMealSummary);
    },
    [dailyMealSummary]
  );

  return (
    // <Box>
    //   <Typography variant="h4" gutterBottom>
    //     March 26, 2023
    //   </Typography>

    //   <Box
    //     sx={{
    //       display: "flex",
    //       flexDirection: "row",
    //       justifyContent: "space-evenly",
    //       p: 1,
    //       m: 1,
    //       borderRadius: 1,
    //     }}
    //   >
    //     <Dialog
    //       onClose={handleClose}
    //       open={open}
    //       maxWidth="l"
    //       PaperProps={{
    //         sx: {
    //           width: 900,
    //           maxHeight: "90vh",
    //           height: 600,
    //         },
    //       }}
    //     >
    //       <FoodList
    //         meal={meal}
    //         setShowList={setShowList}
    //         handleClose={handleClose}
    //       />
    //     </Dialog>

    //     <div>
    //       <div className="ml-4">
    //         <MealToggle mealToggle handleToggle={handleToggle} />
    //       </div>
    //       {mealToggle === "breakfast" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6">Breakfast</Typography>
    //           <Button
    //             sx={{ width: "100%", p: 1 }}
    //             variant="outlined"
    //             onClick={() => showFoodList(1)}
    //           >
    //             Add Breakfast
    //           </Button>
    //           <FoodLog
    //             meal={"breakfast"}
    //             mealID={1}
    //             onUpdate={setMealSummary}
    //             mealSummary={mealSummary}
    //             showList={showList}
    //             //selectedDate={dateStr}
    //           />
    //         </Card>
    //       )}
    //       {mealToggle === "lunch" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6">Lunch</Typography>
    //           <Button
    //             sx={{ width: "100%", p: 1 }}
    //             variant="outlined"
    //             onClick={() => showFoodList(2)}
    //           >
    //             Add Lunch
    //           </Button>
    //           <FoodLog
    //             meal={"lunch"}
    //             mealID={2}
    //             mealSummary={mealSummary}
    //             showList={showList}
    //             //selectedDate={dateStr}
    //           />
    //         </Card>
    //       )}

    //       {mealToggle === "dinner" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6">Dinner</Typography>
    //           <Button
    //             sx={{ width: "100%", p: 1 }}
    //             variant="outlined"
    //             onClick={() => showFoodList(4)}
    //           >
    //             Add Dinner
    //           </Button>
    //           <FoodLog
    //             meal={"dinner"}
    //             mealID={4}
    //             mealSummary={mealSummary}
    //             showList={showList}
    //             //selectedDate={dateStr}
    //           />
    //         </Card>
    //       )}
    //       {mealToggle === "snack" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6">Snack</Typography>
    //           <Button
    //             sx={{ width: "100%", p: 1 }}
    //             variant="outlined"
    //             onClick={() => showFoodList(3)}
    //           >
    //             Add Snack
    //           </Button>
    //           <FoodLog
    //             meal={"snack"}
    //             mealID={3}
    //             mealSummary={mealSummary}
    //             showList={showList}
    //             //selectedDate={dateStr}
    //           />
    //         </Card>
    //       )}
    //     </div>
    //     <HabitGoalTracker />
    //   </Box>
    // </Box>
    <div>
      <h1 className="font-xl">Precise Food Tracker</h1>

      <Card
        title={"Calories"}
        color="#666666"
        target={`${targetCalories - 100} - ${targetCalories + 100} kcal`}
        performance={`${targetCalories - 100} - ${targetCalories + 100} kcal`}
      />

      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>
      <h1>Breakfast</h1>
      <FoodLog meal={"breakfast"} mealID={1} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(1)}>
        Add Breakfast
      </Button>
      <h1>Lunch</h1>
      <FoodLog meal={"lunch"} mealID={2} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(2)}>
        Add Lunch
      </Button>
      <h1>Dinner</h1>
      <FoodLog meal={"dinner"} mealID={4} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(4)}>
        Add Dinner
      </Button>
      <h1>Snack</h1>
      <FoodLog meal={"snack"} mealID={3} showList={showList} />
      <Button variant="outlined" onClick={() => showFoodList(3)}>
        Add Snack
      </Button>
    </div>
  );
};

export default TrackingPrecise;
