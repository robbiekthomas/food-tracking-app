// load .env data into process.env
//require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

const port = 8000;
const users = require('./routes/test')

//database
//const dbClient = require("./db/connection");

// middleware
app.use(express.json());
app.use('/users', users);

//ROUTES
app.get('/', (req, res) => {
  res.send('hello world from express');
})
//const databaseController = require('./routes/dbController');

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
