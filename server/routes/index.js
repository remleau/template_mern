const router = require('express').Router();

const User = require('./User.js');
const Users = require('./Users.js');

router.use('/user', User);
router.use('/users', Users);

module.exports = router;