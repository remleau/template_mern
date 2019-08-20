const express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser'),
helmet = require('helmet'),
path = require('path'),
app = express(); 

// Init
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const config = require('./server/ressources/config');
const database = require('./server/ressources/database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Cookies parser
app.use(cookieParser());

// Security
app.use(helmet());

// Require Routes
const login = require('./server/routes/login/login');
const register = require('./server/routes/register/register');
const logout = require('./server/routes/logout/logout');
const dashboard = require('./server/routes/dashboard/dashboard');
const profil = require('./server/routes/profil/me');

// POST Routes
app.use('/api/auth/login', login);
app.use('/api/auth/register', register);

// GET Routes
app.use('/api/auth/logout', logout);
app.use('/api/profile/me', profil);

// Homepage when Logged In
app.use(config.dashboard_route(), dashboard);

app.use(express.static('client/build')); 
app.get('*', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'));
});

// Set port
app.set('port', process.env.PORT || 5000); // set express to use this port
app.listen(app.get('port'),()=>{
    console.log('server is running on port ' + app.get('port')) 
});
