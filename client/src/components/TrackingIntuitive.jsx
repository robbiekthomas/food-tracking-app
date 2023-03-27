import React, { useState, useEffect } from "react";
import HabitGoalTracker from "./HabitGoalTracker";
import IntuitiveList from "./IntuitiveList";
import IntuitiveLog from "./IntuitiveLog";
import MealToggle from "./MealToggle";
import { Button, Typography, Box, Card } from "@mui/material";



const TrackingIntuitive = (props) => {
  const [toggle, setToggle] = useState(false);

  const mealToggle = props.mealToggle;
  const handleToggle = props.handleToggle;




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
    //           variant="outlined"
    //           sx={{ width: 790, p: 2, m: 2, borderRadius: "16px" }}
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
    <div>
      <h1 className="font-xl">Intuitive Food Tracker</h1>
      <HabitGoalTracker />
      <h1>Breakfast</h1>
      <IntuitiveList setToggle={setToggle} mealId={1} meal={"Breakfast"} />
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"breakfast"} mealId={1} />

      <h1>Lunch</h1>
      <IntuitiveList setToggle={setToggle} mealId={2} meal={"Lunch"} />
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"lunch"} mealId={2} />

      <h1>Dinner</h1>
      <IntuitiveList setToggle={setToggle} mealId={4} meal={"Dinner"} />
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"dinner"} mealId={4} />

      <h1>Snack</h1>
      <IntuitiveList setToggle={setToggle} mealId={3} meal={"Snack"} />
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"snack"} mealId={3} />
    </div>
  );
};

export default TrackingIntuitive;
