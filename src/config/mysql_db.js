const mysql = require('mysql');

const MYSQL_CONN = mysql.createPool({
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,//30,
    supportBigNumbers: process.env.MYSQL_SUPPORT_BIG_NUMBERS,//true,
    dateStrings: process.env.MYSQL_USE_DATE_STRINGS,// true,
    multipleStatements: process.env.MYSQL_ALLOW_MULTIPLE_STATEMENTS,//true,
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