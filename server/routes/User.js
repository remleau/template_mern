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

  return res.status(200).send(token);

});


router.post('/create', async (req, res) => {

  const { username, email, password, firstName, lastName } = req.body;

  const [user, created] = await User.findOrCreate({
    where: {
      [Sequelize.Op.or]: [
        { username: username },
        { email: email }
      ]
    },
    defaults: {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: bcrypt.hashSync(password, 8),
    }
  });

  if(created) {
    delete user.dataValues.password;

    res.status(200).send({user})
  } else {
    res.status(200).send({
      error: 'Already exist'
    })
  }

});


router.put('/update', function (req, res) {



});


router.delete('/delete', async (req, res) => {

  let id = req.headers['data'] || false;

  if(id) {
    let userDeleted = await User.destroy({
      where: {
        id: id
      },
      force: true
    });

    res.status(200).send({
      userDeleted: userDeleted,
      userId: id
    });
  } else {
    res.status(400).send({
      error: 'No user'
    })
  }


});


module.exports = router