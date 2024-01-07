const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const router = express.Router();



// router.get('/', (req, res) => {
//     res.status(200);
//     res.render('home.ejs')
// });




router.get('/', (req, res) => {
    const user = req.user;
    res.status(200);
    res.render('home.ejs', {user} )
});


module.exports = router;