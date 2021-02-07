let router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database.js');
const Sequelize = require('sequelize');
const config = require('../config');

router.get('/me', function (req, res) {

  res.status(200).send(req.user)

});


router.post('/login', async (req, res) => {

  const { username, password } = req.body;

  const _user = (username && password) && await User.findOne({where: {username: username}});

  if(!_user) {
    return res.status(400).send({
      error: 'Une erreur est survenue'
    })
  }

  if(!bcrypt.compareSync(password, _user.password)) {
    return res.status(401).send({ 
      error: 'Mot de passe ou username invalide'
    });
  }

  const updated = await User.update({
    lastConnexion: Date.now(),
  }, {
    where: {
      id: _user.id
    }
  });

  delete _user.dataValues.password;

  const token = jwt.sign({..._user.dataValues, isLoggedIn: true}, config.jwt_secret, {
    expiresIn: "1d" // expires in 24 hours
  });

  return res.send(token);

});


router.post('/create', function (req, res) {



});


router.put('/update', function (req, res) {



});


router.delete('/delete', function (req, res) {



});


module.exports = router