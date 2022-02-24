const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context }) => {
		await context.addColumn('users', 'disabled', {
			type: DataTypes.BOOLEAN,
			default: false
		})
	},
	down: async({ context }) => {
		await context.removeColumn('users', 'disabled')
	}
}