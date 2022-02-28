const pool = require('../utils/database')
const productQueries = require('../querys/product.query');

/**
 * Function that allows to create a new customer.
 * @returns {Object} Success message or error message
 */
const getProducts = async (req, res) => {
  try {
    const products = await pool.query(productQueries.getProductsQuery());
    return res.status(200).json(products)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  getProducts,
}