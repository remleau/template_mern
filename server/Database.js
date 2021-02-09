const models = require('./models');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const config = require('./config');

let database = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
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
      lastName: 'Allan',
      username: 'Fastest man alive',
      email: 'speed@of.light',
      password: bcrypt.hashSync('allo1234', 8)
    });
	});
}

module.exports = {
	init,
	User
};