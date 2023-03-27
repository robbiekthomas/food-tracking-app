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
import Slider from "@mui/material/Slider";
import HungerScore from "./HungerScore";
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
    setHungerBefore(event);
    // console.log("hungerBefore", event);
  };

  const handleHungerAfterChange = (event) => {
    setHungerAfter(event);
  };

  const handleFeelingChange = (event) => {
    setFeelingAfter(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    setToggle((prev) => !prev);
    const values = [hungerBefore, hungerAfter, feelingAfter, props.mealId, 1];

    axios
      .post("http://localhost:8000/api/tracker/intuitive/", values)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Button
        sx={{ width: "100%", p: 1 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Add {props.meal}
      </Button>
      <Dialog
        PaperProps={{
          sx: {
            width: "50%",
            maxHeight: 500,
            p: 1,
          },
        }}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle> {props.meal} Log</DialogTitle>
        <DialogContent>
          <DialogContentText>
            How hungry were you before the meal?
          </DialogContentText>

          <Slider
            aria-label="hunger-before"
            defaultValue={5}
            getAriaValueText={handleHungerBeforeChange}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
          />

          <HungerScore hungerScore={hungerBefore} />

          <DialogContentText>
            How hungry were you after the meal?
          </DialogContentText>

          <Slider
            aria-label="hunger-after"
            defaultValue={5}
            getAriaValueText={handleHungerAfterChange}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={1}
            max={10}
          />

          <HungerScore hungerScore={hungerAfter} />

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
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default IntuitiveList;
