const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context }) => {
		await context.createTable('reading_lists', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			user_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'users', key: 'id' }
			},
			blog_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: { model: 'blogs', key: 'id' }
			},
			read: {
				type: DataTypes.BOOLEAN,
				default: false
			}
		})
	},
	down: async ({ context }) => {
		await context.dropTable('reading_lists')
	}
}