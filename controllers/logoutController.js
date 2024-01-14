require('dotenv').config();


const handleLogout = (req, res, next) => {
        const cookies = req.cookies;

    if (!cookies?.accjwt) return res.redirect('/');    
    
    const accessToken = cookies.accjwt;
    
    res.clearCookie( 'accjwt', accessToken, { httpOnly: true, maxAge: 500 * 1000 });
    
    res.redirect('/'); 
    next();
    
}

module.exports = { handleLogout }