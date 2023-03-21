import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { Button } from '@mui/material';

const FoodTracker = (props) => {
  
  return (
    <div>
      <h1>Food Tracker</h1>
      <Button onClick={() => props.onChange('Breakfast')}>Add Breakfast</Button>
      <Button onClick={() => props.onChange('Lunch')}>Add Lunch</Button>
      <Button onClick={() => props.onChange('Dinner')}>Add Dinner</Button>
      <GridComponent 
      >


      </GridComponent>
    </div>
  )
}

export default FoodTracker