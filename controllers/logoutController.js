//connect db
const {dbService} = require('../dbService.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogout = (req, res, next) => {
    const db = dbService.getDbServiceInstance();
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.status(204);
   
    const refreshToken = cookies.jwt;
    const accessToken = cookies.accjwt;

    res.clearCookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }); // secure: true = only serves on https
    res.clearCookie( 'accjwt', accessToken, { httpOnly: true, maxAge: 500 * 1000 });
    
    res.redirect('/'); 
    next();
    
}

module.exports = { handleLogout }