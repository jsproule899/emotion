const mysql = require('mysql');
require('dotenv').config();

const dbPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    charset: 'utf8mb4_unicode_ci',
    multipleStatements: true
});


module.exports =  dbPool ;

