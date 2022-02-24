const jwt = require('jsonwebtoken')
const { SECRET } = require('./config')
const { User, Session } = require('../models')

const errorHandler = (err, req, res, next) => {
	if(err.name === 'SequelizeValidationError'){
		const errArray = err.errors.map(e => e.message)
		return res.json(errArray)
	}
	console.log(err.message)
	return res.send(`middleware caught error: ${err.message}`)
}

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = async (req, res, next) => {
	const auth = req.get('authorization')
	const isBearer = auth.toLowerCase().startsWith('bearer ')
	if(auth && isBearer) {
		try {
			const token = auth.substring(7)
			const session = await Session.findByPk(token)
			if(session){
				const decodedToken = jwt.verify(token, SECRET)
				const user = await User.findByPk(decodedToken.id)
				if(!user.disabled){
					req.token = decodedToken
				} else {
					console.log('got token from disabled user')
				}
			}
		} catch {
			res.status(401).json({ error: 'invalid token' })
		}
	} 
	next()
}

module.exports = exports = { errorHandler, unknownEndpoint, tokenExtractor }