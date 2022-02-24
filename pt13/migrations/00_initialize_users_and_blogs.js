const { DataTypes } = require('sequelize')

module.exports = {
	up: async({ context }) => {
		await context.createTable('users', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.TEXT,
				unique: true,
				allowNull: false,
				validate: {
					isEmail: true
				}
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			created_at: {
				type: DataTypes.DATE
			},
			updated_at: {
				type: DataTypes.DATE
			}
		})
		await context.createTable('blogs', {
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			author: {
				type: DataTypes.TEXT
			},
			url: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			title: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			likes: {
				type: DataTypes.INTEGER,
				defaultValue: 0
			},
			created_at: {
				type: DataTypes.DATE
			},
			updated_at: {
				type: DataTypes.DATE
			}
		})
		await context.addColumn('blogs', 'user_id', {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: { model: 'users', key: 'id' }
		})
	},
	down: async ({ context }) => {
		await context.dropTable('blogs')
		await context.dropTable('users')
	}
}