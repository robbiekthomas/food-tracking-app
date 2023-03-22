const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const axios = require("axios");
const add = require('date-fns/add');
const differenceInDays = require('date-fns/differenceInDays')
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

//get data for the weight graph on the dashboard.
router.get("/weightGraph", (req, res) => {
  console.log("getting body composition data!");

  const userQueryStr = `
  SELECT weight, body_fat_percentage, waist_circumference, date_updated
  FROM userDetails
  WHERE user_id = 1
  ORDER BY date_updated ASC
  
      `;
  db.query(userQueryStr)
    .then((result) => {
      const startDate = result.rows[0].date_updated;
      const endDate = add(new Date(), { days: -1 });
      const days = differenceInDays(endDate, startDate)
      let data = [[], []];

      for (let i = 0; i < days; i++) {
        const x = add(startDate, { days: i });
        let yBF = null
        let yWeight = null

        if(result.rows[i]) {
          yBF = result.rows[i].body_fat_percentage;
          yWeight = result.rows[i].weight;
        }
        
        let objBF = {x: x, y: yBF};
        let objWeight = {x: x, y: yWeight};
        console.log(objBF, objWeight);
    
        //bodyfat
        data[0].push(objBF);

        //weight
        data[1].push(objWeight);

      
      }

      res.json(data);
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
