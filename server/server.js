require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const AuthMiddleware = require('./middlewares/AuthMiddleware');
const config = require('./config.js');
// require('./Database.js').init();

const port = config.db.port;
const server = app.listen(port);
const io = require('socket.io')(server); 

// Middlewares
app.use(cors());
app.use(bodyParser.json()); // support parsing of application/json type post data
app.use(bodyParser.urlencoded({ extended: true })); // support parsing of application/x-www-form-urlencoded post data
app.use(AuthMiddleware);
app.use((req, res, next) => {
	req.io = io;
	next();
});

// Routes
app.use('/api', require('./routes'));