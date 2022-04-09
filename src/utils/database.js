const mongoose = require('mongoose')
const { mongoDBURL } = require('../config')
const Discount = require('../models/Discount')

mongoose
  .connect(mongoDBURL)
  .then(() => console.log('DB is connected')).then(async () => {
    try {
      const discount = new Discount()
      await discount.save()
    } catch (error) {
      if (error.code === 11000) console.log('Discount already created');
    }
  })
  .catch((err) => console.log(err));
