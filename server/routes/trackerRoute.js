const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const axios = require("axios");
require("dotenv").config();

router.get("/", (req, res) => {
  console.log("getting data!");

  const foodQueryStr = `
    SELECT *
    FROM foods
    `;

  db.query(foodQueryStr)
    .then((result) => {
      const data = result.rows;
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/food-log", (req, res) => {
  console.log("receiving data...")

  const logQueryStr = `
    INSERT INTO food_logs (food_id, user_id, meal_id)
    VALUES ($1, $2, $3)
    `;
  
  console.log("req.body", req.body);
  const values = [req.body.food_id, req.body.user_id, req.body.meal_id]

  console.log("values", values);

  db.query(logQueryStr, values)
  .then((res) => {
    console.log("logQueryResult", res.rows)
    return res;
  })
  .catch((err) => {
    console.log(err.message);
  })

})
module.exports = router;