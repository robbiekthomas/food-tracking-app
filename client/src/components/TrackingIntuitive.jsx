import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import IntuitiveList from "./IntuitiveList";
import IntuitiveLog from "./IntuitiveLog";

const TrackingIntuitive = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <h1 className="font-xl">Intuitive Food Tracker</h1>
      <h1>Breakfast</h1>
     
      <IntuitiveList  setToggle={setToggle} mealId={1} meal={"Breakfast"}/>
      <IntuitiveLog toggle={toggle} meal={"breakfast"}/>
      <h1>Lunch</h1>
      
      <IntuitiveList setToggle={setToggle} mealId={2} meal={"Lunch"}/>
      <IntuitiveLog toggle={toggle} meal={"lunch"}/>
      <h1>Dinner</h1>
      
      <IntuitiveList setToggle={setToggle} mealId={4} meal={"Dinner"}/>
      <IntuitiveLog toggle={toggle} meal={"dinner"}/>
      <h1>Snack</h1>
     
      <IntuitiveList setToggle={setToggle} mealId={3} meal={"Snack"}/>
      <IntuitiveLog toggle={toggle} meal={"snack"}/>
    </div>
  );
};

export default TrackingIntuitive;
