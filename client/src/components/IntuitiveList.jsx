import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import axios from "axios";

const IntuitiveList = (props) => {
  const [hungerBefore, setHungerBefore] = useState();
  const [hungerAfter, setHungerAfter] = useState();
  const [feelingAfter, setFeelingAfter] = useState();
  const [open, setOpen] = useState(false);
  
  const setToggle = props.setToggle;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleHungerBeforeChange = (event) => {
    setHungerBefore(event.target.value);
  };

  const handleHungerAfterChange = (event) => {
    setHungerAfter(event.target.value);
  };

  const handleFeelingChange = (event) => {
    setFeelingAfter(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(hungerBefore, hungerAfter, feelingAfter);
    setOpen(false);
    setToggle(prev => !prev);
    const values = [hungerBefore, hungerAfter, feelingAfter, props.mealId, 1];

    axios
      .post("http://localhost:8000/api/tracker/intuitive/", values)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
       <Button variant="outlined" onClick={handleClickOpen}>
        How was {props.meal}?
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {props.meal} Log</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How hungry were you before and after the meal?
          </DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="hunger-before-label">Before</InputLabel>
            <Select
              labelId="hungerScore"
              id="hunger-before"
              value={hungerBefore}
              label="hungerBefore"
              onChange={handleHungerBeforeChange}
              sx={{ width: "150px" }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="hunger-after-label">After</InputLabel>
            <Select
              labelId="hungerScore"
              id="hunger-after"
              value={hungerAfter}
              label="hungerAfter"
              onChange={handleHungerAfterChange}
              sx={{ width: "150px" }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
            </Select>
          </FormControl>
          <DialogContentText>How do you feel after the meal?</DialogContentText>
          <FormControl fullWidth>
            <InputLabel id="feeling-after-label">Feeling After</InputLabel>
            <Select
              labelId="feelingScore"
              id="feeling-after"
              value={feelingAfter}
              label="feelingAfter"
              onChange={handleFeelingChange}
              sx={{ width: "150px" }}
            >
              <MenuItem value={"Energized and Satisfied"}>
                Energized and Satisfied
              </MenuItem>
              <MenuItem value={"Happy and Comforted"}>
                Happy and Comforted
              </MenuItem>
              <MenuItem value={"Neutral"}>Neutral</MenuItem>
              <MenuItem value={"Lethargic, Bloated or Swollen"}>
                Lethargic, Bloated or Swollen
              </MenuItem>
              <MenuItem value={"About to Puke"}>About to Puke</MenuItem>
              <MenuItem value={"Sad and Feeling Like a Failure"}>
                Sad and Feeling Like a Failure
              </MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IntuitiveList;
