const express = require('express'),
bodyParser = require('body-parser'),
cookieParser = require('cookie-parser')
app = express(); 

// Init
const config = require('./server/ressources/config');
const database = require('./server/ressources/database');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Cookies parser
app.use(cookieParser());

// Middleware JWT
process.env.jwt_secret = 'mern_app';

// Token lifetime
process.env.token_lifetime = 3600000; // 1h // TIME IN MS

// Require Routes
const login = require('./server/routes/login/login');
const register = require('./server/routes/register/register');
const logout = require('./server/routes/logout/logout');
const dashboard = require('./server/routes/dashboard/dashboard');

// Routes
app.use('/api/auth/signin', login);
app.use('/api/auth/register', register);
app.use('/api/auth/logout', logout);

// Homepage when Logged In
app.use(config.dashboard_route(), dashboard);

// Set port
app.set('port', process.env.port || 5000); // set express to use this port
app.listen(app.get('port'),()=>{
    console.log('server is running on port ' + app.get('port')) 
});