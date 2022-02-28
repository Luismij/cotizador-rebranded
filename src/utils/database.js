const mysql = require('mysql');
const { promisify } = require('util');
const { databaseConfig } = require('../config')

const pool = mysql.createPool(databaseConfig);

/**
 * Connect to MySQL Database
 */
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    else if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    } else {
      console.error(err);
    }
    return
  }

  if (connection) connection.release();
  console.log('DB is Connected');
  return;
});

// Promisify Pool Querys
pool.query = promisify(pool.query);

module.exports = pool;
