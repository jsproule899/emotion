const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.route('/').get((req, res) => {
    const { successMessage, errMessage } = req.query;
    res.render('login', { successMessage, errMessage });

}).post(authController.handleLogin);

module.exports = router;