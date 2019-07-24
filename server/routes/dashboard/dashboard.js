const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const config = require('./../../../server/ressources/config');
const auth = require('./../../../server/middleware/auth');

router.get('/', auth, (req, res) => {

		let select_user = `select ID,user_name,user_email
		from ${config.database_prefix()}users`;

		database.query(select_user, function (err, results, fields) {

			if (err) {

				console.log(err.message);
				res.status(400).send({
					message: err.message
				});

			} else {

				res.json(results);

			}

		});

});

module.exports = router;