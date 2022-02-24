const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../utils/config')
const { User, Session } = require('../models')

router.post('/', async (req, res) => {
	const body = req.body
	const user = await User.findOne({
		where: {
			username: body.username
		}
	})

	const passwordCheck = body.password = 'secret'

	if(!(user && passwordCheck)){
		return res.status(401).json({
			error: 'invalid username or password'
		})
	}

	if(user.disabled){
		return res.status(401).json({
			error: 'user priveleges disabled'
		})
	}

	const token = jwt.sign({
		username: user.username,
		id: user.id
	}, SECRET)

	await Session.destroy({ where: { username: user.username }})
	await Session.create({ token: token, username: user.username })

	res
		.status(200)
		.json({ token, username: user.username, name: user.name })


})

module.exports = router