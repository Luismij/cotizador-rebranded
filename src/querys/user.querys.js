const { databaseName } = require('../config')

/**
 * Function that returns the signUp query
 * @param {String} name 
 * @param {String} email 
 * @param {String} password 
 * @returns signUp query
 */
const signUpQuery = (name, email, password) => `
  INSERT INTO ${databaseName}.user (name, email, password)
  VALUES ("${name}", "${email}", "${password}");
`
/**
 * Function that returns the userById query
 * @param {Number} id user id
 * @returns userById query
 */
const userByIdQuery = (id) => `
  SELECT id, name, email FROM ${databaseName}.user WHERE id = ${id};
`
/**
 * Function that returns the userByEmail query
 * @param {String} email user email
 * @returns userByEmail query
 */
const userByEmailQuery = (email) => `
SELECT id, name, email, password FROM ${databaseName}.user WHERE email = '${email}';
`

  module.exports = {
    signUpQuery,
    userByIdQuery,
    userByEmailQuery
  }
