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

router.post("/log", (req, res) => {
  console.log("receiving data...")

  const logQueryStr = `
    INSERT INTO food_logs (food_id, user_id, meal_id, servings, hunger_before, hunger_after, feeling_after_eating)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
  db.query(logQueryStr, [
    console.log(req.body)
  ])
  .then((res) => {
    
  })

})
module.exports = router;