require('dotenv').config()
const path = require('path')

const port = process.env.PORT

const secretJWT = process.env.SECRET_JWT

const databaseConfig = {
  connectionLimit: process.env.CONNECTION_LIMIT,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
}

const databaseName = process.env.DB_NAME

const swaggerSpec = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cotizador API',
      version: '1.0.0'
    }
  },
  apis: [`${path.join(__dirname, './routes/*.js')}`]
}

module.exports = {
  port,
  secretJWT,
  databaseConfig,
  databaseName,
  swaggerSpec
}
