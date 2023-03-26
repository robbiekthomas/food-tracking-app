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
    foodLog.splice((params.id), 1);
    setFoodLog([...foodLog]);
    const values = [params.id, props.mealID];
    console.log("values", values)
    axios
      .delete(`http://localhost:8000/api/tracker/food-log`, { data: values })
      .then((response) => {
        console.log("res.data", response.data);
        setFoodDelete((prev) => !prev);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const rows = foodLog;

  return (
    <TableContainer component={Paper}>
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
            <TableCell align="right">Delete</TableCell>
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
                  onClick={() => {
                    handleDeleteClick(row);
                    console.log("index", rowIndex)
                    console.log("row", row)
                  }}
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
