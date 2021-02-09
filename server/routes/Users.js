var router = require('express').Router();
const { User } = require('./../database.js');

router.get('/all', async (req, res) => {

  const _users = await User.findAll();

  if (!_users) {
    return res.status(400).send({
      error: 'Une erreur est survenue'
    })
  }

  return res.status(200).send(JSON.stringify(_users));
	
});

module.exports = router;