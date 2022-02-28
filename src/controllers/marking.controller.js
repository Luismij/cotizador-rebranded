const pool = require('../utils/database')
const markingQueries = require('../querys/marking.querys');
const rangeQueries = require('../querys/range.querys');
const inkQueries = require('../querys/ink.querys');
const checkParams = require('../utils/checkParams')

/**
 * Function that allows to create a new marking.
 * @returns {Object} Success message or error message
 */
const createMarking = async (req, res) => {
  const { name, ranges } = req.body
  const { userId } = req

  // Check that all parameters are in the body
  const correct = checkParams(['name', 'ranges'], req.body)
  if (!correct) return res.status(400).json({ message: 'Missing parameters' })
  for (const range of ranges) {
    const correct1 = checkParams(['min', 'max', 'inks'], range)
    if (!correct1) return res.status(400).json({ message: 'Missing parameters' })
    for (const ink of range.inks) {
      const correct2 = checkParams(['name', 'price'], ink)
      if (!correct2) return res.status(400).json({ message: 'Missing parameters' })
    }
  }
  try {
    const markingId = (await pool.query(markingQueries.createMarkingQuery(userId, name))).insertId
    for (const range of ranges) {
      const rangeId = (await pool.query(rangeQueries.createRangeQuery(markingId, range.min, range.max))).insertId
      for (const ink of range.inks) {
        await pool.query(inkQueries.createInkQuery(rangeId, ink.name, ink.price))
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }

  return res.status(200).json({ message: 'Marking created successfully' })
}

/**
 * Function that allows to get the markings of a user.
 * @returns {Array || Object} Array of markings or error message
 */
const getMarkings = async (req, res) => {
  const { userId } = req

  let completeMarkings = []
  try {
    const markings = await pool.query(markingQueries.getMarkingsByUserIdQuery(userId))
    for (let i = 0; i < markings.length; i++) {
      const marking = markings[i];
      completeMarkings.push({ ...marking, ranges: [] })
      const ranges = await pool.query(rangeQueries.getRangesByMarkingIdQuery(marking.id))
      for (let j = 0; j < ranges.length; j++) {
        const range = ranges[j];
        const inks = await pool.query(inkQueries.getInksByRangeIdQuery(range.id))
        completeMarkings[i].ranges.push({ ...range, inks })
      }
    }
    
    return res.status(200).json(completeMarkings)
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: 'Something went wrong' })
  }
}

module.exports = {
  createMarking,
  getMarkings
}
