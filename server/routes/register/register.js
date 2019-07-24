const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const config = require('./../../../server/ressources/config');

router.get('/', (req, res) => {
	
		let today = new Date();
		let hash_user_pass = bcrypt.hashSync(req.body.password || 'allo1234', config.saltRounds);
		let user = {
			"user_name": req.body.first_name || 'Rémy Groleau',
			"user_email": req.body.email || 'remleau@gmail.com',
			"user_pass": hash_user_pass || 'allo1234',
			"user_registered": today
		}

		database.query(`INSERT INTO ${config.database_prefix()}users SET ?`, user, function (err, results, fields) {

			if (err) {

				console.log(err.message);
				res.status(400).send({
					message: err.message
				});

			} else {

				res.status(200).send({
					message: 'Utilisateur enregistré avec succès.'
				});

			}

		});

});

module.exports = router;
