const dbPool = require('../dbService.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleSignup = (req, res) => {
    const { username, email, password } = req.body;

    checkEmail(email).then(result => {
        if (result) return res.render('signup.ejs', { errMessage: 'Email already in use, please sign in or choose another email' });
        else {
            try {
                bcrypt.hash(password, 10, (err, hash) => {
                    if (err) console.log(err);
                    createAccount(username, email, hash)
                        .then(result => {

                            const accessToken = jwt.sign(
                                {
                                    "user_id": result.insertId,
                                    "username": username,
                                    "email": email
                                },
                                process.env.ACCESS_TOKEN_SECRET
                            );

                            res.cookie('accjwt', accessToken, { httpOnly: true });
                            res.redirect('/')
                        })
                        .catch(err => res.status(409).json({ msg: err.message }));

                })
            } catch (error) {
                console.log(error);
            }
        }
    })

}

async function checkEmail(email) {

    const query = 'SELECT * FROM user WHERE email = ?;';
    try {
        const res = await new Promise((resolve, reject) => {
            dbPool.query(query, [email], (err, result) => {
                if (err) reject(new Error(err.message));
                resolve(result[0])

            });
        });
        return res;
    } catch (error) {
        console.log(error);
    }
}

async function createAccount(username, email, password) {
    try {
        const res = await new Promise((resolve, reject) => {
            const query = 'INSERT INTO user (user_id, username, email, password) VALUES (NULL, ?, ?, ?);'
            dbPool.query(query, [username, email, password], (err, result) => {
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

module.exports = { handleSignup }

