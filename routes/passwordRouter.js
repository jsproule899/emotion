const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/passwordController')

router.route('/forgot')
    .get(passwordController.getForgotPassword)
    .post(passwordController.handleForgotPassword);

router.route('/reset/:token')
    .get(passwordController.getResetPassword)
    .post(passwordController.handleResetPassword);


router.route('/cancel/:token')
    .get(passwordController.getCancelReset)
    .post(passwordController.handleCancelReset);


module.exports = router;