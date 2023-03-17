import React, { useState, useEffect } from 'react';
import { getUserRow } from '../api-requests/index';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Box from '@mui/material/Box';

const DashboardPage = () => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    getUserRow()
      .then((res) => {
        setTest(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [textValue, setTextValue] = useState("")
  const onTextChange = (e) => setTextValue(e.target.value);
  // const handleSubmit = () => console.log(textValue);
  const handleSubmit = () => {

    // const goal = {
    //   name: textValue
    // };

    axios.post('http://localhost:8000/api/dashboard/habitGoals/insert', { textValue })
      .then((res) => {
        console.log(res);
        console.log(res.data);
      })
      .catch((err) => {

      })
      
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <ul>
        {Object.values(test).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <TextField id="standard-basic" label="Standard" variant="standard" onChange={onTextChange} value={textValue} />
      <Button variant="contained" onClick={handleSubmit}>Input Data</Button>

    </div>
  )
}

export default DashboardPage
