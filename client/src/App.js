import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [test, setTest] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/test')
      .then((response) => {
        console.log(response.data);
        setTest(response.data);
      })
      .catch((err) => {

      })
  }, []);

  return (
    <ul>
      {Object.values(test).map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

export default App;