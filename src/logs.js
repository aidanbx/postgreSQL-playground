require('dotenv').config();
const { Pool, Client } = require('pg');
const { request } = require('express');
const pool = new Pool();

const logRequest = (req, res) => {};

module.exports = {
  logRequest
};
