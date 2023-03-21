import React, { useState } from 'react'
import NavBar from '../components/NavBar'

import FoodList from '../components/FoodList';
import FoodTracker from '../components/FoodTracker';

const TrackingPage = () => {
  const [showList, setShowList] = useState(false);
  const [meal, setMeal] = useState('');
  
  const showFoodList = (mealTime) => {
    setShowList(!showList)
    setMeal(mealTime)
  }
  console.log("meal", meal)
  return (
    <div>

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