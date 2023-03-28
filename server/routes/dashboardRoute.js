const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const { format, add } = require("date-fns");
const differenceInDays = require("date-fns/differenceInDays");

require("dotenv").config();

// //
// //get user data and habit goal data
// //
// router.get("/", (req, res) => {
//   console.log("getting user data!");

//   const userQueryStr = `
//   SELECT userDetails.*, users.*, habitGoal_logs.*, habitGoals.*
//   FROM users
//   LEFT JOIN userDetails ON users.id = userDetails.user_id
//   LEFT JOIN habitGoal_logs ON users.id = habitGoal_logs.user_id
//   LEFT JOIN habitGoals ON habitGoal_logs.goal_id = habitGoals.id
//   WHERE users.id = 1
 
//       `;
//   db.query(userQueryStr)
//     .then((result) => {
//       console.log(result.rows)
//       res.json(result.rows);
//     })

//     .catch((err) => {
//       console.error(err);
//     });
// });



//
//get updates to user data for dashboard
//
router.get("/", (req, res) => {
  console.log("getting user data!");

  const userQueryStr = `
  SELECT userDetails.*, users.*, habitGoal_logs.*, habitGoals.*
  FROM users
  LEFT JOIN userDetails ON users.id = userDetails.user_id AND userDetails.date_updated = (SELECT MAX(date_updated) FROM userDetails)
  LEFT JOIN habitGoal_logs ON users.id = habitGoal_logs.user_id AND habitGoal_logs.insert_time = (SELECT MAX(insert_time) FROM habitGoal_logs)
  LEFT JOIN habitGoals ON habitGoal_logs.goal_id = habitGoals.id
  WHERE users.id = 1
  LIMIT 3

      `;
  db.query(userQueryStr)
    .then((result) => {
      console.log('jhsgdhsg', result.rows.length);
      res.json(result.rows);
    })

    .catch((err) => {
      console.error(err);
    });
});


//
//get data for the weight graph on the dashboard.
//
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
      let startDate = result.rows[0].date_updated;
      const endDate = add(new Date(), { days: -1 });
      const days = differenceInDays(endDate, startDate);
      let data = [[], []];
      let idx = 0;

      for (let i = 0; i < days; i++) {
        let yBF = null;
        let yWeight = null;

        if (
          new Date(result.rows[idx].date_updated).getTime() ===
          startDate.getTime()
        ) {
          yBF = result.rows[idx].body_fat_percentage;
          yWeight = result.rows[idx].weight;

          if (idx !== result.rows.length - 1) {
            idx++;
          }
        }

        let objBF = { x: startDate, y: yBF };
        let objWeight = { x: startDate, y: yWeight };
        //bodyfat
        data[0].push(objBF);
        //weight
        data[1].push(objWeight);
        startDate = add(startDate, { days: 1 });
      }
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

//
//get data for the macro distribution graph on the dashboard.
//
router.get("/stackedMacroGraph", (req, res) => {
  console.log("getting stackedMacroGraph data!");

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
      let startDate = new Date(result.rows[0].combine_day);
      const endDate = new Date();
      const days = differenceInDays(endDate, startDate);

      let data = [[], [], []];
      let idx = 0;

      for (let i = 0; i < days; i++) {
        let yPro = null;
        let yFat = null;
        let yCho = null;

        if (
          new Date(result.rows[idx].combine_day).getTime() ===
          startDate.getTime()
        ) {
          yPro = result.rows[idx].protein;
          yFat = result.rows[idx].fat;
          yCho = result.rows[idx].carbs;

          if (idx !== result.rows.length - 1) {
            idx++;
          }
        }

        const dateString = format(startDate, "yyyy-MM-dd");

        let objPro = { x: dateString, y: yPro };
        let objFat = { x: dateString, y: yFat };
        let objCho = { x: dateString, y: yCho };

        //protein
        data[0].push(objPro);
        //fat
        data[1].push(objFat);
        //carbs
        data[2].push(objCho);

        startDate = add(startDate, { days: 1 });
      }

      res.json(data);
    })

    .catch((err) => {
      console.error(err);
    });
});

//get data for the protein total graph on the dashboard.
router.get("/stackedProteinGraph", (req, res) => {
  console.log("getting stackedProteinGraph data!");

  const userQueryStr = `
  SELECT SUM (food_logs.servings) AS servings, SUM (foods.calories) AS calories, SUM( foods.protein) AS protein, TO_CHAR(food_logs.meal_date, 'YYYY-MM-DD') AS combine_day
  FROM foods
  LEFT JOIN food_logs ON foods.id = food_logs.food_id
  WHERE food_logs.user_id = 1
  GROUP BY combine_day
  ORDER BY combine_day ASC

      `;
  db.query(userQueryStr)
    .then((result) => {
      let startDate = new Date(result.rows[0].combine_day);
      const endDate = new Date();
      const days = differenceInDays(endDate, startDate);

      let data = [[], []];
      let idx = 0;

      for (let i = 0; i < days; i++) {
        let yPro = null;
        let yFat = null;

        if (
          new Date(result.rows[idx].combine_day).getTime() ===
          startDate.getTime()
        ) {
          yPro = result.rows[idx].protein * 4;
          yCal = result.rows[idx].calories - yPro;

          if (idx !== result.rows.length - 1) {
            idx++;
          }
        }

        let obPro = { x: startDate, y: yPro };
        let objCal = { x: startDate, y: yCal };

        //protein
        data[0].push(obPro);
        //calories
        data[1].push(objCal);

        startDate = add(startDate, { days: 1 });
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
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
});


router.post("/habitGoals/insert", (req, res) => {
  const habitQueryStr = `
    INSERT INTO habitGoal_logs (goal_id, goal_number, user_id)
    VALUES
      ((SELECT habitGoals.id FROM habitGoals WHERE goal_name = $1), $2, 1),
      ((SELECT habitGoals.id FROM habitGoals WHERE goal_name = $3), $4, 1),
      ((SELECT habitGoals.id FROM habitGoals WHERE goal_name = $5), $6, 1)
    `;

  let params = [];
  for (let goal of req.body) {
    params.push(goal.goal_name);
    params.push(goal.goal_number);
  }

  db.query(habitQueryStr, params)
    .then((result) => {
      console.log(result.rows)
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//
//get data for the foodReflection on the dashboard.
//
router.get("/foodReflection", (req, res) => {
  console.log("getting foodReflection data!");

  const userQueryStr = `
  SELECT AVG (food_logs.hunger_before) AS hunger_before, AVG (food_logs.hunger_after) AS hunger_after, TO_CHAR(food_logs.meal_date, 'YYYY-MM-DD') AS combine_day
  FROM food_logs
  WHERE food_logs.user_id = 1
  GROUP BY combine_day
  ORDER BY combine_day ASC

      `;
  db.query(userQueryStr)
    .then((result) => {
      let startDate = new Date(result.rows[0].combine_day);
      const endDate = new Date();
      const days = differenceInDays(endDate, startDate);

      let data = [[], [], []];
      let idx = 0;

      for (let i = 0; i < days; i++) {
        let hBefore = null;
        let hAfter = null;

        if (
          new Date(result.rows[idx].combine_day).getTime() ===
          startDate.getTime()
        ) {
          hBefore = result.rows[idx].hunger_before;
          hAfter = result.rows[idx].hunger_after;

          if (idx !== result.rows.length - 1) {
            idx++;
          }
        }

        let objBefore = { x: startDate, y: hBefore };
        let objAfter = { x: startDate, y: hAfter };

        //hunger before
        data[0].push(objBefore);
        //hunger after
        data[1].push(objAfter);

        startDate = add(startDate, { days: 1 });
      }

      res.json(data);
    })

    .catch((err) => {
      console.error(err);
    });
});


//
//get feeling after eating data for the foodReflection on the dashboard.
//
router.get("/mood", (req, res) => {
  console.log("getting mood data!");

  const userQueryStr = `
  SELECT food_logs.feeling_after_eating, COUNT(food_logs.feeling_after_eating) AS count_feelings, TO_CHAR(food_logs.meal_date, 'YYYY-MM-DD') AS combine_day
  FROM food_logs
  WHERE food_logs.user_id = 1
  GROUP BY feeling_after_eating, combine_day
  ORDER BY combine_day ASC

      `;
  db.query(userQueryStr)
    .then((data) => {
      let result = [];
      data.rows.forEach((item) => {
        let date = item.combine_day;
        let feeling = item.feeling_after_eating;
        let count = item.count_feelings;
        let found = result.find((item) => item[date]);
        if (found) {
          found[date][feeling] = count;
        } else {
          let obj = {};
          obj[date] = {};
          obj[date][feeling] = count;
          result.push(obj);
        }
      });

      res.json(result);
    })

    .catch((err) => {
      console.error(err);
    });
});

module.exports = router;
