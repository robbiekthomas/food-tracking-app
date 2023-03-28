import React, { useState, useEffect } from "react";

import { Button, Typography, Box, Card } from "@mui/material";

import Dialog from "@mui/material/Dialog";
import { FoodLog } from "./FoodLog";
import FoodList from "./FoodList";

import HabitGoalTracker from "./HabitGoalTracker";
import { format } from "date-fns";
import MealToggle from "./MealToggle";
//import mercury from "../assets/bg/mercury.png";

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
    <div className="flex justify-around bg-primary ">
      <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
        <FoodList
          meal={meal}
          setShowList={setShowList}
          handleClose={handleClose}
        />
      </Dialog>

      <div className="flex flex-col">
        <div
          className={`shadow-sm relative rounded-lg text-dimWhite align-center .w-1/2 px-5 pt-5 pb-5 ${gradientStyling}`}
        >
          {/* <Card
          variant="outlined"
          // sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
        > */}
          <h1>Breakfast</h1>
          <Button
            sx={{ width: "100%", p: 1 }}
            variant="outlined"
            onClick={() => showFoodList(1)}
          >
            Add Breakfast
          </Button>
          <FoodLog meal={"breakfast"} mealID={1} showList={showList} />
          {/* </Card> */}
        </div>

        <Card
          variant="outlined"
          sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
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
        </Card>

        <Card
          variant="outlined"
          sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
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
        </Card>

        <Card
          variant="outlined"
          sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
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
        </Card>
      </div>

      <div  className={`shadow-sm relative rounded-lg text-dimWhite align-center h-1/2 px-5 pt-5 pb-5 ${gradientStyling}`}>
        <HabitGoalTracker />
      </div>

      <Box
        position="fixed"
        bottom={20}
        sx={{ zIndex: 0, width: "100vw", height: "100vh" }}
      >
       
      </Box>
    </div>
  );
};

export default TrackingPrecise;
