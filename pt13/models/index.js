const Blog = require('./blog')
const User = require('./user')
const ReadingList = require('./readingList')
const Session = require('./session')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: ReadingList, as: 'reading_list' })
Blog.belongsToMany(User, { through: ReadingList, as: 'users_added' })

module.exports = {
	Blog,
	User,
	ReadingList,
	Session
}