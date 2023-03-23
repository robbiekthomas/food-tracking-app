import React, { useState, useEffect } from "react";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import axios from "axios";

export const FoodLog = (props) => {
  const [foodLog, setFoodLog] = useState([]);
  const [foodDelete, setFoodDelete] = useState(false);
  

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/tracker/food-log-${props.meal}`)
      .then((response) => {
        setFoodLog(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.showList, foodDelete]);

  //params.id is the selected row food ID
  const handleDeleteClick = (params) => () => {
    const values = [params.id, props.mealID]
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

  const initialRows = foodLog;

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
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={foodLog} columns={columns} />
      </div>
    </div>
  );
};
