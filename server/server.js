// load .env data into process.env
//require("dotenv").config();

const express = require("express");
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


const port = 8000;
const users = require('./routes/test')


// middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('hello world from express');
})

//import router
const databaseController = require('./routes/dbController');

//use router
app.use('/api/test', databaseController);


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
