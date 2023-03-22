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

  return (
    <div>

        <h1>Tracking Page</h1>

        <FoodList 
          onChange={showFoodList}
          meal={meal}
        />
        {/* {showList && (<FoodList 
          onChange={showFoodList}
          meal={meal}
        />)} */}
        <FoodTracker 
          onChange={showFoodList}
          meal={meal}
        />


    </div>
  )
}

export default TrackingPage