const pool = require('../utils/database')
const customerQueries = require('../querys/customer.querys');
const checkParams = require('../utils/checkParams')

/**
 * Function that allows to create a new customer.
 * @returns {Object} Success message or error message
 */
const createCustomer = async (req, res) => {
  const { userId } = req
  const { name, email, phone } = req.body

  const correct = checkParams(['name'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })
  console.log(customerQueries.createCustomerQuery(userId, name, email, phone));
  try {
    await pool.query(customerQueries.createCustomerQuery(userId, name, email, phone));
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong' })
  }
  return res.status(200).json({ message: 'Customer created!' })
}

/**
 * Function to get all customers of a user
 * @returns {Array} customer array
 */
const getCustomersByUserId = async (req, res) => {
  const { userId } = req

  try {
    const customers = await pool.query(customerQueries.getCustomersByuserIdQuery(userId))
    return res.json(customers);
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function to get all customers of a user
 * @returns {Array} customer array
 */
const getCustomerById = async (req, res) => {
  const { userId } = req
  const { id } = req.params

  const correct = checkParams(['id'], req.params)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })

  try {
    const customers = (await pool.query(customerQueries.getCustomerByIdQuery(id, userId)))[0]
    return res.json(customers);
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function to delete a customers of a user
 * @returns {Object} message
 */
const deleteCustomerById = async (req, res) => {
  const { userId } = req
  const { id } = req.params

  const correct = checkParams(['id'], req.params)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })

  try {
    const result = (await pool.query(customerQueries.deleteCustomerByIdQuery(id, userId)))
    if (result.affectedRows === 0) return res.status(400).json({ message: 'Customer not found' });
    return res.status(200).json({ message: 'Client removed successfully' });
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = {
  createCustomer,
  getCustomersByUserId,
  getCustomerById,
  deleteCustomerById
}
