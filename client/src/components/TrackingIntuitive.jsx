import React, { useState, useEffect } from "react";
import HabitGoalTracker from "./HabitGoalTracker";
import IntuitiveList from "./IntuitiveList";
import IntuitiveLog from "./IntuitiveLog";
import MealToggle from "./MealToggle";
import { Button, Typography, Box, Card } from "@mui/material";

const TrackingIntuitive = ({ mealToggle, setMealToggle }) => {
  const [toggle, setToggle] = useState(false);

  const gradientStyling =
    "bg-gradient-to-r from-[#f8fafc]/[0.01] via-[#f8fafc]/[0.1] to-[#f8fafc]/[0.01] border-t-2 border-b-2 border-[#f8fafc]/[0.2] z-10";
  return (
    // <div>

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
    //     <div>
    //       <div className="ml-4">
    //         <MealToggle mealToggle handleToggle={handleToggle} />
    //       </div>

    //       {mealToggle === "breakfast" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6" gutterBottom >Breakfast</Typography>

    //           <IntuitiveList
    //             setToggle={setToggle}
    //             mealId={1}
    //             meal={"Breakfast"}
    //           />
    //           <IntuitiveLog
    //             toggle={toggle}
    //             setToggle={setToggle}
    //             meal={"breakfast"}
    //             mealId={1}
    //           />
    //         </Card>
    //       )}

    //       {mealToggle === "lunch" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6" gutterBottom>
    //             Lunch
    //           </Typography>

    //           <IntuitiveList setToggle={setToggle} mealId={2} meal={"Lunch"} />
    //           <IntuitiveLog
    //             toggle={toggle}
    //             setToggle={setToggle}
    //             meal={"lunch"}
    //             mealId={2}
    //           />
    //         </Card>
    //       )}
    //       {mealToggle === "dinner" && (
    //         <Card
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
    //         >
    //           <Typography variant="h6" gutterBottom>
    //             Dinner
    //           </Typography>

    //           <IntuitiveList setToggle={setToggle} mealId={4} meal={"Dinner"} />
    //           <IntuitiveLog
    //             toggle={toggle}
    //             setToggle={setToggle}
    //             meal={"dinner"}
    //             mealId={4}
    //           />
    //         </Card>
    //       )}
    //       {mealToggle === "snack" && (
    //         <Card
    //           variant="outlined"{mealToggle === "breakfast" && (dius: "16px" }}
    //         >
    //           <Typography variant="h6" gutterBottom>
    //             Snack
    //           </Typography>

    //           <IntuitiveList setToggle={setToggle} mealId={3} meal={"Snack"} />
    //           <IntuitiveLog
    //             toggle={toggle}
    //             setToggle={setToggle}
    //             meal={"snack"}
    //             mealId={3}
    //           />
    //         </Card>
    //       )}
    //     </div>

    //     <HabitGoalTracker />
    //   </Box>
    // </div>
    <div className="flex justify-around bg-primary ">
      <h1 className="font-xl">Intuitive Food Tracker</h1>

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
            <IntuitiveList setToggle={setToggle} mealId={2} meal={"Lunch"} />
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
            <IntuitiveList setToggle={setToggle} mealId={4} meal={"Dinner"} />
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
            <IntuitiveList setToggle={setToggle} mealId={3} meal={"Snack"} />
          </div>
        )}
      </div>

      <HabitGoalTracker />
    </div>
  );
};

export default TrackingIntuitive;
