const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');
const auth = require('../Services/Auth');
const upload = require('../Services/image_uploads');

router.post('/signup', userController.signup);
router.post('/checkForUsername', userController.checkForUsername);
router.post('/login', userController.login);
router.post('/userProfile', auth.checkAuth, userController.userProfil);
router.post('/post/:token', auth.checkAuth, upload.upload.single('image'), userController.postAlite);

module.exports = router;