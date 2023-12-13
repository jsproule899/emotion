//connect db
const dbService = require('../dbservice.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const handleLogin = async (req, res) => {
    const db = dbService.getDbServiceInstance();
    const email = req.body.email;
    const password = req.body.password
    console.log(password);
    if (!email || !password) return res.status(400).json({ 'message': 'Username and password are required' });

    // const foundUser = await db.findByEmail(email);
    // console.log(foundUser);
    //const storedPwd = await db.passwordById(foundUser[0].user_id);


    db.hashByEmail(email).then(StoredPwd => {
        bcrypt.compare(password, StoredPwd, (err, result) => {
            console.log(result);

            if (!result) res.json("access denied: invalid credentials")

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

            }
        })
    }).catch(err => {

        if (err.message === 'Account does not exist') {

            setTimeout(() => {
                res.redirect(`/signup?emailinput=${email}`);

            }, 1000);
        }
    }
    );
}




module.exports = { handleLogin }