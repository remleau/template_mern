const models = require('./models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

let database = new Sequelize(
  "database",
  "username",
  "password",
  {
    host: '',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const User = models.UserModel(database, Sequelize);

const init = async () => {
	await database.sync({ force: true }) // force true will drop the table if it already exists
	.then(() => {
		User.create({
			firstName: 'Rémy',
			lastName: 'Groleau',
			username: 'remleau',
			email: 'remleau@gmail.com',
			password: bcrypt.hashSync('allo1234', 8)
		});
		User.create({
			firstName: 'Barry',
			lastName: 'Allen',
			username: 'flash',
			email: 'fastest@man.alive',
			password: bcrypt.hashSync('flash', 8)
		});
	});
}

module.exports = {
	init,
	User
};