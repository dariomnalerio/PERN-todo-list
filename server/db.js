const Pool = require("pg").Pool; // Importing the Pool object from the pg module
const pool = new Pool({
  user: "postgres",
  password: "123",
  host: "localhost",
  port: 5432,
  database: "perntodo",
});

module.exports = pool;
