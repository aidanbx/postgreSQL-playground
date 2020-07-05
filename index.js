const express = require('express');
const path = require('path');
const { response } = require('express');
const db = require('./src/queries');

const app = express();
const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error;
}
// console.log(dotenv.parsed);

app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.header('Content-Type', 'text/json');
  res.send(
    JSON.stringify(
      {
        info     : 'Todolist API',
        commands : {
          getTodos    : 'get /todos',
          getTodoById : 'get /todos/:id',
          createTodo  : 'post /todos',
          updateTodo  : 'post /todos/:id',
          deleteTodo  : 'delete /todos/:id'
        }
      },
      null,
      2
    )
  );
});

app.get('/todos', db.getTodos);
app.get('/todos/:id', db.getTodoById);
app.post('/todos', db.createTodo);
app.post('/todos/:id', db.updateTodo);
app.delete('/todos/:id', db.deleteTodo);

app.listen(process.env.PORT || 8080, () =>
  console.log(
    `Website running at http://${process.env.IP || 'localhost'}:${process.env
      .PORT || '8080'}`
  )
);
