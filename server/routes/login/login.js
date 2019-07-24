const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const config = require('./../../../server/ressources/config');
const isLogged = require('./../../../server/middleware/logged');

router.get('/', isLogged, (req, res) => {

	let user_name = req.body.user_name || 'test';
	let user_pass = req.body.user_pass || 'test';

	if (user_name && user_pass) {

		let get_user = `select ID,user_name,user_email
		from ${config.database_prefix()}users
		where user_name = ?
		and user_pass = ?`;

		database.query(get_user, [user_name, user_pass], function (err, results, fields) {

			if (err) {

				console.log(err.message);
				res.status(400).send({
					message: err.message
				});

			}

			let user = {
				user_id: results[0].ID,
				user_name: results[0].user_name,
				user_email: results[0].user_email,
			};
			let token = jwt.sign( user, process.env.JWT_SECRET, { expiresIn: (process.env.TOKEN_LIFETIME/1000) });
			res.cookie('token', token, {maxAge: process.env.TOKEN_LIFETIME});
			res.redirect(config.dashboard_route());

		});
		
	}else{
		
		res.send({
			message: 'Veuillez entrer votre Username et votre Mot de passe!'
		});
		
	}

});

module.exports = router;
