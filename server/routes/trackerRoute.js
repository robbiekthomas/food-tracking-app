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
  console.log("receiving data...");

  let insertQueryStr = `INSERT INTO food_logs (user_id, meal_id, food_id, servings) VALUES `;
  let queryParams = [];
  let count = 1;
  for (let i = 0; i < req.body.length; i++) {
    if (i < req.body.length - 1) {
      insertQueryStr += `($${count}, $${count + 1}, $${count + 2}, $${
        count + 3
      }),`;
    } else {
      insertQueryStr += `($${count}, $${count + 1}, $${count + 2}, $${
        count + 3
      });`;
    }

    queryParams.push(
      req.body[i].user_id,
      req.body[i].meal_id,
      req.body[i].food_id,
      Number(req.body[i].servings)
    );
    count += 4;
  }

  db.query(insertQueryStr, queryParams)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete("/food-log", (req, res) => {
  console.log("deleting data... ");
  console.log("req.body", req.body);
  const deleteQueryStr = `
  DELETE FROM food_logs 
  WHERE food_id = $1 AND meal_id = $2
  `;

  db.query(deleteQueryStr, req.body)
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/food-log-breakfast", (req, res) => {
  console.log("getting data!");

  const foodQueryStr = `
    SELECT foods.name, foods.calories, foods.grams_per_serving, foods.carbs, foods.fat, foods.protein, food_logs.servings, foods.id
    FROM food_logs
    JOIN foods ON foods.id = food_logs.food_id
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 1 AND food_logs.date = CURRENT_DATE
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

router.get("/food-log-lunch", (req, res) => {
  console.log("getting data!");

  const foodQueryStr = `
    SELECT foods.name, foods.calories, foods.grams_per_serving, foods.carbs, foods.fat, foods.protein, food_logs.servings, foods.id
    FROM food_logs
    JOIN foods ON foods.id = food_logs.food_id
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 2 AND food_logs.date = CURRENT_DATE
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

router.get("/food-log-snack", (req, res) => {
  console.log("getting data!");

  const foodQueryStr = `
    SELECT foods.name, foods.calories, foods.grams_per_serving, foods.carbs, foods.fat, foods.protein, food_logs.servings, foods.id
    FROM food_logs
    JOIN foods ON foods.id = food_logs.food_id
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 3 AND food_logs.date = CURRENT_DATE
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

router.get("/food-log-dinner", (req, res) => {
  console.log("getting data!");

  const foodQueryStr = `
    SELECT foods.name, foods.calories, foods.grams_per_serving, foods.carbs, foods.fat, foods.protein, food_logs.servings, foods.id
    FROM food_logs
    JOIN foods ON foods.id = food_logs.food_id
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 4 AND food_logs.date = CURRENT_DATE
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

// submit intuitive log to database
router.post("/hunger", (req, res) => {
  const hungerQueryStr = `
  UPDATE food_logs
  SET
    hunger_before = $1
    hunger_after = $2
  WHERE id = 1
  AND meal_id = $3
  `;
  db.query(hungerQueryStr, [req.body])
    .then((res) => {
      return res.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;
