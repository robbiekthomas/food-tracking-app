import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { Button } from '@mui/material';
import Header from './Header';
import { getFoodRow } from '../api-requests/tracker';


const FoodTracker = () => {
  const [foodData, setfoodData] = useState([]);;
  const [selectedFood, setselectedFood] = useState([]);

  useEffect(() => {
    getFoodRow()
    .then((res) => {
      setfoodData(res);
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  let grid;
  let selectedrecords;
  const foodSelected = () => {
    if (grid) {;
      selectedrecords = grid.getSelectedRecords();
      setselectedFood(JSON.stringify(selectedrecords))
    }
  }
  
  console.log(selectedFood);

  const settings = { type: 'Multiple' };
  const groupOptions ={
    captionTemplate: '<span class="groupItems" style="color:blue"> ${field} - ${count} Items</span>'
  }

  return (
    <div>
      <h1>Food Tracker</h1>
      <Button onClick={() => foodSelected()}>Select food</Button>
      <GridComponent
        id="gridcomp"
        headerText='Hello'
        dataSource={foodData}
        selectionSettings={settings}
        groupSettings={groupOptions}
        ref={g => grid = g}
        >
        <ColumnsDirective>
          <ColumnDirective field='name' width='100'/>
          <ColumnDirective field='grams_per_serving' width='90' textAlign="Right"/>
          <ColumnDirective field='calories' width='100' textAlign="Right"/>
          <ColumnDirective field='carbs' width='100' textAlign="Right"/>
          <ColumnDirective field='fat' width='100' textAlign="Right"/>
          <ColumnDirective type='checkbox' width='100' textAlign="Right"/>
          <ColumnDirective field='serving' width='100' textAlign="Right"/>
        </ColumnsDirective>
      
      </GridComponent>

    </div>
  )
}

export default FoodTracker