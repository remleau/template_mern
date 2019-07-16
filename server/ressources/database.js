const mysql = require('mysql');

// create connection to database
// the mysql.createConnection function takes in a configuration object which contains host, user, password and the database name.
database = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'mern_app'
});

// connect to database
database.connect((err) => {

    if (err) {
        console.log(err);
    }

    let createUsers = `create table if not exists ${database_prefix}users(
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