const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {


	// If route login let it pass
	if (req.path == '/api/user/login'){
		return next();
	}

	// Headers for the token
	const token = req.body.token;

	if (token !== "undefined" && token && token !== undefined) {
		// verifies secret and checks if the token is expired
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) throw err;

			next();
		});
	} else {
		res.status(401).send({
			error: "Aucun token envoyé"
		});
  }
  

};