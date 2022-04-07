const mysql = require('mysql');

const dbConnection = mysql.createConnection({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
});

dbConnection.connect(function(error){
    if(error) throw error;
    console.log("Database Connected Successfully!!");
});

module.exports = dbConnection;