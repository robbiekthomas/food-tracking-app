const express = require("express");

const app = express();
const port = 8002;

// middleware
app.use(express.json());

app.listen(port, () => {
  console.log(`app is listening on port ${port}`);
});
