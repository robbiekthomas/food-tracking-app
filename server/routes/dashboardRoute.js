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

        if (result.rows[i]) {
          yBF = result.rows[i].body_fat_percentage;
          yWeight = result.rows[i].weight;
        }

        let objBF = { x: x, y: yBF };
        let objWeight = { x: x, y: yWeight };

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


const convertDates = (date) => {

};
//get data for the macro distribution graph on the dashboard.
router.get("/stackedMacroGraph", (req, res) => {
  console.log("getting macro distribution data!");

  const userQueryStr = `
  SELECT SUM (food_logs.servings) AS servings, SUM (foods.carbs) AS carbs, SUM(foods.fat) AS fat, SUM( foods.protein) AS protein, TO_CHAR(food_logs.meal_date, 'YYYY-MM-DD') AS combine_day
  FROM foods
  LEFT JOIN food_logs ON foods.id = food_logs.food_id
  WHERE food_logs.user_id = 1
  GROUP BY combine_day
  ORDER BY combine_day ASC

      `;
  db.query(userQueryStr)
    .then((result) => {
      const startDate = result.rows[0].combine_day;
      const endDate = new Date().toISOString().slice(0, 10); //add(new Date(), { days: -1 });
      const days = endDate.substring(8) - startDate.substring(8);

      let data = [[], [], []];//0 pro, 1 fat, 2 cho
      console.log(startDate, endDate, days,  endDate.substring(8));
      for (let i = 0; i < days; i++) {
        const x = add(startDate, { days: i });
        let yPro = null
        let yFat = null
        let yCho = null

        if (result.rows[i]) {
          yPro = result.rows[i].protein * result.rows[i].servings * 4;
          console.log(yPro);
          yFat = result.rows[i].fat * result.rows[i].servings * 9;
          yCho = result.rows[i].carbs * result.rows[i].servings * 4;
        }
        
        console.log(result.rows[i].protein, result.rows[i].servings, result.rows[i].servings*result.rows[i].protein);

        let obPro = { x: x, y: yPro };
        let objFat = { x: x, y: yFat };
        let objCho = { x: x, y: yCho };

        //protein
        data[0].push(obPro);
        //fat
        data[1].push(objFat);
        //carbs
        data[2].push(objCho);

      }
console.log(data);
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
