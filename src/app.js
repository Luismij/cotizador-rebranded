const express = require('express')
const cors = require('cors')
const http = require('http')
const morgan = require('morgan')
const { port, swaggerSpec } = require('./config')
const routes = require('./routes')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const { setup } = require('./setup')

require('./utils/updateProducts')
require('./utils/database')

const app = express()

const server = http.createServer(app)

//setup()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

routes(app)

server.listen(port), () => {
  console.log('Server is listening at port' + port)
}
