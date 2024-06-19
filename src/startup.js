const bodyParser = require('body-parser')
const helmet = require('helmet')
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config({
  path: __dirname + '/../.env'
})
const { loadControllers, scopePerRequest, inject } = require('awilix-express')
require('express-async-errors')

// function middleware(path) {
//   return inject(require(path))
// }
const allowedOrigins = ['http://localhost:5173']

module.exports = async (config) => {
  var app = express()
  app.use(helmet())
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Không cho phép nguồn gốc'))
        }
      },
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
      maxAge: 86400
    })
  )
  app.use(cookieParser())
  app.use(bodyParser.json({ limit: '1mb' }))
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: false }))

  const container = await require('./infrastructure/container').container(
    config
  )

  app.use(scopePerRequest(container))
  app.use(loadControllers('./controllers/*Controller.js'))

  return {
    app,
    config
  }
}
