const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const config = require('./../../../server/ressources/config');

router.post('/', (req, res) => {
	
	let today = new Date();
	let hash_user_pass = bcrypt.hashSync(req.body.user_pass, config.saltRounds);
	let user = {
		"user_name": req.body.user_name,
		"user_email": req.body.user_email,
		"user_pass": hash_user_pass,
		"user_registered": today
	}

	database.query(`SELECT user_email FROM ${config.database_prefix()}users WHERE user_email = ?`, [user.user_email], function (err, results, fields) {

		if (err) {

			console.log(err.message);
			res.status(400).send({
				message: err.message
			});

		}
		
		if(results.length > 0){

			res.status(400).send({
				message: 'Compte déjà existant.'
			});

		}else{
	
			database.query(`INSERT INTO ${config.database_prefix()}users SET ?`, user, function (err, results, fields) {
				
				if (err) {
					
					console.log(err.message);
					res.status(400).send({
						message: err.message
					});
					
				}
		
				res.json({
					message: 'Utilisateur enregistré avec succès.'
				});
		
			});

		}

	});

});

module.exports = router;
