const router = require('express').Router()
const { User, Blog, ReadingList } = require('../models')

router.get('/', async (req, res) => {
	const users = await User.findAll({
		include: {
			model: Blog,
			attributes: { exclude: ['userId'] }
		}
	})
	return res.status(200).json(users)
})

router.post('/', async (req, res) => {
	const newUser = await User.create(req.body)
	return res.status(200).json(newUser)
})

router.get('/:id', async (req, res) => {
	let where = {}
	if(req.query.read){
		where.read = req.query.read
	}
	const user = await User.findByPk(req.params.id, {
		attributes: ['username', 'name'],
		include: [
			{
				model: Blog,
				as: 'reading_list',
				attributes: { 
					exclude: ['createdAt', 'updatedAt', 'userId']
				},
				through: { 
					attributes: {
						exclude: ['blogId', 'userId']
					},
					where
				},
			}
		],
	})
	if(user) {
		return res.status(200).json(user)
	} else {
		return res.status(404).end()
	}
})

router.put('/:username', async (req, res) => {
	const user = await User.findOne({
		where: {
			username: req.params.username
		}
	}) 
	if(user) {
		user.username = req.body.username
		await user.save()
		return res.status(200).json(user)
	} else {
		return res.status(404).end()
	}
})

module.exports = router