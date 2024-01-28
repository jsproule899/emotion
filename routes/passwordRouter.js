const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController')

router.route('/forgot')
    .get(passwordController.getForgotPassword)
    .post(passwordController.handleForgotPassword);

router.route('/reset/:token')
    .get(passwordController.getResetPassword)
    .post(passwordController.handleResetPassword);

module.exports = router;