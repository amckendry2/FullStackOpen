const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response, next) => {
  const data = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(data)
})

blogsRouter.post('/', async (request, response, next) => {
  if (!request.body.likes) {
    request.body.likes = 0
  }
  const user = await User.findOne()
  const blog = new Blog(request.body)
  blog.user = user._id
  const data = await blog.save()
  user.blogs = user.blogs.concat(data._id)
  await user.save()
  response.status(201).json(data)
})

blogsRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedData = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedData)
  } catch(err) {
    next(err)
  }
  res.end()
})

blogsRouter.delete('/:id', async(req, res, next) => {
  try {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  } catch(err) {
    next(err)
  }
})

module.exports = blogsRouter
