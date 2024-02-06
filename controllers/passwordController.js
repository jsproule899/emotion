const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:3002'
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config()


const getForgotPassword = (req, res) => {
    res.render('forgotPassword')
}

const handleForgotPassword = (req, res) => {
    const { email } = req.body;
    axios.get('users/email', { data: req.body })
        .then(response => {
            const { user_id } = response.data.result[0]            
            const token = crypto.randomBytes(20).toString('hex');
            axios.patch(`users/${user_id}/token`, { token: token })
                .then(response => {
                    // Send the reset token to the user's email
                    const transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 465,
                        auth: {
                            type: 'OAUTH2',
                            user: 'mindyourself.onthewifi@gmail.com',
                            clientId: process.env.GMAIL_CLIENT_ID,
                            clientSecret: process.env.GMAIL_CLIENT_SECRET,
                            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                        },
                    });
                    const mailOptions = {
                        from: 'mindyourself.onthewifi@gmail.com',
                        to: email,
                        subject: 'MindYourSelf Password Reset',
                        text: `Click the following link to reset your password: https://mindyourself.onthewifi.com/password/reset/${token} or 
                                \nClick the following link to reset your password: http://localhost:3000/password/reset/${token} if running locally
                                Didn't request this change? http://localhost:3000/password/cancel/${token} Let us know!`
                    };
                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.log(error);
                            res.status(500).render('forgotPassword', { errMessage: 'Error sending email try again...' });
                        } else {
                            console.log(`Email sent: ${info.response}`);
                            res.status(200).render('forgotPassword', { sucessMessage: 'Email sent check your mail to reset your password!' });
                        }
                    })

                }).catch(err => {
                    if (err.response.status === 404) {
                        res.redirect(`/signup?emailinput=${email}&errMessage=` + err.response.data.message);
                    } else if (err.response.status === 500) {
                        res.render('forgotPassword', { errMessage: err.response.data.message });
                    }
                });
        }).catch(err => {
            if (err.response.status === 404) {
                res.redirect(`/signup?emailinput=${email}&errMessage=` + "Email doesn't exist, please sign up");
            } else if (err.response.status === 500) {
                res.render('forgotPassword', { errMessage: err.response.data.message });
            }
        });
}

const getResetPassword = (req, res) => {
    const { token } = req.params;
    const { errMessage } = req.query;
    if (errMessage) {
        res.render('resetPassword', { errMessage, token })
    } else {
        res.render('resetPassword', { token })
    }
}

const handleResetPassword = (req, res) => {
    const { password } = req.body;

    axios.get('/users/token', { data: req.params }).then(response => {
        const { user_id } = response.data.result[0]
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) throw (err);
            

            const setNewPassword = await axios.patch(`/users/${user_id}/password`, {password: hash})
                .catch(err => {
                    if (err.response.status === 404) {
                        res.redirect('/password/reset/invalid?errMessage=Invalid user ID')
                    } else if (err.response.status === 500) {
                        res.redirect('/password/reset/invalid?errMessage=' + err.response.data.message)
                    }
                })
            const setTokenNull = axios.patch(`users/${user_id}/token`, {token: null})
                .catch(err => {
                    if (err.response.status === 404) {
                        res.redirect('/password/reset/invalid?errMessage=Invalid user ID')
                    } else if (err.response.status === 500) {
                        res.redirect('/password/reset/invalid?errMessage=' + err.response.data.message)
                    }
                })
            Promise.all([setNewPassword, setTokenNull]).then(() => {
                res.redirect('/login?successMessage=Password updated successfully');
            })

        })
    }).catch(err => {
        if (err.response.status === 404) {
            res.redirect('/password/reset/invalid?errMessage=Invalid or expired token')
        } else if (err.response.status === 500) {
            res.redirect('/password/reset/invalid?errMessage=' + err.response.data.message)
        }
    });
}

const getCancelReset = (req, res) => {
    const { token } = req.params;
    res.render('cancelReset', { token })
}

const handleCancelReset = (req, res) => {
    axios.get('/users/token', { data: req.params }).then(response => {
        const { user_id } = response.data.result[0]
        axios.patch(`users/${user_id}/token`, {token: null}).then(response => {
            return res.redirect('/');
        }).catch(err => {
            if (err.response.status === 404) {
                res.redirect('/password/reset/invalid?errMessage=Invalid user ID')
            } else if (err.response.status === 500) {
                res.redirect('/password/reset/invalid?errMessage=' + err.response.data.message)
            }
        })
    }).catch(err => {
        if (err.response.status === 404) {
            res.redirect('/password/reset/invalid?errMessage=Invalid or expired token')
        } else if (err.response.status === 500) {
            res.redirect('/password/reset/invalid?errMessage=' + err.response.data.message)
        }
    })
}

module.exports = {
    getForgotPassword,
    handleForgotPassword,
    getResetPassword,
    handleResetPassword,
    getCancelReset,
    handleCancelReset,
}