const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//connect db
const dbService = require('../dbservice.js');

router.route('/login').get( (req, res) => {
    res.status(200);
    const expressFlash = req.flash('errAccMessage')
    res.render('login.ejs', {expressFlash});
}).post( (req, res) => {
    const db = dbService.getDbServiceInstance();
    const email = req.body.email;
    const password = JSON.stringify(req.body.password);

    db.hashByEmail(email).then(data =>
        bcrypt.compare(password, data, function (err, result) {
            if (!result) {
                res.json()
            }

            if (result) {
                const accessToken = jwt.sign(
                    { "email": email },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '500s' }
                );
                const refreshToken = jwt.sign(
                    { "email": email },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.json({ accessToken });

            } else {
                req.flash('successMessage', 'You are successfully using req-flash');
            }
        })
    ).catch(err => {
        if (err.message == 'Account does not exist') {
            req.flash('errAccMessage', 'Account does not exist, pleas create one');
            setTimeout(() => {
                res.redirect(`/signup?emailinput=${email}`);
                res.redirect
            }, 1000);
        }
    });
});
// .put()
// .delete();

// router.get('*', (req, res) => {
//     res.status(404);
//     res.send('<h1>Page not found!</h1> <a href="/">Return to Home</a>');
// })



module.exports = router