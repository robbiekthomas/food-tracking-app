const express = require("express");
const router = express.Router();
const db = require('../db/connection');


router.get("/", (req, res) => {
  console.log('getting data!');

  const userQueryStr = `
      SELECT *
      FROM users
      `;
  db.query(userQueryStr)
    .then((result) => {
      const data = result.rows[0];
      res.json(data);
    })
    .catch((err) => {
      console.error(err);
    })
});

//update user information in db on profile edit
router.post('/user/insert', (req, res) => {
  const str = `
    INSERT INTO users (name)
    VALUES ($1)
    `;
  console.log('HIHIHIHI');
  const values = req.body.textValue;
  db.query(str, [textValue])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    })

});

router.post('/habitGoals/insert', (req, res) => {
  const habitQueryStr = `
    INSERT INTO habitGoals (name)
    VALUES ($1)
    `;
  console.log(req.body.textValue);
  const textValue = req.body.textValue;
  db.query(habitQueryStr, [textValue])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    })

});


module.exports = router;