import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import Header from "./Header";
import { getFoodRow } from "../api-requests/tracker";

const dummyFoodData = [
  {
    id: 3,
    name: "Almond Butter",
    grams_per_serving: 32,
    calories: 190,
    carbs: 6,
    fat: 16,
    protein: 8,
    servings: 1,
  },
  {
    id: 4,
    name: "Almonds",
    grams_per_serving: 9,
    calories: 50,
    carbs: 2,
    fat: 4,
    protein: 2,
    servings: 1,
  },
];

const userID = 1;

const FoodList = (props) => {
  const [foodData, setfoodData] = useState([]);
  const [selectedFood, setselectedFood] = useState([]);

  useEffect(() => {
    getFoodRow()
      .then((res) => {
        setfoodData(res);
        // console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //sends food_id, user_id, meal_id as an object to the food log db
  const updateFoodLog = () => {
    const url = "http://localhost:8000/api/tracker/food-log";
    const values = [
      {
        food_id: 4,
        user_id: 1,
        meal_id: 3,
        servings: 1,
      },
      {
        food_id: 6,
        user_id: 1,
        meal_id: 3,
        servings: 2,
      },
    ];

    axios
      .post(url, values)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

const rows = [
    {
      id: 3,
      name: "Almond Butter",
      grams_per_serving: 32,
      calories: 190,
      carbs: 6,
      fat: 16,
      protein: 8,
      servings: 1,
    },
    {
      id: 4,
      name: "Almonds",
      grams_per_serving: 9,
      calories: 50,
      carbs: 2,
      fat: 4,
      protein: 2,
      servings: 1,
    },
]

const columns = [
  { field: 'name', headerName: 'Name', width: 180, editable: false },
  { field: 'grams_per_serving', headerName: 'Grams Per Serving', width: 180, type: "number", editable: false },
  { field: 'calories', headerName: 'Calories', width: 180, type: "number", editable: false },
  { field: 'carbs', headerName: 'Carbs', width: 180, type: "number", editable: false },
  { field: 'fat', headerName: 'Fat', width: 180, type: "number", editable: false },
  { field: 'protein', headerName: 'Protein', width: 180, type: "number", editable: false },
  { field: 'servings', headerName: 'Servings', width: 180, editable: true },
]

  return (
    <div>
      <Button onClick={() => updateFoodLog()}>Send Data</Button>

      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};

export default FoodList;
