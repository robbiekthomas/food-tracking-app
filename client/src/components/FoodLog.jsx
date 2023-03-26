import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";
import {  upDateTrackerItems } from '../api-requests/tracker';
import { useDateContext } from "../contexts/date-context";



export const FoodLog = ({meal, mealID, mealSummary, showList, onUpdate, selectedDate}) => {
  const [foodLog, setFoodLog] = useState([]);
  const [foodDelete, setFoodDelete] = useState(false);
  
  const { selectedContextDate } = useDateContext();

  useEffect(() => {
    const m = Number(mealID)

    upDateTrackerItems(m, selectedContextDate)
      .then((res) => {
        console.log('klklkl',res)
        setFoodLog(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [showList, foodDelete, selectedContextDate]);
console.log('selectedContextDate', selectedContextDate)
  //params.id is the selected row food ID
  const handleDeleteClick = (params) => () => {
    const values = [params.id, mealID]
    axios
    .delete(`http://localhost:8000/api/tracker/food-log`, { data: values })
    .then(response => {
      
      console.log("res.data", response.data);
      setFoodDelete(prev => !prev);
    })
    .catch(error => {
      console.log("error", error);
    });
  };

  //made in order to change the values on the table once a new date is selected


  console.log('props', foodLog)
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
    {
      field: "servings",
      headerName: "Servings",
      type: "number",
      width: 180,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Delete",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(params)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid rows={foodLog} columns={columns} />
      </div>
    </div>
  );
};
