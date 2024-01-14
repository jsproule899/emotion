const mysql = require('mysql');
require('dotenv').config();
let instance = null;


const dbPool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});



module.exports =  dbPool ;

