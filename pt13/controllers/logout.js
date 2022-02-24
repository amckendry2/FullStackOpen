const router = require('express').Router()
const { Session } = require('../models')

router.post('/', async (req, res) => {
	if(!req.body.token){
		return res.status(401).json({
			error: 'logout failed'
		})
	}
	await Session.destroy({ where: { token: req.body.token } })
	return res.status(200).send('logout successful')
})

module.exports = router