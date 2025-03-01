const { findOne } = require('../models/user.model');
const userService = require('../services/user.service');
const {validationResult} = require('express-validator');
const userModel = require('../models/user.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {fullName, email, password} = req.body;

        const user = await userService.createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password
        });

        const token = user.generateAuthToken();

        res.status(201).json({
            message: 'User created successfully',
            user,
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        const user = await userModel.findOne({email}).select('+password');
        if(!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const isMatch = await user.comparePasswords(password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = user.generateAuthToken();

        res.status(200).json({
            message: 'User logged in successfully',
            user,
            token
        });

    } catch (error) {
        next(error);
    }
}