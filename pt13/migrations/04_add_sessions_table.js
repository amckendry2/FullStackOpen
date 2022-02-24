const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context }) => {
		await context.createTable('sessions', {
			token: {
				type: DataTypes.TEXT,
				primaryKey: true,
			},
			username: {
				type: DataTypes.TEXT,
				unique: true
			},
			created_at: {
				type: DataTypes.DATE
			},
			updated_at: {
				type: DataTypes.DATE
			}
		})
	},
	down: async ({ context }) => {
		await context.dropTable('sessions')
	}
}