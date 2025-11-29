const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  password: "lucki",
  host: "localhost",
  port: 5432,
  database: "sensvolt"
});

module.exports = pool;
