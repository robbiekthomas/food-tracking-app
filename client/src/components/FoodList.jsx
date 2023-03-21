import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Edit, EditSettingsModel } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button } from '@mui/material';
import Header from './Header';
import { getFoodRow } from '../api-requests/tracker';

const dummyFoodData = [{
  "id":3,"name":"Almond Butter","grams_per_serving":32,"calories":190,"carbs":6,"fat":16,"protein":8},
  {"id":4,"name":"Almonds","grams_per_serving":9,"calories":50,"carbs":2,"fat":4,"protein":2}];

const FoodList = (props) => {
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

  const foodSelected = () => {
    if (grid) {
      const selectedrecords = grid.getSelectedRecords();
      setselectedFood(JSON.stringify(selectedrecords));
      console.log("selectedFood", selectedFood);
      return selectedrecords;
    }
  }

  const helper = (foodData) => {
    let foodID = [];
    foodData.forEach(foodObj => 
      foodID.push(foodObj.id)
    )
    return foodID;
  }

  const updateFoodLog = (values) => {
    const url = 'http://localhost:8000/api/tracker/log';
    axios.post(url, values)
      .then((res) => {
        
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const pageOptions = {
    pageSize: 12, 
    pageSizes: true
  };

  return (
    <div>
      <Button onClick={() => foodSelected()}>Select food</Button>
      <Button onClick={() => props.onChange()}>Exit</Button>
      <GridComponent
        dataSource={foodData}
        allowPaging={true}
        pageSettings={pageOptions}
        ref={g => grid = g}
      >

        <ColumnsDirective>
          <ColumnDirective field='name' width='200'/>
          <ColumnDirective field='grams_per_serving' width='90' textAlign="Right"/>
          <ColumnDirective field='calories' width='100' textAlign="Right"/>
          <ColumnDirective field='carbs' width='100' textAlign="Right"/>
          <ColumnDirective field='fat' width='100' textAlign="Right"/>
          <ColumnDirective field ='' type='checkbox' width='100' textAlign="Right"/>
          {/* <ColumnDirective field='serving' editType='dropdownedit' width='100' textAlign="Right"/> */}
        </ColumnsDirective>
        <Inject services={[Page]} />
      </GridComponent>

    </div>
  )
}

export default FoodList