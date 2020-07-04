const express = require('express');
const path = require('path');
const { response } = require('express');
const db = require('./src/queries');

const app = express();
const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error;
}
console.log(dotenv.parsed);

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.json({ info: 'API TEST' });
});

app.get('/todos', db.getTodos);

app.listen(process.env.PORT || 8080, () =>
  console.log(
    `Website running at http://${process.env.IP || 'localhost'}:${process.env
      .PORT || '8080'}`
  )
);
