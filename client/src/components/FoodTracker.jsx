import React, { useState, useEffect } from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import axios from 'axios';
import { Button } from '@mui/material';
import { DataGrid } from "@mui/x-data-grid";

const FoodTracker = (props) => {
  
  return (
    <div>
      <h1>Food Tracker</h1>

      <Button onClick={() => props.onChange(1)}>Add Breakfast</Button>


      <Button onClick={() => props.onChange(2)}>Add Lunch</Button>
      <Button onClick={() => props.onChange(4)}>Add Dinner</Button>
      <Button onClick={() => props.onChange(3)}>Add Snack</Button>
      <GridComponent 
      >


      </GridComponent>
    </div>
  )
}

export default FoodTracker