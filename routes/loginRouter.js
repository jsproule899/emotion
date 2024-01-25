const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.route('/').get((req, res) => {
    const { successMessage } = req.query;
    if (successMessage) {
        res.render('login', {successMessage});
    } else {
        res.render('login');
    }

}).post(authController.handleLogin);

module.exports = router;