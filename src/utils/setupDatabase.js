const { databaseName } = require('../config')
const pool = require('./database')

const setupDatabase = async () => {
  // Create database
  await pool.query(`CREATE DATABASE IF NOT EXISTS ${databaseName};`)

  // Create user table
  await pool.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.user (
    id INT NOT NULL AUTO_INCREMENT,
    name CHAR(60) NOT NULL,
    email CHAR(80) NOT NULL,
    password VARCHAR(120) NOT NULL,
    PRIMARY KEY (id),
    UNIQUE INDEX email_UNIQUE (email ASC) VISIBLE);`)

  // Create customer table
  await pool.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.customer (
      id INT NOT NULL AUTO_INCREMENT,
      user_id INT NOT NULL,
      name CHAR(60) NOT NULL,
      email CHAR(80),
      phone INT,
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES user(id));`)

  // Create marking table
  await pool.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.marking (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    name CHAR(60) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES user(id));`)

  // Create range table
  await pool.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.range (
    id INT NOT NULL AUTO_INCREMENT,
    marking_id INT NOT NULL,
    min INT NOT NULL,
    max INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (marking_id) REFERENCES marking(id));`)

  // Create ink table
  await pool.query(`CREATE TABLE IF NOT EXISTS ${databaseName}.ink (
    id INT NOT NULL AUTO_INCREMENT,
    range_id INT NOT NULL,
    name CHAR(40) NOT NULL,
    price INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (range_id) REFERENCES ${'`range`'}(id));`)

  console.log('Database setup complete');

}

module.exports = setupDatabase;
