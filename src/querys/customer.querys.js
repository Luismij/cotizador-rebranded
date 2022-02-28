const { databaseName } = require('../config')

/**
 * Function that returns the signUp query
 * @param {String} name 
 * @param {String} email 
 * @param {Number} phone 
 * @returns signUp query
 */
const createCustomerQuery = (userId, name, email, phone) => `
  INSERT INTO ${databaseName}.customer (user_id, name${email ? (', email') : ''}${phone ? (', phone') : ''})
  VALUES (${userId}, "${name}"${email ? (', "' + email + '"') : ''}${phone ? (', "' + phone + '"') : ''});
`

/**
 * Function that returns the Customers By userId query
 * @param {*} userId 
 * @returns Customers By userId query
 */
const getCustomersByuserIdQuery = (userId) => `
  SELECT * FROM ${databaseName}.customer WHERE user_id = ${userId};
`

/**
 * Function that returns the Customers By id query
 * @param {*} id 
 * @param {*} userId 
 * @returns get Customers By id and userId query
 */
const getCustomerByIdQuery = (id, userId) => `
 SELECT * FROM ${databaseName}.customer WHERE id = ${id} and user_id = ${userId};
`

/**
 * Function that returns the delete Customers By id query
 * @param {*} id 
 * @param {*} userId 
 * @returns delete Customer By id and userId query
 */
const deleteCustomerByIdQuery = (id, userId) => `
 DELETE FROM ${databaseName}.customer WHERE id = ${id} and user_id = ${userId};
`

module.exports = {
  createCustomerQuery,
  getCustomersByuserIdQuery,
  getCustomerByIdQuery,
  deleteCustomerByIdQuery
}
