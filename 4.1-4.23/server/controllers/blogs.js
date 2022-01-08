const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const data = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(data)
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const user = req.user
  if (!body.likes) {
    body.likes = 0
  }
  const blog = new Blog({...body, user: user.id})
  const data = await blog.save()
  user.blogs = user.blogs.concat(data.id)
  await user.save()
  res.status(201).json(data)
})

blogsRouter.put('/:id', async (req, res, next) => {
    const updatedData = await Blog.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(updatedData)
})

blogsRouter.delete('/:id', async(req, res, next) => {
    const blog = await Blog.findById(req.params.id)
    if(blog.user.toString() !== req.user.id.toString()){
      return res.status(403).send({error: "User does not have permission to delete post"})
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter
