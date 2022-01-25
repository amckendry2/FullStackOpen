const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const requestLogger = (req, _, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path:' , req.path)
    logger.info('Body: ', req.body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

const errorHandler = (err, req, res, next) => {
    if(err.name === "ValidationError"){
        return res.status(400).json({error: err.message})
    }
    if(err.name === "MongoServerError"){
        return res.status(400).json({error: err.message})
    }
    logger.error(err.name)
    next(err)
}

const getTokenFrom = (req, res, next) => {
  const auth = req.get('authorization')
  if(auth && auth.toLowerCase().startsWith('bearer ')){
    req.token =  auth.substring(7)
  }
  next();
}

const userExtractor = async (req, res, next) => {
    if (req.token) {
        const tokenData = jwt.verify(req.token, process.env.SECRET)
        if (!tokenData.id) {
            return res.status(401).send({ error: 'invalid token' })
        }
        req.user = await User.findById(tokenData.id)
    }
    next()
}


module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    getTokenFrom,
    userExtractor
}