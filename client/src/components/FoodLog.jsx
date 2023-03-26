import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
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

    foodLog.splice((params.id), 1);
    setFoodLog([...foodLog]);
    const values = [params.id, props.mealID];

    axios
      .delete(`http://localhost:8000/api/tracker/food-log`, { data: values })
      .then((response) => {
        setFoodDelete((prev) => !prev);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };


  const rows = foodLog;

  //made in order to change the values on the table once a new date is selected


  console.log('props', foodLog)

  return (
    <TableContainer component={Paper} style={{ minHeight: 400, maxHeight: 400 }}>
      <Table sx={{ minWidth: 650 }} aria-label="Food Log">
        <TableHead>
          <TableRow>
            <TableCell>Food</TableCell>
            <TableCell align="right">Grams/Serving</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Servings</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.grams_per_serving}</TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
              <TableCell align="right">{row.servings}</TableCell>
              <TableCell align="center">
                <IconButton
                  size="small"
                  onClick={
                    handleDeleteClick(row)
                  }
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
