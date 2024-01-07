const {dbService} = require('../dbService.js');
const bcrypt = require('bcrypt');

const handleSignup  = async (req, res) => {

    const db = dbService.getDbServiceInstance();

        const { username, email, password } = req.body;

        if(!db.checkEmail(email)) return res.render('signup.ejs', {errMessage: 'Email already in use, please sign in or choose another email'});
        

        try {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) console.log(err);
                db.createAccount(username, email, hash).then(success => {res.json({ msg: "Success, User added" }), res.redirect('/') }).catch(err => res.status(409).json({ msg: err.message }));

            })
        } catch (error) {
            console.log(error);
        }
}

module.exports = {handleSignup}

