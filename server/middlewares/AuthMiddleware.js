const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if(req.path == '/api/user/login') {
    return next();
  }

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, config.jwt_secret, (err, user) => {
      err && res.status(200).send({
        error: err
      }); 

      req.user = user;
			return next();
		});
  } else {
    res.status(401).send({
			error: "Aucun token envoyé"
		});
  }
};