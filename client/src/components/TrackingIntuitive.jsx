import React, { useState } from "react";
import HabitGoalTracker from "./HabitGoalTracker";
import IntuitiveList from "./IntuitiveList";
import IntuitiveLog from "./IntuitiveLog";

const TrackingIntuitive = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <h1 className="font-xl">Intuitive Food Tracker</h1>
      <HabitGoalTracker />
      <h1>Breakfast</h1>
      <IntuitiveList  setToggle={setToggle} mealId={1} meal={"Breakfast"}/>
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"breakfast"} mealId={1}/>

      <h1>Lunch</h1>
      <IntuitiveList setToggle={setToggle} mealId={2} meal={"Lunch"}/>
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"lunch"} mealId={2}/>

      <h1>Dinner</h1>
      <IntuitiveList setToggle={setToggle} mealId={4} meal={"Dinner"}/>
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"dinner"} mealId={4}/>

      <h1>Snack</h1>
      <IntuitiveList setToggle={setToggle} mealId={3} meal={"Snack"}/>
      <IntuitiveLog toggle={toggle} setToggle={setToggle} meal={"snack"} mealId={3}/>
    </div>
  );
};

export default TrackingIntuitive;
