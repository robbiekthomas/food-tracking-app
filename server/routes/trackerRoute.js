const express = require("express");
const router = express.Router();
const db = require("../db/connection");
const axios = require("axios");
require("dotenv").config();

router.get("/", (req, res) => {
  console.log("getting data!");

  const foodQueryStr = `
    SELECT *
    FROM foods;
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
  console.log(insertQueryStr);
  console.log(queryParams);
  db.query(insertQueryStr, queryParams)
    .then((result) => {
      console.log(result.rows[0]);
      res.json(result.rows);
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
  WHERE food_id = $1 AND meal_id = $2;
  `;

  db.query(deleteQueryStr, req.body)
    .then((result) => {
      res.json(result.rows);
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
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 1 AND food_logs.meal_date = CURRENT_DATE;
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
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 2 AND food_logs.meal_date = CURRENT_DATE;
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
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 3 AND food_logs.meal_date = CURRENT_DATE;
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
    WHERE food_logs.user_id = 1 AND food_logs.meal_id = 4 AND food_logs.meal_date = CURRENT_DATE;
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
router.post("/intuitive", (req, res) => {
  const hungerQueryStr = `
  INSERT INTO food_logs(hunger_before, hunger_after, feeling_after_eating, meal_id, user_id)
  VALUES ($1, $2, $3, $4, $5);
  `;
  db.query(hungerQueryStr, [req.body[0], req.body[1], req.body[2], req.body[3], req.body[4]])
    .then((result) => {
      console.log('testtest', req.body)
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete("/intuitive", (req, res) => {
  console.log("deleting data... ");
  console.log("req.body", req.body);
  const deleteQueryStr = `
  DELETE FROM food_logs 
  WHERE id = $1 AND meal_id = $2;
  `;

  db.query(deleteQueryStr, req.body)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/intuitive-breakfast", (req, res) => {
  const queryStr = `
  SELECT hunger_before, hunger_after, feeling_after_eating, id FROM food_logs WHERE hunger_before IS NOT NULL AND meal_id = 1 AND user_id = 1 AND meal_date = CURRENT_DATE;
  `;
  db.query(queryStr)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/intuitive-lunch", (req, res) => {
  const queryStr = `
  SELECT hunger_before, hunger_after, feeling_after_eating, id FROM food_logs WHERE hunger_before IS NOT NULL AND meal_id = 2 AND user_id = 1 AND meal_date = CURRENT_DATE;
  `;
  db.query(queryStr)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/intuitive-dinner", (req, res) => {
  const queryStr = `
  SELECT hunger_before, hunger_after, feeling_after_eating, id FROM food_logs WHERE hunger_before IS NOT NULL AND meal_id = 4 AND user_id = 1 AND meal_date = CURRENT_DATE;
  `;
  db.query(queryStr)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/intuitive-snack", (req, res) => {
  const queryStr = `
  SELECT hunger_before, hunger_after, feeling_after_eating, id FROM food_logs WHERE hunger_before IS NOT NULL AND meal_id = 3 AND user_id = 1 AND meal_date = CURRENT_DATE;
  `;
  db.query(queryStr)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/habitGoals", (req, res) => {
  const queryStr = `
  SELECT goal_name, is_complete, habitGoal_logs.id
  FROM habitGoals
  JOIN habitGoal_logs ON goal_id = habitGoals.id
  WHERE user_id = 1 AND date = CURRENT_DATE;
  `;
  db.query(queryStr)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post("/habitGoals", (req, res) => {
  const queryStr = `
  UPDATE habitGoal_logs 
  SET is_complete = $1
  WHERE user_id = 1 AND id = 1;
  `;

  console.log("req.body", req.body);
  const queryParams = [req.body[0]];
  
  db.query(queryStr, queryParams)
    .then((result) => {
      res.json(result.rows);
    })
    .catch((err) => {
      console.log(err.message);
    });
});


module.exports = router;
