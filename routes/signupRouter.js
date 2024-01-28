const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController')


router.route('/')
    .get(signupController.getSignup)
    .post(signupController.handleSignup);


module.exports = router;