const dbPool = require('../dbService.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {

    const email = req.body.email;
    const password = req.body.password
    if (!email || !password) return res.render('login.ejs', { errMessage: 'Username and password are required' });

    getUserByEmail(email).then(user => {
        const StoredPwd = user.password.toString('binary');
        bcrypt.compare(password, StoredPwd, (err, result) => {

            if (!result) return res.render('login.ejs', { errMessage: 'You have entered an invalid username or password, Please try again...' });

            if (result) {
                const accessToken = jwt.sign(
                    {
                        "user_id": user.user_id,
                        "username": user.username,
                        "email": user.email
                    },
                    process.env.ACCESS_TOKEN_SECRET
                );

                res.cookie('accjwt', accessToken, { httpOnly: true });
                res.redirect('/')
            }
        })
    }).catch(err => {

        if (err.message === 'Account does not exist') {
        res.redirect(`/signup?emailinput=${email}&errMessage=${err.message} please sign up`);  
        }
    });
}

async function getUserByEmail(email) {

    try {

        const res = await new Promise((resolve, reject) => {
            const query = 'SELECT * FROM user WHERE email = ?';
            dbPool.query(query, [email], (err, result) => {
                
                if (err) reject(new Error(err.message));
                if (!result[0]) reject(new Error("Account does not exist"));
                if (result[0]) resolve(result[0]);

            });
        });

        return res
    } catch (error) {

        throw error;
    }

}

module.exports = { handleLogin }