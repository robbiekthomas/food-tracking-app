//PG database client / connection setup
const { Pool } = require('pg');

require('dotenv').config();

console.log('pool 1', Pool);

const dbParams = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};



const db = new Pool(dbParams);


db.connect()
  .then(() => { console.log('connected to db') })
  .catch((err) => { console.log(err) });
console.log(db);
module.exports = db;