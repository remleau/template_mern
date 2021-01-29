require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const config = require('./config.js');
const jwt = require('jsonwebtoken');
//require('./database.js').init();

const server = app.listen(config.db.port);

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); // support parsing of application/x-www-form-urlencoded post data
app.use(AuthMiddleware); // Check if user logged in

// Routes
app.use('/api', require('./routes'));

app.use('/', (req, res) => {
  console.log(res);
});