import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import TypeForm from '../components/TypeForm';
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
        {/* <NavBar />
        <h1>Tracking Page</h1>
        <TypeForm /> */}
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