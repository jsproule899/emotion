const express = require('express');
const router = express.Router();
const summaryController = require('../controllers/summaryController')


router.route('/')
.get(summaryController.getTrends);

module.exports = router;