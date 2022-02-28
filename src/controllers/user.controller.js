const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config')
const pool = require('../utils/database')
const bcrypt = require('bcryptjs');
const userQueries = require('../querys/user.querys');
const checkParams = require('../utils/checkParams')

/**
 * Function that allows to create a new user.
 * @returns {Object} Success message or error message
 */
const signUp = async (req, res) => {
  const { name, email, password } = req.body

  const correct = checkParams(['name', 'email', 'password'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })

  const hash = await bcrypt.hash(password, 10);
  try {
    await pool.query(userQueries.signUpQuery(name, email, hash));
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ message: 'User already exists' })
    return res.status(400).json({ message: 'Something went wrong' })
  }
  return res.status(200).json({ message: 'User created!' })
}

/**
 * Function to authenticate a user through an email and a password
 * @returns {Object} user info and jwt or error message
 */
const logIn = async (req, res) => {
  const { email, password } = req.body

  const correct = checkParams(['email', 'password'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })
  try {
    const userFound = (await pool.query(userQueries.userByEmailQuery(email)))[0]
    if (!userFound) return res.status(400).json({ message: 'Wrong email' })
    const match = await bcrypt.compare(password, userFound.password)
    if (!match) return res.status(401).json({ message: "Wrong password" })
    const tokenjwt = jwt.sign({ id: userFound.id }, secretJWT)
    return res.json({ user: userFound, jwt: tokenjwt });
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function to authenticate a user through a JWT
 * @returns {Object} user info or error message
 */
const logInJWT = async (req, res) => {
  try {
    const userId = req.userId;
    let user = (await pool.query(userQueries.userByIdQuery(userId)))[0]
    if (!user) return res.status(400).json({ message: 'User not found' })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

module.exports = {
  signUp,
  logIn,
  logInJWT
}
