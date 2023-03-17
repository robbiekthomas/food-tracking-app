//PG database client / connection setup
const { Pool } = require('pg');
console.log('pool 1', Pool);

const dbParams = {
  host: 'localhost',
  port: 5432,
  user: 'nutritionship',
  // password: process.env.DB_PASS,
  database: 'final'
};



const db = new Pool(dbParams);


db.connect()
  .then(() => { console.log('connected to db') })
  .catch((err) => { console.log(err) });
console.log(db);
module.exports = db;