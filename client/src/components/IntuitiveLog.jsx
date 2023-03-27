import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import {  getIntuitiveLogHistory } from '../api-requests/tracker';
import { useDateContext } from "../contexts/date-context";
import { format } from 'date-fns';


const IntuitiveLog = (props) => {
  const [feelings, setFeelings] = useState([]);
  const { selectedContextDate } = useDateContext();
  
  const setToggle = props.setToggle;

  //
  useEffect(() => {
    const date = format(selectedContextDate, 'yyyy-MM-dd')
    getIntuitiveLogHistory(props.mealId, date)
    .then((res) => {
      setFeelings(res);
    })

      .catch((err) => {
        console.log(err);
      });
  }, [props.toggle, selectedContextDate]);

  const handleDeleteClick = (params) => () => {
    const date = format(selectedContextDate, 'yyyy-MM-dd')
    const values = [params.id, props.mealId, date];
    feelings.splice((params.id), 1);
    setFeelings([...feelings]);


    axios.delete(`http://localhost:8000/api/tracker/intuitive`, { data: values })
    .then(response => {
      setToggle(prev => !prev);
    })
    .catch(error => {
      console.log("error", error);
    });
  };

  const rows = feelings;

  return (
    <TableContainer component={Paper} style={{ minHeight: 400, maxHeight: 400 }}>
      <Table sx={{ minWidth: 650 }} aria-label="Food Log">
        <TableHead>
          <TableRow>
            <TableCell align="center">Hunger Before</TableCell>
            <TableCell align="center">Hunger After</TableCell>
            <TableCell align="center">How I Felt</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{row.hunger_before}</TableCell>
              <TableCell align="center">{row.hunger_after}</TableCell>
              <TableCell align="center">{row.feeling_after_eating}</TableCell>
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

export default IntuitiveLog;
