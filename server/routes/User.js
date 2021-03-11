let router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../database.js');
const Sequelize = require('sequelize');
const config = require('../config');

router.get('/me', function (req, res) {

  if (typeof req.user !== 'undefined') {
    return res.status(200).send(req.user)
  }
  
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

  const { username, email, password, firstName, lastName , user_id } = req.body;

  const [user, created] = await User.findOrCreate({
    where: {
      [Sequelize.Op.or]: [
        { username: username },
        { email: email }
      ]
    },
    defaults: {
      user_id: parseInt(Date.now()) + parseInt(Math.random()),
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

  let user_id = req.headers['user_id'] || false;

  if (user_id) {
    let userDeleted = await User.destroy({
      where: {
        user_id: user_id
      },
      force: true
    });

    res.status(200).send({
      userDeleted: userDeleted,
      user_id: user_id
    });
  } else {
    res.status(400).send({
      error: 'No user'
    })
  }

});

router.get('/profile', async (req, res) => {

  let user_id = parseInt(req.headers['user_id']) || false;
  if (user_id){
    let userProfile = await User.findOne({ where: { user_id: user_id } }) || false;
    if (userProfile) {

      delete userProfile.dataValues.password;
      
      res.status(200).send({
        data: userProfile
      });

    } else {
      res.status(200).send({
        error: 'No user'
      })
    }
  } else {
    res.status(200).send({
      error: 'No user'
    })
  }

});

module.exports = router