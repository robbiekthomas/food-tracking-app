const express = require("express");
const router = express.Router();

module.exports = (db) => {
  router.get("/user", (req, res) => {
    // 1. you will receive the the id from react
    // 2. write query to get data from database
    const userQueryStr = `
    SELECT id, name, email, password
    FROM users
    `;
   const data = db.query(userQueryStr,)
    .then((result) => {
      return result.rows[0]
    })
    // 3. send the data back to the react as a response
    res.json(data);
  });
};
