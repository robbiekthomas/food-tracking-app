import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from 'axios'

export const FoodLog = (props) => {
const [foodLog, setFoodLog] = useState([]);


  useEffect(() => {
    axios.get(`http://localhost:8000/api/tracker/food-log-${props.meal}`)
    .then((response) => {
        setFoodLog(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  }, [props.showList]);

  const rows = foodLog;

  const columns = [
    { field: "name", headerName: "Name", width: 180, editable: false },
    {
      field: "grams_per_serving",
      headerName: "Grams Per Serving",
      width: 180,
      type: "number",
      editable: false,
    },
    {
      field: "calories",
      headerName: "Calories",
      width: 180,
      type: "number",
      editable: false,
    },
    {
      field: "carbs",
      headerName: "Carbs",
      width: 180,
      type: "number",
      editable: false,
    },
    {
      field: "fat",
      headerName: "Fat",
      width: 180,
      type: "number",
      editable: false,
    },
    {
      field: "protein",
      headerName: "Protein",
      width: 180,
      type: "number",
      editable: false,
    },
    { field: "servings", headerName: "Servings", width: 180, editable: false },
  ];

  return (
    <div>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </div>
  );
};
