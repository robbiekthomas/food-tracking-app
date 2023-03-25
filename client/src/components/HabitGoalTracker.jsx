import React, { useEffect, useState } from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

const HabitGoalTracker = () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  const [habitGoal1, setHabitGoal1] = useState("");
  const [habitGoal2, setHabitGoal2] = useState("");
  const [habitGoal3, setHabitGoal3] = useState("");

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
    const values = [
      habitGoal1[1],
      checked1,
      habitGoal2[1],
      checked2,
      habitGoal3[1],
      checked3,
    ];

    axios
      .post("http://localhost:8000/api/tracker/habitGoals", values)
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
        // Format of habitGoal array: [habitGoals goal_name, habitGoals_log id]
        setHabitGoal1([response.data[0].goal_name, response.data[0].id]);
        setHabitGoal2([response.data[1].goal_name, response.data[1].id]);
        setHabitGoal3([response.data[2].goal_name, response.data[2].id]);

        setChecked1(response.data[0].is_complete);
        setChecked2(response.data[1].is_complete);
        setChecked3(response.data[2].is_complete);
        console.log("response", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Card variant="outlined" sx={{ width: '100%', maxWidth: 500, p: 2 }}>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Habit Tracker
        </Typography>
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
            label={habitGoal1[0]}
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
            label={habitGoal2[0]}
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
            label={habitGoal3[0]}
          />
        </FormGroup>
        <Button variant="outlined" onClick={() => handleSubmit()}>Submit</Button>
      </Card>
    </div>
  );
};

export default HabitGoalTracker;
