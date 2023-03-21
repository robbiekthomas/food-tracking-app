import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { OutlinedInput, Chip, Modal, Box, Typography, TextField, InputLabel, Button, Select, MenuItem, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { createHabitGridData } from '../data/chartData';
import SwitchElement from './FormElements/Switch';
import { bodyFatCalcHelper, targetWeightChangeHelper } from '../helper-functions/profileCalculations';
import { Stacked } from '../components';
import { habitsList } from '../data/chartData';
import { useTheme } from '@mui/material/styles';



//modal input states
const EditProfileForm = ({ inputs, change, currentHabits, setCurrentHabits }) => {
  //modal state
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //modal input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [sex, setSex] = useState('');
  const [mainGoal, setMainGoal] = useState('');
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
  const onManualTargetWeightChange = (e) => setTargetWeightChange(e.target.value)
  const onGoal1Change = (e) => {
    const g = { goal_id: 1, is_complete: false, goal_name: e.target.value, date: '2024-03-09' };
    setGoal1(g)
        const d = createHabitGridData(g, goal2, goal3);
        setCurrentHabits(d);
  }
  const onGoal2Change = (e) => {
    const g = { goal_id: 2, is_complete: false, goal_name: e.target.value, date: '2024-03-09' };
    setGoal2(g)
        const d = createHabitGridData(goal1, g, goal3);
        setCurrentHabits(d);
  }

  const onGoal3Change = (e) => {
    const g = { goal_id: 3, is_complete: false, goal_name: e.target.value, date: '2024-03-09' };
    setGoal2(g)
        const d = createHabitGridData(goal1, goal2, g);
        setCurrentHabits(d);
  }

  //enable/disable bf calculations
  const toggleBodyFatCalculator = () => {
    toggleBF ? setToggleBF(false) : setToggleBF(true);
  };

  //enable/disable weight change calculation
  const toggleWeightChangeCalculator = () => {
    toggleWCC ? setToggleWCC(false) : setToggleWCC(true);
  };

  //calculate body fat upon form submission
  const calculateBodyFat = (sx, wa, ne, he, hi) => {

    if (sx === 'male') {
      const bf = bodyFatCalcHelper(sx, wa, ne, he);
      return bf;

    } else {
      const bf = bodyFatCalcHelper(sx, wa, ne, he, hi);
      return bf;
    };

  };





  //check inputs bufore updating db
  const validateSubmission = () => {
    //submission variables for habitGoals
    //const newHabitGoals = habitGoals || goal1.habitGoal1;
    //submission variables for users and userDetails
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
      };

      if (newToggleBF) {
        if (newSex !== 'male' && (!newHipMeasurement, !newWaistMeasurement || !newNeckMeasurement || !newHeight)) {
          return null;
        };

        if (newSex === 'male' && (!newWaistMeasurement || !newNeckMeasurement || !newHeight)) {
          return null;
        };

        const bf = calculateBodyFat(newSex, newWaistMeasurement, newNeckMeasurement, newHeight, newHipMeasurement);
        return bf || inputs.body_fat_percentage;
      };
    };



    const newWeightChangeTarget = () => {

      if (!newToggleWCC) {
        return Number(targetWeightChange) || inputs.weight_change_goal;

      } else if (newToggleWCC) {
        if (!newBodyFat || !newCurrentWeight || !newMainGoal || !newSex) {
          return null;
        };
        const wc = targetWeightChangeHelper(newBodyFat(), newCurrentWeight, newMainGoal, newSex);
        return Number(wc) || inputs.weight_change_goal;

      };

    };

    //official values for db update
    const submissionValues = ({
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
    });

    change(submissionValues);
    updateDatabase(submissionValues);

  };


  //post updates -> server -> db
  const updateDatabase = (values) => {
    handleClose();
    const url = 'http://localhost:8000/api/dashboard/user/insert';
    axios.post(url, values)
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });

  };

  //styles for modal
  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  //style multiple select chip material ui component

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <div>
      <div>
        <Button onClick={handleOpen}>Edit Profile</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className='h-5/6 overflow-auto' sx={modalStyle}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Profile Settings
            </Typography>
            <h2>General Account Information</h2>
            <InputLabel>Name</InputLabel>
            <TextField
              name='name'
              type='text'
              onChange={(e) => onNameChange(e)}
              placeholder={inputs.name}
            />
            <br />

            <InputLabel>Email</InputLabel>
            <TextField
              name='email'
              type='email'
              onChange={(e) => onEmailChange(e)}
              placeholder={inputs.email}
            />
            <br />

            <InputLabel>Birthdate</InputLabel>
            <TextField
              name='birthdate'
              type='date'
              onChange={(e) => onBirthdateChange(e)}
            />
            <br />

            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">Sex</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={sex}
                defaultValue="other"
                name="radio-buttons-group"
                onChange={(e) => onSexChange(e)}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>
            <br />

            <h2>Goal Settings</h2>
            <InputLabel>Main Goal</InputLabel>
            <Select
              value={mainGoal}
              onChange={(e) => onMaingoalChange(e)}
            >
              <MenuItem value={'maintain'}>Maintain</MenuItem>
              <MenuItem value={'loseFat'}>Lose Fat</MenuItem>
              <MenuItem value={'buildMuscle'}>Build Muscle</MenuItem>
            </Select>
            <br />

            {/**habit goals */}
            <InputLabel>Habit Goal One</InputLabel>
            <Select onChange={(e) => onGoal1Change(e)}>
              {habitsList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <br />

            <InputLabel>Habit Goal Two</InputLabel>
            <Select onChange={(e) => onGoal2Change(e)}>
              {habitsList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <br />

            <InputLabel>Habit Goal Three</InputLabel>
            <Select onChange={(e) => onGoal3Change(e)}>
              {habitsList.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item}
                >
                  {item}
                </MenuItem>
              ))}
            </Select>
            <br />


            <h2>Body Fat and Weight</h2>
            <InputLabel>Current Weight</InputLabel>
            <TextField
              name='weight'
              type='number'
              InputProps={{ inputProps: { min: -2, max: 2 } }}
              onChange={(e) => onCurrentWeightChange(e)}
            />
            <InputLabel>Body Fat</InputLabel>
            < SwitchElement
              label='enable calculations'
              checked={toggleBF}
              onChange={toggleBodyFatCalculator}
            />
            {toggleBF && (
              <>
                <InputLabel>Height</InputLabel>
                <TextField
                  name='height'
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onHeightChange(e)}
                />

                <InputLabel>Waist Circumference</InputLabel>
                <TextField
                  name='waist'
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onWaistMeasurementChange(e)}
                />

                <InputLabel>Neck Circumference</InputLabel>
                <TextField
                  name='neck'
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onNeckMeasurementChange(e)}
                />

                {sex !== "Male" && (
                  <>
                    <InputLabel>Hip Circumference</InputLabel>
                    <TextField
                      name='hips'
                      type='number'
                      InputProps={{ inputProps: { min: 0 } }}
                      onChange={(e) => onHipMeasurementChange(e)}
                    />
                  </>
                )}
              </>
            )}

            {!toggleBF && (
              <>
                <InputLabel>Body Fat %</InputLabel>
                <TextField
                  name='bodyFat'
                  type='number'
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={(e) => onManualBodyFatChange(e)}
                />
              </>
            )}

            <h2>Weight</h2>

            <InputLabel>Weekly Weight Change Goal</InputLabel>
            < SwitchElement
              label='enable calculations'
              checked={toggleWCC}
              onChange={toggleWeightChangeCalculator}
            />
            <br />

            {toggleWCC && (
              <h3>Estimated Target: {'toDo'}</h3>
            )}
            {!toggleWCC && (
              <>
                <InputLabel>pounds per week</InputLabel>
                <TextField
                  name='weightTarget'
                  type='number'
                  InputProps={{ inputProps: { min: -2, max: 2 } }}
                  onChange={(e) => onManualTargetWeightChange(e)}
                />
              </>
            )}
            <br />
            <Button variant="contained" onClick={validateSubmission}>Save Changes</Button>
          </Box>
        </Modal>
      </div>


    </div>
  );
};

export default EditProfileForm;
