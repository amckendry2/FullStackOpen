const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {type: String, minLength: 3, required: true, unique: true},
    passwordHash: String,
    name: {type: String, minLength: 3, required: true},
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Blog'
      }
    ]
})

userSchema.set('toJSON', {
  transform: (_, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    delete ret.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema.plugin(uniqueValidator))