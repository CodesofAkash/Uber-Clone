const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller'); 
const authController = require('../middlewares/auth.middleware');

router.post('/register', [
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('fullName.firstName').trim().isLength({min: 3}).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').trim().isLength({min: 3}).withMessage('Vehicle must be at least 3 characters long'),
    body('vehicle.plate').trim().isLength({min: 3}).withMessage('Vehicle must be at least 3 characters long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be at least 1'),
    body('vehicle.type').trim().isLength({min: 3}).withMessage('Vehicle must be at least 3 characters long'),
], captainController.registerCaptain);

router.post('/login', [
    body('email').trim().isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long')
], captainController.loginCaptain);

router.get('/profile', authController.authCaptain, captainController.getCaptainProfile);

router.get('/logout', captainController.logoutCaptain);

module.exports = router;