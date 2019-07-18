const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.cookie('token', '' , {
		maxAge: 0
	});
	res.redirect('/login');
});

module.exports = router;
