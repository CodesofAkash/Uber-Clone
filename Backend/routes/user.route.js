const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller'); 
const authController = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('fullName.firstName').trim().isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], userController.registerUser);

router.post('/login', [
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], userController.loginUser);

router.get('/profile', authController.authUser, userController.getUserProfile);

router.get('/logout', userController.logoutUser);

module.exports = router;