const fs = require('fs')
const Discount = require('./models/Discount')

const setup = async () => {
  fs.mkdir('./uploads', (err) => console.log(err))
  await setTimeout(async () => {
    const res = await Discount.findById(1)
    console.log(res);
    console.log('1');
    if (!res) {
      const Discount = new Discount({})
      await Discount.save()
    }
  }, 15000);
}

module.exports = { setup }
