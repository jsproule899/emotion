const dbPool = require('../dbService.js');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
require('dotenv').config()


const getForgotPassword = (req, res) => {
    res.render('forgotPassword')
}

const handleForgotPassword = (req, res) => {
    const { email } = req.body;
    getUserByEmail(email).then(user => {
        const token = crypto.randomBytes(20).toString('hex');
        setTokenByuser(token, user.user_id);
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
        });
    }).catch(err => {
        if (err.message === 'Account does not exist') {
            res.redirect(`/signup?emailinput=${email}&errMessage=` + err.message);
        } else {
            res.render('forgotPassword', { errMessage: err.message });
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
    const { token } = req.params;
    const { password } = req.body;
    getUserByToken(token).then(user => {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) throw (err);
            setPasswordByuser(hash, user.user_id)
            setTokenByuser(null, user.user_id)
        })
        res.redirect('/login?successMessage=Password updated successfully');
    }).catch(err => {
        if (err) res.redirect('/password/reset/invalid?errMessage=Invalid or expired token')
    });
}

const getCancelReset = (req, res) => {
    const { token } = req.params;
    res.render('cancelReset', {token})
}

const handleCancelReset = (req, res) => {
    const { token } = req.params;
    getUserByToken(token).then(user => {
        setTokenByuser(null, user.user_id)
        return res.redirect('/');
    }).catch(err => {
        if (err) res.redirect('/password/reset/invalid?errMessage=Invalid or expired token')
    });


}


function getUserByEmail(email) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE email = ?';
        dbPool.query(query, [email], (err, result) => {
            if (err) reject(new Error(err.message));
            if (!result[0]) reject(new Error("Account does not exist"));
            resolve(result[0]);

        });
    });
}

function setTokenByuser(token, id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user SET reset_token = ? WHERE user_id = ?';
        dbPool.query(query, [token, id], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
        });
    });
}

function getUserByToken(token) {

    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE reset_token = ?';
        dbPool.query(query, [token], (err, result) => {
            if (err) reject(new Error(err.message));
            if (!result[0]) reject(new Error("Account with that token does not exist"));
            resolve(result[0]);
        });
    });
}

function setPasswordByuser(hash, id) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE user SET password = ? WHERE user_id = ?';
        dbPool.query(query, [hash, id], (err, result) => {
            if (err) reject(new Error(err.message));
            resolve(result);
        });
    });
}




module.exports = {
    getForgotPassword,
    handleForgotPassword,
    getResetPassword,
    handleResetPassword,
    getCancelReset,
    handleCancelReset,
}