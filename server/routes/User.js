let router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('./../Database.js');
const Sequelize = require('sequelize');

router.post('/me', function (req, res) {

	const { token } = req.body;

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(401).send({ error: "Le token à expiré" });

		User.findOne({ where: { id: user.id } })
		.then((user) => {
			if (!user) return	res.status(404).send({ error: "Une erreur est survenue" });

			res.status(200).send({
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				email: user.email,
				lastConnexion: user.lastConnexion,
				updatedAt: user.updatedAt,
				role: user.role,
				token: token
			});

		});

	});

});

router.post('/login', function (req, res) {

	const { username, password } = req.body;

	if (username && password){
		User.findOne({ where: { username: username } })
		.then((user) => {
			if (!user) return res.status(404).send({ error: "Une erreur est survenue" });

			let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
			if (!passwordIsValid) {
				return res.status(401).send({ error: "Mot de passe ou username invalide" });
			}

			// Update last conenxion
			User.update({
				lastConnexion: Date.now(),
			}, {
				where: {
					id: user.id
				}
			});

			let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
				expiresIn: "1d" // expires in 24 hours
			});

			res.status(200).send({
				firstName: user.firstName,
				lastName: user.lastName,
				username: user.username,
				email: user.email,
				lastConnexion: user.lastConnexion,
				updatedAt: user.updatedAt,
				role: user.role,
				token: token
			});

		}).catch((err) => {
			res.status(401).send({ error: "Une erreur est survenue" });
		});
	}else{
		res.status(401).send({ error: "Veuillez entrer votre nom d\'utilisateur et votre Mot de passe!" });
	}

});

router.post('/create', function (req, res) {

	const { firstName, lastName, email, username, password } = req.body;

	if (email  && username && password){
		User.findOrCreate({ 
			where: { 
				[Sequelize.Op.or]: [
					{ username: username },
					{ email: email }
				]
			},
			defaults: { 
				firstName: firstName,
				lastName: lastName,
				email: email,
				username: username,
				password: bcrypt.hashSync(password, 8),
			}
		}).then(([user, created]) => {
			if(created){
				res.status(201).send({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					username: user.username,
					role: user.role,
					lastConnexion: user.lastConnexion,
				})
			}else{
				res.status(400).send({ error: "L'employé existe déjà" });
			}
		}).catch((err) => {
			res.status(401).send({ err });
		});
	}else {
		res.status(401).send({ error: "Valeur manquante" });
	}

});

router.put('/update', function (req, res) {

	const { firstName, lastName, email, username, token } = req.body;

	const validated_data = {
		...(firstName && { firstName: firstName }),
		...(lastName && { lastName: lastName }),
		...(email && { email: email }),
		...(username && { username: username }),
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		if (err) return res.status(401).send({ error: "Le token à expiré" });

		User.update( validated_data, {
			where: {
				id: user.id
			}
		}).then(user => {
			validated_data.token = token;
			validated_data.role = user.role;
			validated_data.updatedAt = user.updatedAt;
			res.status(200).send(validated_data);
		}).catch((err) => {
			res.status(401).send({ error: "Une erreur est survenue" });
		});
	});

});

router.delete('/delete', function (req, res) {

});

module.exports = router