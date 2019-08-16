const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.cookie('token', '' , {
		maxAge: 0
	});
	res.send({
		message: 'Vous avez bien été déconnecté'
	});
});

module.exports = router;
