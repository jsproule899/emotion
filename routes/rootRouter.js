const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200);
    res.render('home.ejs')
});



module.exports = router;