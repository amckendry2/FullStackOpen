const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleWare = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then( () => logger.info('connected to MongoDB'))
    .catch( err => logger.error('error connecting to MongoDB:', err.message))

app.use(cors())
//app.use(express.static('build'))
app.use(express.json())
app.use(middleWare.requestLogger)

app.use('/api/blogs', middleWare.getTokenFrom, middleWare.userExtractor, blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleWare.unknownEndpoint)
app.use(middleWare.errorHandler)

module.exports = app