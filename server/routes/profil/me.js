const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const config = require('./../../../server/ressources/config');
const auth = require('./../../../server/middleware/auth');

router.get('/', auth, (req, res) => {

	// check header for the token
	let token = req.cookies['token'];
	
	jwt.verify(token, process.env.JWT_SECRET , (err, decoded) =>{      
		if (err) {
			res.json({ message: 'Le token à expiré.' });    
		} else {
			res.json(decoded);
		}
	});

});

module.exports = router;