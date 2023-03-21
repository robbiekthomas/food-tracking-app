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




// insert user on auth0 account creation
router.post("/user/new", (req, res) => {
  const newUserQueryStr = `
  INSERT INTO users (name, email, sub)
  VALUES ($1, $2, $3)

  INSERT INTO userDetails (user_id)
  VALUES ($3)
  `;
  console.log("express", req.body);
  db.query(newUserQueryStr, [req.body.name, req.body.email, req.body.sub])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log("express", err.message);
    });
});

// grab typeform data from external api
const TYPEFORM_API_KEY = process.env.TYPEFORM_API_KEY;
const FORM_UID = process.env.FORM_UID;

router.get("/responses", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.typeform.com/forms/${FORM_UID}/responses`,
      {
        headers: {
          Authorization: `Bearer ${TYPEFORM_API_KEY}`,
        },
      }
    );
    const lastResponse =
      response.data.items[response.data.items.length - 1]["answers"];
    const birthday = lastResponse[0].date.slice(0, 10);
    const sex = lastResponse[1].choice.label;
    // const mode = lastResponse[2].choice.label;
    // const habitGoals = lastResponse[3].choices.labels; //Array of 3 things
    const weight = lastResponse[4].number;
    const bodyFat = lastResponse[5].number;
    const mainGoal = lastResponse[6].choice.label;
    const weightChange = Number(lastResponse[7].choice.label);

    res.json([birthday, sex, weight, bodyFat, mainGoal, weightChange]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching responses");
  }
});

// insert typeform data into database
router.post("/typeform/insert", (req, res) => {
  const newUserQueryStr = `
  UPDATE users
  SET birthdate = $2, sex = $3
  WHERE id = $1
  `;
  console.log("express", req.body);
  console.log([
    2,
    req.body[0],
    req.body[1],
    req.body[2],
    req.body[3],
    req.body[4],
    req.body[5],
  ]);
  db.query(newUserQueryStr, [2, req.body[0], req.body[1]])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log("express", err.message);
    });

  const newDetailsQueryStr = `
    INSERT INTO userDetails(weight, body_fat_percentage, main_goal, weight_change_goal, user_id)
    VALUES ($1, $2, $3, $4, $5)
    `;

  db.query(newDetailsQueryStr, [
    req.body[2],
    req.body[3],
    req.body[4],
    req.body[5],
    2,
  ])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log("express", err.message);
    });
});

module.exports = router;
