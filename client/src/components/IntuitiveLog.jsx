import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

const IntuitiveLog = (props) => {
  const [feelings, setFeelings] = useState([]);
  
  const setToggle = props.setToggle;

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/tracker/intuitive-${props.meal}`)
      .then((response) => {
        setFeelings(response.data);
        // console.log("res.data", response.data);
        // console.log("feelings", feelings);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.toggle]);

  const handleDeleteClick = (params) => () => {
    const values = [params.id, props.mealId]

    axios
    .delete(`http://localhost:8000/api/tracker/intuitive`, { data: values })
    .then(response => {
      
      console.log("res.data", response.data);
      setToggle(prev => !prev);
    })
    .catch(error => {
      console.log("error", error);
    });
  };

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
        <DataGrid rows={feelings} columns={columns} />
      </div>
    </div>
  );
};

export default IntuitiveLog;
