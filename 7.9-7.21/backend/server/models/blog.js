const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: String
    }
  ]
})

blogSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)