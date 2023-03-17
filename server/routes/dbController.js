const express = require("express");
const router = express.Router();
const db = require('../db/connection');
const data = [1, 2, 3, 4, 5];
// 1. you will receive the the id from react
// 2. write query to get data from database
// 3. send the data back to the react as a response
//res.json(data);


router.get("/", (req, res) => {
  console.log('getting data!');

  const userQueryStr = `
    SELECT *
    FROM users
    `;
  db.query(userQueryStr)
    .then((result) => {
      const data = result.rows[0];
      console.log('data is:', result.rows[0])
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    })

});


module.exports = router;