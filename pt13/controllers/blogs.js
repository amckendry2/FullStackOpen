const { Router } = require('express')
const { Blog, User } = require('../models')
const { Op } = require('sequelize')

const router = Router()

router.get('/', async (req, res) => {
	let where = {}
	if (req.query.search) {
		where = {
			[Op.or]: {
				title: {
					[Op.substring]: req.query.search
				},
				author: {
					[Op.substring]: req.query.search
				}
			}
		}
	}

	const blogs = await Blog.findAll({
		include: {
			model: User,
			attributes: ['name']
		},
		attributes: { exclude: ['userId'] },
		where,
		order: [['likes', 'DESC']]	
	})
	return res.json(blogs)
})

router.post('/', async (req, res) => {
	if(!req.token){
		return res.status(401).end()
	}
	const user = await User.findByPk(req.token.id)
	if(!user){
		throw new Error("user authentication failed")
	}
	const blog = await Blog.create({ ...req.body, userId: user.id })
	return res.json(blog)
})

const blogFinder = async (req, res, next) => {
	req.blog = await Blog.findByPk(req.params.id)
	next()
}

const blogIdRouter = Router()

blogIdRouter.delete('/', async (req, res) => {
	console.log('token', req.token)
	console.log('blog', req.blog)
	if (req.blog && req.token) {
		if(req.blog.userId === req.token.id){
			console.log('destroying blog')
			await req.blog.destroy()
		} else {
			return res.status(401).end()
		}
	}
	return res.status(204).end()
})

blogIdRouter.put('/', async (req, res) => {
	if (req.blog) {
		req.blog.likes = req.body.likes
		await req.blog.save()
		return res.status(200).json(req.blog)
	} else {
		return res.status(404).end()
	}
})

router.use('/:id', blogFinder, blogIdRouter)

module.exports = router