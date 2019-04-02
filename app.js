require('dotenv').config()
require('express-async-errors')

const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compression = require('compression')
const methodOverride = require('method-override')

const app = express()

const routes = require('./src/routes')
require('./src/models')

app.use(helmet())
app.use(
  morgan('tiny', {
    skip: (req, res) => req.originalUrl === '/favicon.ico'
  })
)
app.use(compression())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(methodOverride())

app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/', routes)

app.use((req, res, next) => {
  const error = new Error('We are looking for your page,. but we can\'t find it')
  error.status = 404
  error.title = 'Page Not Found'
  next(error)
})

app.use((err, req, res, next) => {
  console.error(`${req.method} :: ${req.path} :: error :: ${err}`)
  console.error(err)
  if (process.env.NODE_ENV !== 'development') sendToChannel(err, req)
  res.status(err.status || 500).json({ error: err.message })
})

module.exports = app
