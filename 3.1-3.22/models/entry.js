const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then(() => {
        console.log('connected to MonboDB')
    })
    .catch(err => {
        console.log(err)
    })

const entrySchema = new mongoose.Schema({
    name: {type: String, minLength: 3, required: true, unique: true},
    number: {type: Number, minLength: 8, required: true}
})

entrySchema.set('toJSON', {
    transform:(_, retObj) => {
        retObj.id = retObj._id.toString()
        delete retObj._id
        delete retObj.__v
    }
})

module.exports = mongoose.model('Entry', entrySchema.plugin(uniqueValidator))
