require('dotenv').config();


const handleLogout = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.accjwt) return res.redirect('/');    
    
    const accessToken = cookies.accjwt;
    
    res.clearCookie( 'accjwt', accessToken, { httpOnly: true }).redirect('/');
       
    
    
}

module.exports = { handleLogout }