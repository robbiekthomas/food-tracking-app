import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { Button } from "@mui/material";

const HabitGoalTracker = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [habitGoal, setHabitGoal] = useState([]);

  const handleChange1 = (event) => {
    setChecked1((prev) => !prev);
  };
  const handleChange2 = (event) => {
    setChecked2((prev) => !prev);
  };
  const handleChange3 = (event) => {
    setChecked3((prev) => !prev);
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8000/api/tracker/habitGoals", [checked1, checked2, checked3])
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/tracker/habitGoals")
      .then((response) => {
        setHabitGoal([
          response.data[0].goal_name,
          response.data[1].goal_name,
          response.data[2].goal_name,
        ]);
        setChecked1(response.data[0].is_complete);
        setChecked2(response.data[1].is_complete);
        setChecked3(response.data[2].is_complete);
        console.log("response", response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={checked1}
              inputProps={{ "aria-label": "controlled" }}
              onChange={handleChange1}
              color="secondary"
            />
          }
          label={habitGoal[0]}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked2}
              inputProps={{ "aria-label": "controlled" }}
              onChange={handleChange2}
              color="secondary"
            />
          }
          label={habitGoal[1]}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={checked3}
              inputProps={{ "aria-label": "controlled" }}
              onChange={handleChange3}
              color="secondary"
            />
          }
          label={habitGoal[2]}
        />
      </FormGroup>
      <Button onClick={() => handleSubmit()}>Submit Habit Goals</Button>
    </div>
  );
};

export default HabitGoalTracker;
