const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');

const auth = require('./../../../server/middleware/auth');

router.get('/', auth, (req, res) => {

	res.json(jwt.decode(req.cookies['token']));

});

module.exports = router;