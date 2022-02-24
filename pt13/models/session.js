const { Model, DataTypes } = require('sequelize')
const { sequelize } = require('../utils/db')

class Session extends Model {}

Session.init({
	token: {
		type: DataTypes.TEXT,
		primaryKey: true,
	},
	username: {
		type: DataTypes.TEXT,
		unique: true
	}
}, {
	sequelize,
	underscored: true,
	modelName: 'session'
})

module.exports = Session