const { DataTypes } = require('sequelize')

module.exports = {
	up: async ({ context })	=> {
		await context.addColumn('blogs', 'year_written', {
			type: DataTypes.INTEGER,
			validate: {
				min: 1991,
				max: 2022
			}
		})
	},
	down: async ({ context }) => {
		await context.removeColumn('blogs', 'year_written') 
	}
}