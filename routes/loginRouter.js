const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')

router.route('/').get( (req, res) => {
    res.status(200);
    const expressFlash = req.flash('errAccMessage')
    res.render('login.ejs', {expressFlash});
}).post(authController.handleLogin);

// .put()
// .delete();

// router.get('*', (req, res) => {
//     res.status(404);
//     res.send('<h1>Page not found!</h1> <a href="/">Return to Home</a>');
// })



module.exports = router;