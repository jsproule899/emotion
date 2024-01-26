const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController')


router.route('/')
    .get((req, res) => {
        const { successMessage, errMessage } = req.query;
        res.render('signup', {successMessage, errMessage});
     
    }).post(signupController.handleSignup);


module.exports = router;