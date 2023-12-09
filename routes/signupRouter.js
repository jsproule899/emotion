const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');



router.get('/signup', (req, res) => {
    res.status(200);
    res.render('signup.ejs')

});

//create account
router.post('/createAccount', (req, res) => {
    const db = dbService.getDbServiceInstance();

    const username = JSON.stringify(req.body.username);
    const email = JSON.stringify(req.body.email);
    const password = JSON.stringify(req.body.password);


    try {
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) console.log(err);
            db.createAccount(username, email, JSON.stringify(hash)).then(success => res.json({ msg: "Success, User added" })).catch(err => res.status(409).json({ msg: err.message }));

        })
    } catch (error) {

    }

});


module.exports = router;