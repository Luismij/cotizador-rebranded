const { databaseName } = require('../config')

/**
 * Function that returns the getProducts query
 * @returns getProducts query
 */
const getProductsQuery = ()=>`
  SELECT * FROM ${databaseName}.product;
`


module.exports = {
  getProductsQuery
}
