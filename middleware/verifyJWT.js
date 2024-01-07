const jwt = require('jsonwebtoken');
require('dotenv').config

const verifyJWT = (req, res, next) => {
    // const authHeader = req.headers['Authorization'];
    // if(!authHeader) return res.sendStatus(401);
    // console.log(authHeader); // bearer token
    // const token = authHeader.split(' ')[1];

    const authCookie = req.cookies.accjwt;
    if(!authCookie) return next();
    // const token = authCookie.split('.')[1];
    jwt.verify(
        authCookie,
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            
            if(err) res.redirect('/').status(403);
            
            const user = decoded
                       
            req.user = user;
           
        }
    ); next();
}

module.exports =  verifyJWT  ;