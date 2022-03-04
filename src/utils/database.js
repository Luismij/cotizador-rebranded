const mongoose = require('mongoose')
const { mongoDBURL } = require('../config')

mongoose
  .connect(mongoDBURL)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err));
