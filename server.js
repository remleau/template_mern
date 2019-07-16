const express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser')
app = express(); 

// Init database
global.database_prefix = 'kp_';
const database = require('./server/ressources/database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Cookies parser
app.use(cookieParser());

// Middleware JWT
process.env.token_lifetime = 3600000; // 1h // TIME IN MS
process.env.jwt_secret = 'mern_app';
const auth = require('./server/middleware/auth');

// Require Routes
const login = require('./server/routes/login/login');
const register = require('./server/routes/register/register');

// Routes
app.use('/api/auth/signin', login);
app.use('/api/auth/register', register);


const jwt = require('jsonwebtoken');
app.get('/dashboard', auth, function(req, res) {
    res.json(jwt.decode(req.cookies['token']));
});

// Set port
app.set('port', process.env.port || 5000); // set express to use this port
app.listen(app.get('port'),()=>{
    console.log('server is running on port ' + app.get('port')) 
});