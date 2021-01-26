var router = require('express').Router();
const { User } = require('./../Database.js');

router.post('/all', function (req, res) {

	User.findAll().then(users => {

		let users_data = []; 
		users.forEach(user => {
			users_data.push({
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				username: user.username,
				lastConnexion: user.lastConnexion,
				role: user.role,
			});
		});
		res.status(200).send(users_data);

	}).catch((err) => {
		res.status(401).send({ err });
	});
	
});

module.exports = router;