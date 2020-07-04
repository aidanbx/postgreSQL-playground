require('dotenv').config();
const { Pool, Client } = require('pg');
const pool = new Pool();

const getTodos = (req, res) => {
  pool.query('SELECT * FROM todos ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200);
    res.header('Content-Type', 'text/json');
    res.send(JSON.stringify(results.rows, null, 2));
  });
};

module.exports = {
  getTodos
};
