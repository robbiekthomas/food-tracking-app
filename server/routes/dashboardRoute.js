const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const axios = require("axios");
require("dotenv").config();

//get user data and habit goal data
router.get("/", (req, res) => {
  console.log("getting user data!");

  const userQueryStr = `
  SELECT userDetails.*, users.*, habitGoal_logs.*, habitGoals.*
  FROM users
  LEFT JOIN userDetails ON users.id = userDetails.user_id
  LEFT JOIN habitGoal_logs ON users.id = habitGoal_logs.user_id
  LEFT JOIN habitGoals ON habitGoal_logs.goal_id = habitGoals.id
  WHERE users.id = 1

      `;
  db.query(userQueryStr)
    .then((result) => {
      res.json(result.rows);
    })
  
    .catch((err) => {
      console.error(err);
    });
});


//update user information in db on profile edit
router.post("/user/insert", (req, res) => {

  const r = req.body;
  const str = `
      UPDATE users 
      SET
        name = $1,
        email = $2,
        birthdate = $3,
        sex = $4
      WHERE id = $5
  `;

  db.query(str, [r.name, r.email, r.birthdate, r.sex, r.id])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    })
});

router.post("/habitGoals/insert", (req, res) => {
  const habitQueryStr = `
    INSERT INTO habitGoals (name)
    VALUES ($1)
    `;
  console.log(req.body.textValue);
  const textValue = req.body.textValue;
  db.query(habitQueryStr, [textValue])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
});



module.exports = router;
