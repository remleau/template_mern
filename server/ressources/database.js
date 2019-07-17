const mysql = require('mysql');
const config = require('./config');

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
let infos = {};
if (process.env.NODE_ENV == 'dev') {
    let infos = {
        host: 'localhost',
        user: 'root',
        password: 'mysql',
        database: 'mern_app'
    }
}else{
    let infos = {
        host: 'localhost',
        user: 'ressourc_umern',
        password: 'M3H;)9NY#stX',
        database: 'ressourc_mern_app'
    }
}

database = mysql.createConnection(infos);

// connect to database
database.connect((err) => {

    if (err) {
        console.log(err);
    }

    let createUsers = `create table if not exists ${config.database_prefix()}users(
        ID int primary key auto_increment,
        user_name varchar(255)not null,
        user_pass varchar(255) not null,
        user_email varchar(255)not null,
        user_registered varchar(255)not null
    )`;
    
    database.query(createUsers, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });
    
});



module.exports = database;