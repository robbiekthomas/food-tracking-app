import React, { useState, useEffect } from 'react';
import { getUserRow } from '../api-requests/index';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
import axios from 'axios';
import { TextField, InputLabel, Button } from '@mui/material';


const EditProfileForm = () => {
  //temporary state container for user inputs
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [birthdate, setBirthdate] = useState("")
  const [sex, setSex] = useState("")


  //handle input changes
  const onNameChange = (e) => setName(e.target.value);
  const onEmailChange = (e) => setEmail(e.target.value);
  const onBirthdateChange = (e) => setBirthdate(e.target.value);
  const onSexChange = (e) => setSex(e.target.value);


  //will store the users old data technically then get submitted as package for post request
  const [inputs, setUserInputs] = useState({
    id:'0',
    name: '',
    email: '',
    birthdate: '',
    sex: ''
  });


  //gets user from the database
  useEffect(() => {
    getUserRow()
      .then((res) => {
        setUserInputs(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


//check inputs bufore updating db
  const validateSubmission = () => {
    const submissionValues = ({
      ...inputs,
      name,
      email,
      birthdate,
      sex
    });

    updateDatabase(submissionValues);
  };


  //post updates -> server -> db
  const updateDatabase = (values) => {
    console.log(1, values);
    const url = 'http://localhost:8000/api/dashboard/user/insert';
    
    axios.post(url, values)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(1, err);
      });
  };


  return (
    <>
      <h1>Edit Profile</h1>
      <form>
        <TextField
          name='name'
          value={name}
          type='text'
          onChange={(e) => onNameChange(e)}
          placeholder={inputs.name}
        />
        <br />
        <TextField
          name='email'
          type='email'
          onChange={(e) => onEmailChange(e)}
          placeholder={inputs.email}
        />
        <br />
        <TextField
          name='birthdate'
          type='date'
          onChange={(e) => onBirthdateChange(e)}
        />
        <br />
        <TextField
          name='sex'
          type='text'
          onChange={(e) => onSexChange(e)}
          placeholder={inputs.sex}
        />
        <br />

        <Button variant="contained" onClick={validateSubmission}>Input Data</Button>
      </form>

    </>
  );
};

export default EditProfileForm;
