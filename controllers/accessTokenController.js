const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleAccessToken = (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.accjwt) return res.status(401);

    const accessToken = cookies.accjwt;

    jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.sendStatus(403);
            const user =
            {
                "user_id": decoded.user_id,
                "username": decoded.username,
                "email": decoded.email
            }
        }
    );
    res.jsop(user);
}

module.exports = { handleAccessToken }