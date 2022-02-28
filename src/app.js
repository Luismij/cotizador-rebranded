const express = require('express')
const cors = require('cors')
const http = require('http')
const morgan = require('morgan')
const { port, swaggerSpec } = require('./config')
const routes = require('./routes')
const setupDatabase = require('./utils/setupDatabase')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const app = express()

const server = http.createServer(app)

setupDatabase()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use('/api-doc', swaggerUI.serve, swaggerUI.setup(swaggerJsDoc(swaggerSpec)))

routes(app)

server.listen(port), () => {
  console.log('Server is listening at port' + port)
}
