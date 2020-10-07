if((process.env.NODE_ENV || 'dev') == 'dev') {
    require("dotenv").config();
}

const mysql = require('mysql');

const MYSQL_CONN = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
    supportBigNumbers: process.env.MYSQL_SUPPORT_BIG_NUMBERS,
    dateStrings: process.env.MYSQL_USE_DATE_STRINGS,
    multipleStatements: process.env.MYSQL_ALLOW_MULTIPLE_STATEMENTS,
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});

const GET_DBCONNECTION = function() {
    return new Promise(function(resolve, reject) {
        MYSQL_CONN.getConnection(function(err, conn) {
            if(err){
                console.log('ERROR: Failed to establish connection to the database.');
                reject(err);
            } else {
                resolve(conn);
            }
        });
    });
}

module.exports = { GET_DBCONNECTION }