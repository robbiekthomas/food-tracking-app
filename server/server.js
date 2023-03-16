// load .env data into process.env
require("dotenv").config();

const express = require("express");

const app = express();
const port = 8002;

//database
const dbClient = require("./db/connection");

// middleware
app.use(express.json());

//routes
const databaseController = require('./routes/dbController');

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
