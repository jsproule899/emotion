const express = require('express');
const router = express.Router();
const moodController = require('../controllers/moodController');

router.route('/view')
    .get(moodController.getMoodsByUser);

router.route('/add')
    .get(moodController.getAddMood)
    .post(moodController.createMood);

router.route('/delete/:id')
    .post(moodController.deleteMood);

router.route('/update/:id')
    .post(moodController.updateMood);

module.exports = router;