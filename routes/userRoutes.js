const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

router.post('/signup', userController.signup);
router.post('/checkForUsername', userController.checkForUsername);

module.exports = router;