const express = require("express");
const router = express.Router();
const db = require("../db/connection");

//update mode in database
router.post("/", (req, res) => {

  const r = req.body;

  const str = `
      UPDATE users 
      SET
        mode = $1
      WHERE id = $5
  `;

  db.query(str, [r.mode, r.id])
    .then((result) => {
      return result.rows[0]
    })
    .catch((err) => {
      console.log(err.message);
    })
});