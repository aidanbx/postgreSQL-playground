const express = require('express');
const path = require('path');
const { response } = require('express');
const db = require('./src/queries');

const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();

if (dotenv.error) {
  throw dotenv.error;
}

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended : true
  })
);

app.use((req, res, next) => {
  res.set({
    'Content-Type'                 : 'text/json',
    'Acces-Control-Allow-Origin'   : 'https://abarbieux.com',
    'Access-Control-Allow-Headers' :
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods' : 'GET, POST, PUT, DELETE'
  });
  next();
});
// console.log(dotenv.parsed);

app.use(express.static(path.join(__dirname, 'src')));

app.get('/api/', (req, res, next) => {
  res.send(
    JSON.stringify(
      {
        info     : 'Todolist API',
        commands : {
          getTodos    : 'get /todos',
          getTodoById : 'get /todos/:id',
          createTodo  : 'post /todos',
          updateTodo  : 'put /todos/:id',
          deleteTodo  : 'delete /todos/:id'
        }
      },
      null,
      2
    )
  );
  next();
});

app.get('/api/todos', db.getTodos);
app.get('/api/todos/:id', db.getTodoById);
app.post('/api/todos', db.createTodo);
app.put('/api/todos/new/:id', db.updateTodo);
app.put('/api/todos/:id', db.toggleTodo);
app.delete('/api/todos/:id', db.deleteTodo);

module.exports = app;
