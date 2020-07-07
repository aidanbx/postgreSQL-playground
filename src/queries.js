require('dotenv').config();
const { Pool, Client } = require('pg');
const { response } = require('../todoApi');
const pool = new Pool();

const todoListTable = process.env.TODOLIST_TABLE || 'todolist';

const getTodos = (request, response, next) => {
  // console.log(todoListTable);
  pool.query(
    `SELECT * FROM ${todoListTable} ORDER BY id ASC`,
    (err, results) => {
      if (err) {
        throw err;
      }
      // console.log(JSON.stringify(results.rows, null, 2));
      response.status(200).send(JSON.stringify(results.rows, null, 2));
    }
  );
};

const getTodoById = (request, response, next) => {
  const id = parseInt(request.params.id);

  if (Number.isNaN(id)) {
    response
      .status(400)
      .send(
        JSON.stringify(
          { error: 'BAD REQUEST', reason: 'id must be an int' },
          null,
          2
        )
      );
  } else {
    pool.query(
      'SELECT * FROM $1 WHERE id= $2',
      [ todoListTable, id ],
      (err, result) => {
        if (err) {
          throw err;
        }
        response.status(200).send(JSON.stringify(result.rows[0], null, 2));
        next();
      }
    );
  }
  next();
};

const createTodo = (request, response, next) => {
  let { title, complete } = request.body;

  if (complete == null) {
    complete = false;
  }
  // console.log(request.body);
  pool.query(
    `INSERT INTO ${todoListTable} ( title, complete) VALUES ($1, $2) RETURNING id`,
    [ title, complete ],
    (err, result) => {
      if (err) {
        throw err;
      }
      newTodo = {
        id        : result.rows[0].id,
        title     : title,
        completed : complete
      };
      // console.log(newTodo);
      response.status(201).send(newTodo);
    }
  );
  next();
};

const updateTodo = (request, response, next) => {
  const id = parseInt(request.params.id);
  const { title, complete } = request.body;

  if (Number.isNaN(id)) {
    response
      .status(400)
      .send(
        JSON.stringify(
          { error: 'BAD REQUEST', reason: 'id must be an int' },
          null,
          2
        )
      );
  } else {
    pool.query(
      `UPDATE ${todoListTable} SET title = $1, complete = $2 WHERE id = $3`,
      [ title, complete, id ],
      (err, result) => {
        if (err) {
          throw err;
        }
        response.status(200).send(`Todo updated with ID: ${id}`);
      }
    );
  }
  next();
};

const deleteTodo = (request, response, next) => {
  const id = parseInt(request.params.id);

  if (Number.isNaN(id)) {
    response
      .status(400)
      .send(
        JSON.stringify(
          { error: 'BAD REQUEST', reason: 'id must be an int' },
          null,
          2
        )
      );
  } else {
    pool.query(
      `DELETE FROM ${todoListTable} WHERE id=$1`,
      [ id ],
      (err, result) => {
        if (err) {
          throw err;
        }
        // console.log(`Todo deleted with ID: ${id}`);
        response.status(200).send(`Todo deleted with ID: ${id}`);
      }
    );
  }
  next();
};

const toggleTodo = (request, response, next) => {
  const id = parseInt(request.params.id);
  if (Number.isNaN(id)) {
    response
      .status(400)
      .send(
        JSON.stringify(
          { error: 'BAD REQUEST', reason: 'id must be an int' },
          null,
          2
        )
      );
  } else {
    pool.query(
      `UPDATE ${todoListTable} SET complete= NOT complete WHERE ID = $1`,
      [ id ],
      (err, result) => {
        if (err) {
          throw err;
        }
        // console.log(`Todo deleted with ID: ${id}`);
        response.status(200).send(`Todo toggled with id: ${id}`);
      }
    );
  }
  next();
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodo
};
