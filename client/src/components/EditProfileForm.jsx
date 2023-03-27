import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Modal,
  Box,
  Typography,
  Slider,
  TextField,
  InputLabel,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Avatar,
} from "@mui/material";
import { createHabitGridData } from "../data/chartData";
import SwitchElement from "./FormElements/Switch";
import {
  bodyFatCalcHelper,
  targetWeightChangeHelper,
} from "../helper-functions/profileCalculations";

import { habitsList } from "../data/chartData";

//modal input states
const EditProfileForm = ({
  inputs,
  change,
  currentHabits,
  setCurrentHabits,
}) => {
  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal input states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [sex, setSex] = useState("");
  const [mainGoal, setMainGoal] = useState("");
  const [toggleBF, setToggleBF] = useState(false);
  const [waistMeasurement, setWaistMeasurement] = useState(0);
  const [neckMeasurement, setNeckMeasurement] = useState(0);
  const [hipMeasurement, setHipMeasurement] = useState(0);
  const [height, setHeight] = useState(0);
  const [manualBodyFat, setManualBodyFat] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [toggleWCC, setToggleWCC] = useState(true);
  const [targetWeightChange, setTargetWeightChange] = useState(0);
  const [goal1, setGoal1] = useState(currentHabits[0]);
  const [goal2, setGoal2] = useState(currentHabits[1]);
  const [goal3, setGoal3] = useState(currentHabits[2]);

  //handle input changes
  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onBirthdateChange = (e) => setBirthdate(e.target.value);
  const onManualBodyFatChange = (e) => setManualBodyFat(Number(e.target.value));
  const onCurrentWeightChange = (e) => setCurrentWeight(e.target.value);
  const onMaingoalChange = (e) => setMainGoal(e.target.value);
  const onSexChange = (e) => setSex(e.target.value);
  const onWaistMeasurementChange = (e) => setWaistMeasurement(e.target.value);
  const onNeckMeasurementChange = (e) => setNeckMeasurement(e.target.value);
  const onHipMeasurementChange = (e) => setHipMeasurement(e.target.value);
  const onHeightChange = (e) => setHeight(e.target.value);
  const onManualTargetWeightChange = (e) =>
    setTargetWeightChange(e.target.value);

  //update habit goals on the dashboard view
  const onGoal1Change = (e) => {
    const g = {
      goal_number: 1,
      is_complete: false,
      goal_name: e.target.value,
      date: "2024-03-09",
    };
    setGoal1(g);

    const d = createHabitGridData(g, goal2, goal3);
    setCurrentHabits(d);
  };

  const onGoal2Change = (e) => {
    const g = {
      goal_number: 2,
      is_complete: false,
      goal_name: e.target.value,
      date: "2024-03-09",
    };
    setGoal2(g);

    const d = createHabitGridData(goal1, g, goal3);
    setCurrentHabits(d);
  };

  const onGoal3Change = (e) => {
    const g = {
      goal_number: 3,
      is_complete: false,
      goal_name: e.target.value,
      date: "2024-03-09",
    };
    setGoal3(g);

    const d = createHabitGridData(goal1, goal2, g);
    setCurrentHabits(d);
  };

  //enable/disable bf calculations
  const toggleBodyFatCalculator = () => {
    toggleBF ? setToggleBF(false) : setToggleBF(true);
  };

  //enable/disable weight change calculation
  const toggleWeightChangeCalculator = () => {
    toggleWCC ? setToggleWCC(false) : setToggleWCC(true);
  };

  //calculate body fat upon form submission (callback fn)
  const calculateBodyFat = (sx, wa, ne, he, hi) => {
    if (sx === "male") {
      const bf = bodyFatCalcHelper(sx, wa, ne, he);
      return bf;
    } else {
      const bf = bodyFatCalcHelper(sx, wa, ne, he, hi);
      return bf;
    }
  };

  //check inputs bufore updating db
  const validateSubmission = () => {
    const newName = name || inputs.name;
    const newEmail = email || inputs.email;
    const newBirthdate = birthdate || inputs.birthdate;
    const newSex = sex || inputs.sex;
    const newToggleBF = toggleBF;
    const newMainGoal = mainGoal || inputs.main_goal;
    const newWaistMeasurement = waistMeasurement || inputs.waist_circumference;
    const newHipMeasurement = hipMeasurement || inputs.hip_circumference;
    const newNeckMeasurement = neckMeasurement || inputs.neck_circumference;
    const newHeight = height || inputs.height;
    const newCurrentWeight = currentWeight || inputs.weight;
    const newToggleWCC = toggleWCC;

    const newBodyFat = () => {
      if (!newToggleBF) {
        return manualBodyFat || inputs.body_fat_percentage;
      }

      if (newToggleBF) {
        if (
          newSex !== "male" &&
          (!newHipMeasurement,
          !newWaistMeasurement || !newNeckMeasurement || !newHeight)
        ) {
          return null;
        }

        if (
          newSex === "male" &&
          (!newWaistMeasurement || !newNeckMeasurement || !newHeight)
        ) {
          return null;
        }

        const bf = calculateBodyFat(
          newSex,
          newWaistMeasurement,
          newNeckMeasurement,
          newHeight,
          newHipMeasurement
        );
        return bf || inputs.body_fat_percentage;
      }
    };

    const newWeightChangeTarget = () => {
      if (!newToggleWCC) {
        return Number(targetWeightChange) || inputs.weight_change_goal;
      } else if (newToggleWCC) {
        if (!newBodyFat || !newCurrentWeight || !newMainGoal || !newSex) {
          return null;
        }
        const wc = targetWeightChangeHelper(
          newBodyFat(),
          newCurrentWeight,
          newMainGoal,
          newSex
        );
        return Number(wc) || inputs.weight_change_goal;
      }
    };

    //official values for db update
    const submissionValues = {
      ...inputs,
      id: 1,
      name: newName,
      email: newEmail,
      birthdate: newBirthdate,
      sex: newSex,
      enable_body_fat_calculation: newToggleBF,
      main_goal: newMainGoal,
      waist_circumference: newWaistMeasurement,
      hip_circumference: newHipMeasurement,
      neck_circumference: newNeckMeasurement,
      height: newHeight,
      body_fat_percentage: newBodyFat(),
      weight: newCurrentWeight,
      enable_weight_change_calculation: newToggleWCC,
      weight_change_goal: newWeightChangeTarget(),
    };

    change(submissionValues);

    updateDatabase(submissionValues, currentHabits);
  };

  //post updates -> server -> db
  const updateDatabase = (values, habits) => {
    handleClose();

    const urlUser = "http://localhost:8000/api/dashboard/user/insert";
    const urlHabits = "http://localhost:8000/api/dashboard/habitGoals/insert";

    axios
      .all([axios.post(urlUser, values), axios.post(urlHabits, habits)])
      .then((res) => {
        console.log("res", res);
      })

      .catch((err) => {
        console.log(err);
      });
  };

  //styles for modal
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "#1a1721",
    border: "2px solid rgba(128, 128, 128, 0.5)",
    borderRadius: "40px",
    boxShadow: 24,

    p: 4,
  };

  return (
    <div className="mt-2">
      <Button sx={{ border: "solid" }} onClick={handleOpen}>
        <span className="text-right text-white material-symbols-outlined">
          EDIT PROFILE
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="h-5/6 overflow-auto" sx={modalStyle}>
          <Typography
            sx={{ width: "100%" }}
            className="text-center text-white"
            id="modal-modal-title"
            variant="h4"
          >
            Profile Settings
          </Typography>

          <h2 className="mt-5 text-center font-bold text-white text-xl">
            General Account Information
          </h2>

          {/**NAME */}
          <div className="flex items-center">
            <InputLabel
              sx={{ fontWeight: "medium", width: "20%" }}
              className="mt-3"
            >
              Full Name
            </InputLabel>
            <TextField
              margin="normal"
              defaultValue={inputs.name}
              sx={{
                width: "80%",
                bgcolor: "#363042",
                borderRadius: "5px",
              }}
              size="small"
              name="name"
              type="text"
              onChange={(e) => onNameChange(e)}
            />
          </div>

          {/**EMAIL */}
          <div className="flex items-center">
            <InputLabel
              sx={{ fontWeight: "medium", width: "20%" }}
              className="mt-3"
            >
              Email
            </InputLabel>
            <TextField
              sx={{ width: "80%", bgcolor: "#363042", borderRadius: "5px" }}
              margin="normal"
              size="small"
              name="email"
              type="email"
              onChange={(e) => onEmailChange(e)}
              defaultValue={inputs.email}
            />
          </div>

          {/**BIRTHDAY */}
          <div className="flex items-center">
            <InputLabel
              sx={{ fontWeight: "medium", width: "20%" }}
              className="mt-3"
            >
              Birthdate
            </InputLabel>
            <TextField
              sx={{
                width: "80%",
                bgcolor: "#363042",
                borderRadius: "5px",
              }}
              margin="normal"
              size="small"
              name="birthdate"
              type="date"
              onChange={(e) => onBirthdateChange(e)}
            />
          </div>

          {/**SEX */}
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{
                fontWeight: "medium",
              }}
              color="primary"
              className="mt-5"
            >
              Sex
            </FormLabel>

            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={inputs.sex}
              name="radio-buttons-group"
              onChange={(e) => onSexChange(e)}
              sx={{ color: "white" }}
            >
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
          <br />

          <h2 className="mt-10 text-center font-bold text-white text-xl">
            Goal Settings
          </h2>

          {/**MAIN GOAL */}
          <FormControl>
            <FormLabel
              sx={{ fontWeight: "medium" }}
              id="demo-radio-buttons-group-label"
              className="mt-5"
            >
              Main Goal
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              onChange={(e) => onMaingoalChange(e)}
              defaultValue={inputs.main_goal}
              sx={{ color: "white" }}
            >
              <FormControlLabel
                value="maintain"
                control={<Radio />}
                label="Maintain"
              />
              <FormControlLabel
                value="loseFat"
                control={<Radio />}
                label="Lose Fat"
              />
              <FormControlLabel
                value="buildMuscle"
                control={<Radio />}
                label="Build Muscle"
              />
            </RadioGroup>
          </FormControl>

          {/**habit goals */}
          <div className="flex items-center  mt-5">
            <InputLabel
              sx={{ fontWeight: "medium", width: "30%" }}
              className="mt-3"
            >
              First Goal
            </InputLabel>
            <Select
              sx={{
                width: "70%",
                bgcolor: "#363042",
                borderRadius: "20px",
                ".Mui-focused": {
                  borderRadius: "20px",
                },
              }}
              margin="normal"
              size="small"
              onChange={(e) => onGoal1Change(e)}
              defaultValue={currentHabits[0].goal_name}
            >
              {habitsList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                  sx={{
                    bgcolor: "#363042",
                  }}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center mt-5">
            <InputLabel
              sx={{ fontWeight: "medium", width: "30%" }}
              className="mt-3"
            >
              Second Goal
            </InputLabel>
            <Select
              margin="normal"
              sx={{
                width: "70%",
                bgcolor: "#363042",
                borderRadius: "20px",
                ".Mui-focused": {
                  borderRadius: "20px",
                },
              }}
              size="small"
              onChange={(e) => onGoal2Change(e)}
              defaultValue={currentHabits[1].goal_name}
            >
              {habitsList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>

          <div className="flex items-center  mt-5">
            <InputLabel
              sx={{ fontWeight: "medium", width: "30%" }}
              className="mt-3"
            >
              Third Goal
            </InputLabel>
            <Select
              sx={{
                width: "70%",
                bgcolor: "#363042",
                borderRadius: "20px",
                ".Mui-focused": {
                  borderRadius: "20px",
                },
              }}
              margin="normal"
              size="small"
              onChange={(e) => onGoal3Change(e)}
              defaultValue={currentHabits[2].goal_name}
            >
              {habitsList.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </div>

          <h2 className="mt-10 text-center font-bold text-white text-xl">
            Body Fat
          </h2>

          {/**Enable calculations */}
          <InputLabel sx={{ fontWeight: "medium" }} className="mt-3">
            Body Fat
          </InputLabel>
          <SwitchElement
            label="enable calculations"
            checked={toggleBF}
            onChange={toggleBodyFatCalculator}
          />
          {toggleBF && (
            <>
              {/**height */}
              <div className="flex items-center">
                <InputLabel
                  sx={{ fontWeight: "medium", width: "40%" }}
                  className="mt-3"
                >
                  Height (cm)
                </InputLabel>
                <TextField
                  sx={{
                    width: "60%",
                    bgcolor: "#363042",
                    borderRadius: "5px",
                  }}
                  margin="normal"
                  size="small"
                  name="height"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onHeightChange(e)}
                  defaultValue={inputs.height}
                />
              </div>

              <div className="flex items-center">
                {/**waist */}
                <InputLabel
                  sx={{ fontWeight: "medium", width: "40%" }}
                  className="mt-3"
                >
                  Waist Circumference (cm)
                </InputLabel>
                <TextField
                  sx={{
                    width: "60%",
                    bgcolor: "#363042",
                    borderRadius: "5px",
                  }}
                  margin="normal"
                  defaultValue={inputs.waist_circumference}
                  size="small"
                  name="waist"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onWaistMeasurementChange(e)}
                />
              </div>
              {/**neck calculations */}
              <div className="flex items-center">
                <InputLabel
                  sx={{ fontWeight: "medium", width: "40%" }}
                  className="mt-3"
                >
                  Neck Circumference (cm)
                </InputLabel>
                <TextField
                  margin="normal"
                  sx={{
                    width: "60%",
                    bgcolor: "#363042",
                    borderRadius: "5px",
                  }}
                  defaultValue={inputs.neck_circumference}
                  size="small"
                  name="neck"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onNeckMeasurementChange(e)}
                />
              </div>

              {/**hip calculations */}
              {sex !== "Male" && (
                <div className="flex items-center">
                  <InputLabel
                    sx={{ fontWeight: "medium", width: "40%" }}
                    className="mt-3"
                  >
                    Hip Circumference (cm)
                  </InputLabel>
                  <TextField
                    margin="normal"
                    sx={{
                      width: "60%",
                      bgcolor: "#363042",
                      borderRadius: "5px",
                    }}
                    defaultValue={inputs.hip_circumference}
                    name="hips"
                    size="small"
                    type="number"
                    InputProps={{ inputProps: { min: 0 } }}
                    onChange={(e) => onHipMeasurementChange(e)}
                  />
                </div>
              )}
            </>
          )}

          {/**body fat estimate */}
          {!toggleBF && (
            <div className="flex items-center">
              <InputLabel
                sx={{ fontWeight: "medium", width: "30%" }}
                className="mt-3"
              >
                Body Fat %
              </InputLabel>
              <TextField
                margin="normal"
                sx={{ width: "70%", bgcolor: "#363042", borderRadius: "5px" }}
                defaultValue={inputs.body_fat_percentage}
                name="bodyFat"
                size="small"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                onChange={(e) => onManualBodyFatChange(e)}
              />
            </div>
          )}

          {/**weight */}
          <h2 className="mt-10 text-center font-bold text-white text-xl">
            Weight
          </h2>

          <div className="flex items-center">
            <InputLabel
              sx={{ fontWeight: "medium", width: "30%" }}
              className="mt-3"
            >
              Current Weight (lbs)
            </InputLabel>
            <TextField
              margin="normal"
              sx={{ width: "70%", bgcolor: "#363042", borderRadius: "5px" }}
              size="small"
              name="weight"
              type="number"
              InputProps={{ inputProps: { min: -2, max: 2 } }}
              onChange={(e) => onCurrentWeightChange(e)}
              defaultValue={inputs.weight}
            />
          </div>
          <InputLabel className="mt-5">Weekly Weight Change Goal</InputLabel>
          <SwitchElement
            label="enable calculations"
            checked={toggleWCC}
            onChange={toggleWeightChangeCalculator}
          />
          <br />

          {toggleWCC && (
            <h3 className="text-white">Estimated Target: {"todo"}</h3>
          )}
          {!toggleWCC && (
            <>
              <InputLabel sx={{ fontWeight: "medium" }}>
                Weight Change Goal (lbs / week)
              </InputLabel>
              <Slider
                sx={{ color: "#73658f" }}
                margin="normal"
                aria-label="Custom marks"
                defaultValue={inputs.weight_change_goal}
                step={0.5}
                marks
                min={-2}
                max={2}
                valueLabelDisplay="auto"
                onChange={(e) => onManualTargetWeightChange(e)}
              />

              <TextField
                sx={{ bgcolor: "#363042", borderRadius: "5px" }}
                margin="normal"
                halfWidth
                defaultValue={inputs.weight_change_goal}
                size="small"
                name="weightTarget"
                type="number"
                InputProps={{ inputProps: { min: -2, max: 2 } }}
                onChange={(e) => onManualTargetWeightChange(e)}
              />
            </>
          )}
          <br />

          <Button
            className="mt-5"
            variant="contained"
            onClick={validateSubmission}
          >
            Save Changes
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default EditProfileForm;
