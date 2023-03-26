import React, { useState, useEffect } from "react";
import axios from "axios";

import { Button, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { getFoodRow } from "../api-requests/tracker";

const FoodList = (props) => {
  const [foodData, setfoodData] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  useEffect(() => {
    getFoodRow()
      .then((res) => {
        setfoodData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const rows = foodData;

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: false },
    {
      field: "grams_per_serving",
      headerName: "Grams Per Serving",
      width: 150,
      type: "number",
      editable: false,
    },
    {
      field: "calories",
      headerName: "Calories",
      width: 100,
      type: "number",
      editable: false,
    },
    {
      field: "carbs",
      headerName: "Carbs",
      width: 100,
      type: "number",
      editable: false,
    },
    {
      field: "fat",
      headerName: "Fat",
      width: 100,
      type: "number",
      editable: false,
    },
    {
      field: "protein",
      headerName: "Protein",
      width: 100,
      type: "number",
      editable: false,
    },
    { field: "servings", headerName: "Servings", width: 100, editable: true },
  ];

  const createFoodValues = () => {
    let values = [];

    for (const item of rowSelectionModel) {
      values.push({
        user_id: 1,
        food_id: foodData[item - 1].id,
        meal_id: props.meal,
        servings: foodData[item - 1].servings || 1,
      });
    }

    const url = "http://localhost:8000/api/tracker/food-log";
    axios
      .post(url, values)
      .then((res) => {
        props.setShowList((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
    props.handleClose();
  };

  const processRowUpdate = (newRow) => {
    for (const food of foodData) {
      if (food.id === newRow.id) {
        food.servings = newRow.servings;
      }
    }
  };

  return (
    <div class="flex flex-col items-center">
      <div style={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setRowSelectionModel(newRowSelectionModel);
          }}
          rowSelectionModel={rowSelectionModel}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={() => {}}
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
        />
      </div>
      <Button
        sx={{ width: "80%", p: 1, m: 2 }}
        variant="contained"
        onClick={() => createFoodValues()}
      >
        Track my meal
      </Button>
    </div>
  );
};

export default FoodList;
