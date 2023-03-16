const express = require("express");

const app = express();
const port = 8002;

//database
const dbClient = require("./db/connection");

// middleware
app.use(express.json());

//routes

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
