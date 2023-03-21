import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { Button } from '@mui/material';
import Header from './Header';
import { getFoodRow } from '../api-requests/tracker';

const dummyFoodData = [
  {
    id: 1, 
    name: 'All Natural Peanut Butter', 
    grams_per_serving: 32, 
    calories: 190, 
    carbs: 6, 
    fat: 16
  },
  {
    id: 2, 
    name: 'All Purpose Flour', 
    grams_per_serving: 120, 
    calories: 455, 
    carbs: 95, 
    fat: 1
  },
  {
    "id": 3,
    "name": "Almond Butter",
    "grams_per_serving": 32,
    "calories": 190,
    "carbs": 6,
    "fat": 16,
    "protein": 8
  },
  {
    "id": 4,
    "name": "Almonds",
    "grams_per_serving": 9,
    "calories": 50,
    "carbs": 2,
    "fat": 4,
    "protein": 2
  },
  {
    "id": 5,
    "name": "Apple",
    "grams_per_serving": 182,
    "calories": 104,
    "carbs": 28,
    "fat": 0,
    "protein": 1
  },
  {
    "id": 6,
    "name": "Apple Cider Vinegar",
    "grams_per_serving": 15,
    "calories": 1,
    "carbs": 0,
    "fat": 0,
    "protein": 0
  }
]

const FoodTracker = () => {
  const [foodData, setfoodData] = useState([]);

  useEffect(() => {
    getFoodRow()
    .then((res) => {
      setfoodData(res);
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  let grid;
  let selectedrecords;
  const rowSelected = () => {
    if (grid) {
      const selectedrowindex = grid.getSelectedRowIndexes();
      selectedrecords = grid.getSelectedRecords();
      alert(selectedrowindex + " : " + JSON.stringify(selectedrecords));
    }
  }
  
  const settings = { type: 'Multiple' };

  return (
    <div>
      <h1>Food Tracker</h1>
      <GridComponent
        // id="gridcomp"
        dataSource={foodData}
        selectionSettings={settings}
        ref={g => grid = g}
        >
        <ColumnsDirective>
          <ColumnDirective field='name' width='100'/>
          <ColumnDirective field='grams_per_serving' width='90' textAlign="Right"/>
          <ColumnDirective field='calories' width='100' textAlign="Right"/>
          <ColumnDirective field='carbs' width='100' textAlign="Right"/>
          <ColumnDirective field='fat' width='100' textAlign="Right"/>
          <ColumnDirective type='checkbox' width='100' textAlign="Right"/>
        </ColumnsDirective>
      
      </GridComponent>
      {/* <Button onClick={() => {}}>Click me for API food</Button> */}
      <Button onClick={() => rowSelected()}>Select food</Button>

      <p>{selectedrecords}</p>

    </div>
  )
}

export default FoodTracker