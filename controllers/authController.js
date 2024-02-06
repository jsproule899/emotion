const axios = require('axios');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

axios.defaults.baseURL = 'http://localhost:3002'

const getSignup = (req, res) => {
    const { successMessage, errMessage } = req.query;
    res.render('signup', { successMessage, errMessage });
}

const handleSignup = (req, res) => {
    const { username, email, password } = req.body;

    axios.get('/users/email', {
        data: { email: email },
        validateStatus: (status) => {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
        .then(response => {
            const emailExists = response.data.result
            if (emailExists) return res.render('signup.ejs', { errMessage: 'Email already in use, please Login or choose another email' });
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) console.log(err);
                axios.post('/users', { username: username, email: email, password: hash })
                    .then(response => {
                        const accessToken = jwt.sign(
                            {
                                "user_id": response.data.result.insertId,
                                "username": username,
                                "email": email
                            },
                            process.env.ACCESS_TOKEN_SECRET
                        );

                        res.cookie('accjwt', accessToken, { httpOnly: true });
                        res.redirect('/')
                    })
                    .catch(err => {
                        res.render('signup.ejs', { errMessage: err.response.data.message });
                    })
            })
        }).catch(err => {
            res.render('signup.ejs', { errMessage: err.response.data.message });

        })
}

const getLogin = (req, res) => {
    const { successMessage, errMessage } = req.query;
    res.render('login', { successMessage, errMessage });
}

const handleLogin = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.render('login.ejs', { errMessage: 'Username and password are required' });

    axios.get('/users/email', {
        data: { email: email },
        validateStatus: (status) => {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
        .then(response => {
            const user = response.data.result
            if (!user) return res.redirect(`/auth/signup?emailinput=${email}&errMessage=Account does not exist please sign up`);
            const storedPwd = Buffer.from(user[0].password).toString('binary');
            bcrypt.compare(password, storedPwd, (err, result) => {
                if (!result) return res.render('login.ejs', { errMessage: 'You have entered an invalid username or password, Please try again...' });
                if (result) {
                    const accessToken = jwt.sign(
                        {
                            "user_id": user[0].user_id,
                            "username": user[0].username,
                            "email": user[0].email
                        },
                        process.env.ACCESS_TOKEN_SECRET
                    );

                    res.cookie('accjwt', accessToken, { httpOnly: true });
                    res.redirect('/');
                }
            });
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 500) {
                console.log(err.response.data.message)
                return res.render('login.ejs', { errMessage: err.response.data.message })
            }
        });
}

const handleLogout = (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.accjwt) return res.redirect('/');
    const accessToken = cookies.accjwt;
    res.clearCookie('accjwt', accessToken, { httpOnly: true }).redirect('/');
}


module.exports = {
    getSignup,
    handleSignup,
    getLogin,
    handleLogin,
    handleLogout
}