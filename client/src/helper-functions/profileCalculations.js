import { useState } from "react";
import ToggleButton from "./elements/ToggleButton";



function ProfileForm(props) {
  const [goal, setGoal] = useState('');
  const [startingWeight, setStartingWeight] = useState();
  const [startDate, setStartDate] = useState();
  const [sex, setSex] = useState('');
  const [waistMeasurement, setWaistMeasurement] = useState(0);
  const [neckMeasurement, setNeckMeasurement] = useState(0);
  const [hipMeasurement, setHipMeasurement] = useState(0);
  const [height, setHeight] = useState(0);
  const [toggleBF, setToggleBF] = useState(false);
  const [bodyFat, setBodyFat] = useState(0);
  const [toggleWCC, setToggleWCC] = useState(false);
  const [targetWeightChange, setTargetWeightChange] = useState(0);

  const handleStartDate = (e) => setStartDate(e.target.value);
  const handleStartingWeight = (e) => setStartingWeight(Number(e.target.value));
  const handleSexSelection = (e) => setSex(e.target.value);
  const handleWaistMeasurementChange = (e) => setWaistMeasurement(Number(e.target.value));
  const handleNeckMeasurementChange = (e) => setNeckMeasurement(Number(e.target.value));
  const handleHipMeasurementChange = (e) => setHipMeasurement(Number(e.target.value));
  const handleHeightChange = (e) => setHeight(Number(e.target.value));
  const handleBodyFatChange = (e) => setBodyFat(Number(e.target.value));
  const handleGoal = (e) => setGoal(e.target.value);
  const handleWeightChangeTarget = (e) => setTargetWeightChange(Number(e.target.value));


  const toggleBodyFatCalculator = () => {
    toggleBF ? setToggleBF(false) : setToggleBF(true);
  };

  const toggleWeightChangeCalculator = () => {
    toggleWCC ? setToggleWCC(false) : setToggleWCC(true);
  };


  const bodyFatPercentage = () => {
    if (sex === "Male") {
      const result = Math.round(86.01 * Math.log10((waistMeasurement - neckMeasurement) * 2.54) - 70.041 * Math.log10(height * 2.54) + 30.3);
      if (result === Infinity || !result) return;
      return result;
    }

    if (sex === "Female" || sex === "Prefer not to say") {
      const result = Math.round(495 / (1.29579 - 0.35004 * Math.log10((waistMeasurement + hipMeasurement - neckMeasurement) * 2.54) + 0.221 * Math.log10(height * 2.54)) - 450);
      if (result === Infinity || !result || result <= 0) return;
      return result;
    }
  }

  const calculateTargetWeightChange = () => {
    if(!bodyFat || !startingWeight || !goal || !sex) return;

    if(goal === "Maintain") return 0;

    if(sex === "Male") {
      if(goal === "Lose Fat") {
        if (bodyFat >= 15) return Math.round(startingWeight * -0.007 * 10) /10;
        if (bodyFat >= 12) return Math.round(startingWeight * -0.005 * 10) /10;
        if (bodyFat < 12) return Math.round(startingWeight * -0.003 * 10) /10;
      }
      if(goal === "Build Muscle") {
        if (bodyFat >= 20) return Math.round(startingWeight * -0.007 * 10) /10;
        return Math.round(startingWeight * 0.0025 * 10) /10;
      }
    };

    if(sex === "Female" || sex === "Prefer not to say") {
      if(goal === "Lose Fat") {
        if (bodyFat >= 25) return Math.round(startingWeight * -0.007 * 10) /10;
        if (bodyFat >= 22) return Math.round(startingWeight * -0.005 * 10) /10;
        if (bodyFat < 22) return Math.round(startingWeight * -0.003 * 10) /10;
      }
      if(goal === "Build Muscle") {
        if (bodyFat >= 30) return Math.round(startingWeight * -0.007 * 10) /10;
        return Math.round(startingWeight * 0.0025 * 10) /10;
      }
    }

    return "err";
  }

  const handleProfileUpdates = (e) => {
    e.preventDefault();
    const user = {
      goal,
      startingWeight,
      startDate,
      sex,
      waistMeasurement,
      hipMeasurement,
      neckMeasurement,
      height,
      toggleBF,
      bodyFat,
      toggleWCC,
      targetWeightChange
    }

    props.func(user)
  }

  return (
    <div className="profile-form-container">
      <h1>Update Profile</h1>

      <form className="profile-form">
        <label>Main Goal</label>
        <select onChange={handleGoal}>
          <option value="" selected disabled hidden>select goal</option>
          <option value={"Lose Fat"}>Lose Fat</option>
          <option value={"Build Muscle"}>Build Muscle</option>
          <option value={"Maintain"}>Maintain</option>
        </select>
        <label>Starting Weight</label>
        <input type="number" min={0} onChange={handleStartingWeight} />
        <label>Start Date</label>
        <input type="date" onChange={handleStartDate} />
        <label>Sex</label>
        <select onChange={handleSexSelection}>
          <option value="" selected disabled hidden>select sex</option>
          <option value={"Female"}>Female</option>
          <option value={"Male"}>Male</option>
          <option value={"Prefer not to say"}>Prefer not to say</option>
        </select>
        <h4>Body Fat Percentage</h4>
        <ToggleButton id="showBodyFatCalculator" label="Enable Calculations" toggleBodyFatCalculator={toggleBodyFatCalculator} />
        {toggleBF && (
          <>
            <label>Waist Circumference</label>
            <input type="number" onChange={handleWaistMeasurementChange} />
            <label>Neck Circumference</label>
            <input type="number" onChange={handleNeckMeasurementChange} />
            {sex !== "Male" && (
              <>
                <label>Hip Circumference</label>
                <input type="number" onChange={handleHipMeasurementChange} />
              </>
            )}
            <label>Height</label>
            <input type="number" onChange={handleHeightChange} />
            <h1>{bodyFatPercentage()}</h1>
          </>
        )}
        {!toggleBF && (
          <>
            <div className="form-container-bf-item">
              <label>Estimated Body Fat (%)</label>
              <input type="number" onChange={handleBodyFatChange} />
            </div>
          </>
        )}
        <h4>Target Weight Change</h4>
        <ToggleButton id="toggleWeightChangeCalculator" label="Enable Calculations" toggleWeightChangeCalculator={toggleWeightChangeCalculator} />
        {toggleWCC && (
            <div className="form-container-bf-item">
              <label>Estimated Weight Change</label>
              <h1>{calculateTargetWeightChange()}</h1>
            </div>
          )}
          {!toggleWCC && (
            <div className="form-container-bf-item">
              <label>Estimated Weight Change</label>
              <input type = "number" onChange = {handleWeightChangeTarget}></input>
            </div>
          )}
          <button onClick={handleProfileUpdates}>Save Changes</button>
      </form>
    </div>
  );
}

export default ProfileForm;
