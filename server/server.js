// load .env data into process.env
//require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');


const app = express();

const port = 8000;


// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send('hello world from express');
})

//import router
const dashboardController = require('./routes/dashboardRoute');
const trackerController = require('./routes/trackerRoute');
const contextController = require('./routes/contextRoute');

//use router
app.use('/api/dashboard', dashboardController);
app.use('/api/dashboard/weightGraph', dashboardController);
app.use('/api/dashboard/stackedMacroGraph', dashboardController);
app.use('/api/dashboard/stackedProteinGraph', dashboardController);
app.use('/api/dashboard/foodReflection', dashboardController);
app.use('/api/dashboard/mood', dashboardController);
app.use('/api/mode', contextController);
app.use('/api/dashboard/goalStreak', dashboardController);

app.use('/api/tracker', trackerController);
app.use('/api/tracker/trackerDashboardMacros', trackerController);
app.use('/api/tracker/foodLogOfSelectedDay', trackerController);
app.use('/api/tracker/upDateTrackerItems', trackerController);
app.use('/api/tracker/qualitativeTrackerDashboard', trackerController);
app.use('/api/tracker/hungerHistory', trackerController);


app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
