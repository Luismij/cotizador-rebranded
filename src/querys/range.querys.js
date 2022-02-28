const { databaseName } = require('../config')

/**
 * Function that returns the createRange query
 * @param {Number} marking_id 
 * @param {Number} min 
 * @param {Number} max 
 * @returns createRange query
 */
const createRangeQuery = (marking_id, min, max) => `
  INSERT INTO ${databaseName}.range (marking_id, min, max)
  VALUES (${marking_id}, ${min}, ${max});
`

/**
 * Function that returns the getRangesByMarkingId query
 * @param {*} markingId 
 * @returns getRangesByMarkingId query
 */
const getRangesByMarkingIdQuery = (markingId) => `
 SELECT * FROM ${databaseName}.range WHERE marking_id = ${markingId};
`

module.exports = {
  createRangeQuery,
  getRangesByMarkingIdQuery
}
