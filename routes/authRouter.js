const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.route('/signup')
    .get(authController.getSignup)
    .post(authController.handleSignup);

router.route('/login')
    .get(authController.getLogin)
    .post(authController.handleLogin);

    router.route('/logout')
    .get(authController.handleLogout)
    

module.exports = router;