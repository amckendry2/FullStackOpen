const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  try {
    const data = await Blog.find({})
    response.json(data)
  } catch(err) {
    next(err)
  }
})

blogsRouter.post('/', async (request, response, next) => {
  if(!request.body.likes){
    request.body.likes = 0
  }
  const blog = new Blog(request.body)
  try {
    const data = await blog.save()
    response.status(201).json(data)
  } catch(err) {
    next(err)
  }
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
