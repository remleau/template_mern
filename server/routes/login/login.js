const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const config = require('./../../../server/ressources/config');
const isLogged = require('./../../../server/middleware/logged');

router.post('/', isLogged ,(req, res) => {

	let user_email = req.body.user_email;
	let user_pass = req.body.user_pass;

	if (user_email && user_pass) {

		let get_user = `select *
		from ${config.database_prefix()}users
		where user_email = ?`;

		database.query(get_user, [user_email], function (err, results, fields) {

			if (err) {
				console.log(err.message);
				res.status(400).send({
					message: err.message
				});
			}

			if(bcrypt.compareSync(user_pass, results[0].user_pass)){
				let user = {
					user_id: results[0].ID,
					user_name: results[0].user_name,
					user_email: results[0].user_email,
				};
				let token = jwt.sign( user, process.env.JWT_SECRET, { expiresIn: (process.env.TOKEN_LIFETIME/1000) });
				res.cookie('token', token, {maxAge: process.env.TOKEN_LIFETIME});
				res.json(user)
			}else{
				res.send({
					message: 'Nom d\'utilisateur ou mot de passe invalide.'
				});
			}

		});
		
	}else{
		
		res.send({
			message: 'Veuillez entrer votre nom d\'utilisateur et votre Mot de passe!'
		});
		
	}

});

module.exports = router;
