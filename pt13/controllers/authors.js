const router = require('express').Router()
const { Blog } = require('../models')
const { sequelize } = require('../models/blog')

router.get('/', async (req, res) => {
	const blogs = await Blog.findAll({
		group: 'author',
		attributes: [
			'author',
			[sequelize.fn('COUNT', sequelize.col('id')), 'articles'],
			[sequelize.fn('SUM', sequelize.col('likes')), 'likes']
		],
		order:[[sequelize.fn('SUM', sequelize.col('likes')), 'DESC']]
	})
	return res.json(blogs)
})

module.exports = router