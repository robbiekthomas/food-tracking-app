import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

const IntuitiveLog = (props) => {
  const [feelings, setFeelings] = useState([]);
  

  // const rows = [2,3,'hungry',1]

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/tracker/intuitive-${props.meal}`)
      .then((response) => {
        setFeelings(response.data);
        console.log("res.data", response.data);
        console.log("feelings", feelings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.toggle]);

  const columns = [
    {
      field: "hunger_before",
      headerName: "Hunger Before",
      width: 180,
      editable: false,
    },
    {
      field: "hunger_after",
      headerName: "Hunger After",
      width: 180,
      editable: false,
    },
    {
      field: "feeling_after_eating",
      headerName: "How I Felt",
      width: 180,
      editable: false,
    }
  ];

  // console.log("feelings", feelings);
  // console.log("columsn", columns);
  return (
    <div>
      <div style={{ height: 300, width: "50%" }}>
        <DataGrid rows={feelings} columns={columns} />
      </div>
    </div>
  );
};

export default IntuitiveLog;
