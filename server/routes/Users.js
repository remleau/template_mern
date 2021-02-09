var router = require('express').Router();
const { User } = require('./../database.js');

router.get('/all', function (req, res) {

  const _users = await User.findAll();

  if (!_users) {
    return res.status(400).send({
      error: 'Une erreur est survenue'
    })
  }

  return _users;
	
});

module.exports = router;