const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController')

router.route('/forgot')
    .get((req, res) => {
        res.render('forgotPassword')

    })
    .post(passwordController.handleForgotPassword);


router.route('/reset/')
    .get((req, res) => {
        const { errMessage } = req.query;
        if (errMessage) {
            res.render('resetPassword', { errMessage, token: '' })
        } else {
            res.render('resetPassword', { errMessage: 'No reset token please check link', token: '' })
        }
    });

router.route('/reset/:token')
    .get((req, res) => {
        const { token } = req.params
        res.render('resetPassword', { token })
    })
    .post(passwordController.handleResetPassword);

module.exports = router;