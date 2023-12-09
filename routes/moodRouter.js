const express = require('express');
const router = express.Router();
const fs = require("fs");
//connect db
const dbService = require('../dbservice.js');

const data = JSON.parse(fs.readFileSync('moods.json'));
router.get('/viewMoods', (req, res) => {
    res.status(200);
    const db = dbService.getDbServiceInstance();

    res.render('viewMoods', { data })
});


router.get('/addMood', async (req, res) => {
    res.status(200);
    const db = dbService.getDbServiceInstance();


    const contextType = await db.getContextType()
        .then(contextType => { return contextType })
        .catch(err => console.log(err));

    db.getEmotions()
        .then(emotions => { res.render('addMood', { emotions, contextType }) })
        .catch(err => console.log(err));

});


module.exports = router;