const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController')


router.route('/')
    .get((req, res) => {
        res.status(200);
        res.render('signup.ejs')

    }).post(signupController.handleSignup);


module.exports = router;