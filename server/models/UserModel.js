module.exports = (database, Sequelize) => {
	let User = database.define('User', {
		firstName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false
		},
		username: {
			type: Sequelize.STRING
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false
		},
		role: {
			type: Sequelize.JSON,
		},
		lastConnexion: {
			type: Sequelize.DATE,
		}
	});

	return User;
}