const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')


router.route('/')
.get(controller.getHome);

router.route('*')
.get(controller.get404);

module.exports = router;