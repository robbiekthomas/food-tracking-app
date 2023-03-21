import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GridComponent, ColumnsDirective, ColumnDirective, Page, Inject, Search } from '@syncfusion/ej2-react-grids';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBoxComponent } from "@syncfusion/ej2-react-inputs";
import { Button } from '@mui/material';
import Header from './Header';
import { getFoodRow } from '../api-requests/tracker';

const dummyFoodData = [{
  "id":3,"name":"Almond Butter","grams_per_serving":32,"calories":190,"carbs":6,"fat":16,"protein":8},
  {"id":4,"name":"Almonds","grams_per_serving":9,"calories":50,"carbs":2,"fat":4,"protein":2}];

const userID = 1;

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

  //Returns array of selected food ID's
  const helper = (foodData) => {
    let foodID = [];
    foodData.forEach(foodObj => 
      foodID.push(foodObj.id)
    )
    return foodID;
  }

  let grid;

  const foodSelected = () => {
    if (grid) {
      const selectedrecords = grid.getSelectedRecords();
      setselectedFood(JSON.stringify(selectedrecords));

      const foodIdArr = helper(selectedrecords);
      console.log("foodIDarr", foodIdArr)
      const meal_id = props.meal;
      console.log("meal id", meal_id);


    }
  }


  const updateFoodLog = () => {
    const url = 'http://localhost:8000/api/tracker/food-log';
    const values = {
      food_id: 4,
      user_id: 1,
      meal_id: 3
    };

    axios.post(url, values)
      .then((res) => {
        console.log("res", res)
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
      <Button onClick={() => updateFoodLog()}>Send Data</Button>

      
      <GridComponent
        dataSource={foodData}
        allowPaging={true}
        pageSettings={pageOptions}
        ref={g => grid = g}
      >
          <Inject services={[Search]} />

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