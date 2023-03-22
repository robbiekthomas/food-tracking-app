import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'



import FoodList from '../components/FoodList';
import FoodTracker from '../components/FoodTracker';
import TrackingIntuitive from '../components/TrackingIntuitive';
import TrackingStandard from '../components/TrackingStandard';
import TrackingPrecise from '../components/TrackingPrecise';
import { useModeContext } from "../contexts/mode-status";

const TrackingPage = () => {
  const [showList, setShowList] = useState(false);
  const [meal, setMeal] = useState('');
  const { mode, setMode } = useModeContext();
  useEffect(() => {}, [mode])
  
  const showFoodList = (mealTime) => {
    setShowList(!showList)
    setMeal(mealTime)
  }
  console.log("meal", meal)




  return (
    <div>
    {mode === 'precise' && <TrackingPrecise/>}
    {mode === 'intuitive' && <TrackingIntuitive/>}
    {mode === 'standard' && <TrackingStandard/>}
    


        <h1>Tracking Page</h1>
        {showList && (<FoodList 
          onChange={showFoodList}
        />)}
        <FoodTracker 
          onChange={showFoodList}
          meal={meal}
        />
    </div>
  )
}

export default TrackingPage