const jwt = require('jsonwebtoken')
const { secretJWT } = require('../config')
const bcrypt = require('bcryptjs');
const checkParams = require('../utils/checkParams')
const User = require('../models/User')

/**
 * Function that allows to create a new user.
 * @returns {Object} Success message or error message
 */
const signUp = async (req, res) => {
  const { password } = req.body

  const correct = checkParams(['name', 'email', 'password'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })

  const hash = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ ...req.body, password: hash })
    await newUser.save()
    return res.status(200).json({ message: 'User created!' })
  } catch (error) {
    return res.status(400).json({ message: 'Something went wrong', error })
  }
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
    const user = await User.findOne({ email }, '-_id').exec()
    if (!user) return res.status(400).json({ message: 'Wrong email' })
    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ message: "Wrong password" })
    const tokenjwt = jwt.sign({ id: user._id }, secretJWT)
    return res.json({ user, jwt: tokenjwt });
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function to authenticate a user through a JWT
 * @returns {Object} user info or error message
 */
const logInJWT = async (req, res) => {
  const userId = req.userId;

  try {
    let user = await User.findById(userId, '-_id').exec()
    if (!user) return res.status(400).json({ message: 'User not found' })
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

/**
 * Function that allows to edit a user
 * @returns message
 */
const editUser = async (req, res) => {
  const user = req.body
  const { userId } = req

  try {
    const { modifiedCount } = await User.updateOne({ _id: userId }, { $set: user }).exec()
    if (modifiedCount === 0) return res.status(400).json({ message: 'User not found' })
    return res.status(200).json({ message: 'User successfully edited' })
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  signUp,
  logIn,
  logInJWT,
  editUser
}
