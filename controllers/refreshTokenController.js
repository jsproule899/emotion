//connect db
const dbService = require('../dbService.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = (req, res, next) => {
    const db = dbService.getDbServiceInstance();

    

    const cookies = req.cookies;

    if(cookies.accjwt) return next();
    if (!cookies?.jwt) res.redirect('/login');
    
    const refreshToken = cookies.jwt;

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err ) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "user_id": decoded.user_id,
                    "username": decoded.username,
                    "email": decoded.email
                },
                process.env.ACCESS_TOKEN_SECRET
            );
            res.cookie( 'accjwt', accessToken, { httpOnly: true});
           
        }
    ) 
    next()
}

module.exports = { handleRefreshToken }