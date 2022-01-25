const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response, next) => {
  const data = await Blog.find({}).populate('user', { username: 1, name: 1, blogs: 1 })
  response.json(data)
})

blogsRouter.post('/', async (req, res) => {
  const { body, user } = req
  if (!body.likes) {
    body.likes = 0
  }
  const newBlog = new Blog({...body, user: user.id})
  let updatedBlog = await newBlog.save()
  updatedBlog = await updatedBlog.populate('user', { username: 1, name: 1, blogs: 1 })
  user.blogs = user.blogs.concat(updatedBlog.id)
  await user.save()
  res.status(201).json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (req, res) => {
  const { body, params } = req
  if(body.comment.length === 0){
    return res.status(400).send({ error: "empty comment data" })
  }
  const blog = await Blog.findById(params.id)
  blog.comments.push(body.comment)
  console.log('blog', blog)
  await blog.save()
  res.json(blog)
})

blogsRouter.put('/:id', async (req, res, next) => {
    const newData = {...req.body, user: req.body.user.id}
    const updatedData = await Blog
      .findByIdAndUpdate(req.params.id, newData, {new: true})
      .populate('user', { username: 1, name: 1, blogs: 1 })
    res.json(updatedData)
})

blogsRouter.delete('/:id', async(req, res, next) => {
    console.log('req:',req.user)
    const blog = await Blog.findById(req.params.id)
    if(blog.user.toString() !== req.user.id.toString()){
      return res.status(403).send({error: "User does not have permission to delete post"})
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})

module.exports = blogsRouter
