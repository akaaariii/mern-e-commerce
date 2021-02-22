const express = require('express');
const passport = require('passport');
const router = express.Router();

const authController = require('../controllers/authController');


router.get('/google', authController.login);

router.get('/google/callback', passport.authenticate('google'), authController.loginCallback);

router.get('/current_user', authController.getCurrentUser);

router.get('/logout', authController.logout);


module.exports = router;