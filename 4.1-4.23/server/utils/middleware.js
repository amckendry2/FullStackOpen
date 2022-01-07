const logger = require('./logger')

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
    logger.error(err.name)
    next(err)
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}