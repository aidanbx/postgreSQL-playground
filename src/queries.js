require('dotenv').config();
const { Pool, Client } = require('pg');
const { request } = require('express');
const pool = new Pool();

const getTodos = (req, res) => {
  pool.query('SELECT * FROM todos ORDER BY id ASC', (err, results) => {
    if (err) {
      throw err;
    }
    res.header('Content-Type', 'text/json');
    res.status(200).send(JSON.stringify(results.rows, null, 2));
  });
};

const getTodoById = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    res.header('Content-Type', 'text/json');
    res
      .status(400)
      .send(
        JSON.stringify(
          { error: 'BAD REQUEST', reason: 'id must be an int' },
          null,
          2
        )
      );
  } else {
    pool.query('SELECT * FROM todos WHERE id= $1', [ id ], (err, results) => {
      if (err) {
        throw err;
      }
      res.header('Content-Type', 'text/json');
      res.status(200).send(JSON.stringify(results.rows, null, 2));
    });
  }
};

const createTodo = (req, res) => {
  const { title, complete } = req.body;

  pool.query(
    'INSERT INTO todos ( title, complete) VALUES ($1, $2)',
    [ title, complete ],
    (err, results) => {
      if (err) {
        throw err;
      }
      res.header('Content-Type', 'text/json');
      res.status(201).send(`Todo added with ID: ${results.insertID}`);
    }
  );
};

const updateTodo = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, complete } = req.body;

  if (Number.isNaN(id)) {
    res.header('Content-Type', 'text/json');
    res
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
      'UPDATE todos SET title = $1, complete = $2 WHERE id = $3',
      [ title, complete, id ],
      (err, results) => {
        if (err) {
          throw err;
        }
        res.header('Content-Type', 'text/json');
        res.status(200).send(`Todo updated with ID: ${id}`);
      }
    );
  }
};

const deleteTodo = (req, res) => {
  const id = parseInt(req.params.id);
  if (Number.isNaN(id)) {
    res.header('Content-Type', 'text/json');
    res
      .status(400)
      .send(
        JSON.stringify(
          { error: 'BAD REQUEST', reason: 'id must be an int' },
          null,
          2
        )
      );
  } else {
    pool.query('DELETE FROM todos WHERE id=$1', [ id ], (err, results) => {
      if (err) {
        throw err;
      }
      res.header('Content-Type', 'text/json');
      res.status(200).send(`Todo deleted with ID: ${id}`);
    });
  }
};

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};
