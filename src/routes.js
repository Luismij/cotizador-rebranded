const user = require('./routes/user.routes')
const customer = require('./routes/customer.routes')
const marking = require('./routes/marking.routes')
const product = require('./routes/product.routes')
const image = require('./routes/image.routes')

const routes = (app) => {
  app.use('/user', user)
  app.use('/customer', customer)
  app.use('/marking', marking)
  app.use('/product', product)
  app.use('/image', image)
}

module.exports = routes;
