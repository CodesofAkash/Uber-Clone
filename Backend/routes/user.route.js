const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller'); 
const authController = require('../middlewares/auth.middleware');

// Debug: Log route file loading
console.log('User routes file loaded');
console.log('User controller:', typeof userController);
console.log('Available controller functions:', Object.keys(userController));

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

// Debug: Log route registration
console.log('User routes registered:', router.stack.map(layer => ({
    method: Object.keys(layer.route.methods)[0],
    path: layer.route.path
})));

module.exports = router;