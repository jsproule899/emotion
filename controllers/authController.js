//connect db
const {dbService}= require('../dbService.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogin = async  (req, res) => {
    
    const db = dbService.getDbServiceInstance();
    const email = req.body.email;
    const password = req.body.password
    if (!email || !password) return res.render('login.ejs', {errMessage: 'Username and password are required'});
    

    
    db.hashByEmail(email).then(user => {
        const StoredPwd = user.password.toString('binary');
        bcrypt.compare(password, StoredPwd, (err, result) => {
            

            if (!result) return res.render('login.ejs', {errMessage: 'You have entered an invalid username or password, Please try again...'});
            
            if (result) {
                const accessToken = jwt.sign(
                    {
                        "user_id": user.user_id,
                        "username": user.username,
                        "email": user.email
                    },
                    process.env.ACCESS_TOKEN_SECRET
                    
                );
                const refreshToken = jwt.sign(
                    {
                        "user_id": user.user_id,
                        "username": user.username,
                        "email": user.email
                    },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );
                
                res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
                res.cookie('accjwt', accessToken, { httpOnly: true });
                res.redirect('/')


            }
        })
    }).catch(err => {

        if (err.message === 'Account does not exist') {
            res.redirect(`/signup?emailinput=${email}`);
          

        }
    });
}

module.exports = { handleLogin }