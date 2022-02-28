const { databaseName } = require('../config')

/**
 * Function that returns the createMarking query
 * @param {Number} userId 
 * @param {String} name 
 * @returns createMarking query
 */
const createMarkingQuery = (userId, name) => `
  INSERT INTO ${databaseName}.marking (user_id, name)
  VALUES (${userId}, "${name}");
`

/**
 * Function that returns the getMarkingsByUserId query
 * @param {*} userId 
 * @returns getMarkingsByUserId query
 */
const getMarkingsByUserIdQuery = (userId)=>`
  SELECT * FROM ${databaseName}.marking WHERE user_id = ${userId};
`


module.exports = {
  createMarkingQuery,
  getMarkingsByUserIdQuery
}
