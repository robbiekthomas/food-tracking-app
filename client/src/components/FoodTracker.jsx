import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";
import { FoodLog } from './FoodLog';
import FoodList from './FoodList';

const FoodTracker = (props) => {

  const [meal, setMeal] = useState('');
  const [showList, setShowList] = useState(false);
  
  const showFoodList = (mealID) => {
    setShowList(true);
    setMeal(mealID);
  }

  return (
    <div>
      <h1>Food Tracker</h1>
      
      {showList && <FoodList meal={meal} setShowList={setShowList}/>}
      <Button onClick={() => showFoodList(1)}>Add Breakfast</Button>
      
      <FoodLog meal={"breakfast"} showList={showList}/>
      <Button onClick={() => showFoodList(2)}>Add Lunch</Button>
      <FoodLog meal={"lunch"} showList={showList}/>
      <Button onClick={() => showFoodList(4)}>Add Dinner</Button>
      <FoodLog meal={"dinner"} showList={showList}/>
      <Button onClick={() => showFoodList(3)}>Add Snack</Button>
      <FoodLog meal={"snack"} showList={showList}/>
      <GridComponent 
      >


      </GridComponent>
    </div>
  )
}

export default FoodTracker