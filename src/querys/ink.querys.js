const { databaseName } = require('../config')

/**
 * Function that returns the createInk query
 * @param {Number} range_id 
 * @param {String} name 
 * @param {Number} price 
 * @returns createInk query
 */
const createInkQuery = (range_id, name, price) => `
  INSERT INTO ${databaseName}.ink (range_id, name, price)
  VALUES (${range_id}, "${name}", ${price});
`

/**
 * Function that returns the getInksByRangeId query
 * @param {*} rangeId 
 * @returns getInksByRangeId query
 */
 const getInksByRangeIdQuery = (rangeId) => `
 SELECT * FROM ${databaseName}.ink WHERE range_id = ${rangeId};
`

module.exports = {
  createInkQuery,
  getInksByRangeIdQuery
}
