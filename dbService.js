const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err)
        return console.log(err.message);

    console.log('db' + connection.state);
});

class dbService {
    static getDbServiceInstance() {
        return instance ? instance : new dbService();
    }

    async getAllData() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM mood;";

                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });

            console.log(res);
            return res;

        } catch (error) {
            console.log(error);
        }
    }

    async createAccount(username, email, password) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = 'INSERT INTO user (user_id, username, email, password) VALUES (NULL, ?, ?, ?);'
                connection.query(query, [username, email, password], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });

            return res;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    checkEmail(email) {
        const query = 'SELECT * FROM user WHERE email = ?;';
        connection.query(query, [email], (err, result) => {
            return (!result[0]) ? true : false;

        });
    }

    async findByEmail(email) {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM user WHERE email = ? ';
                connection.query(query, [email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    if (!result[0]) reject(new Error("Account does not exist"));
                    resolve(result[0]);
                    
                });
            });
            
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async passwordById(id) {
        try {
            
            const res = await new Promise((resolve, reject) => {
                const query = 'SELECT password FROM user WHERE user_id = ?';
                connection.query(query, [id], (err, result) => {
                   
                    if (err) reject(new Error(err.message));
                    if (!result[0]) reject(new Error("Password does not exist"));
                    
                    resolve( result[0].password);
                    
                });
            });
           return res;
        } catch (error) {
            throw error
        }
    }

    async hashByEmail(email) {

        try {

            const res = await new Promise((resolve, reject) => {
                const query = 'SELECT * FROM user WHERE email = ?';
                connection.query(query, [email], (err, result) => {

                    if (err) reject(new Error(err.message));
                    if (!result[0]) reject(new Error("Account does not exist"));
                    if (result[0]) resolve(result[0].password.toString('binary'));
                    
                });
            });
            
            return res
        } catch (error) {

            throw error;
        }


    }

    async getEmotions() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM emotion;`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return res
        } catch (error) {
            throw error;
        }
    }

    async getContextType() {
        try {
            const res = await new Promise((resolve, reject) => {
                const query = `SELECT * FROM context_type;`;
                connection.query(query, (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            return res
        } catch (error) {
            throw error;
        }
    }
}

module.exports = dbService;

