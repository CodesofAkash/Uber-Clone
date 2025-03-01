const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');
const captainModel = require('../models/captain.model');
const blacklistTokenModel = require('../models/blacklistToken.model');


module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {fullName, email, password, vehicle} = req.body;

        const existingCaptain = await captainModel.findOne({email});
        if(existingCaptain) {
            return res.status(400).json({message: 'Captain already exists'});
        }

        const captain = await captainService.createCaptain({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password,
            vehicle
        });

        const token = captain.generateAuthToken();

        res.status(201).json({
            message: 'Captain created successfully',
            captain,
            token
        });
    } catch (error) {
        next(error);
    }
}

module.exports.loginCaptain= async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }

        const {email, password} = req.body;

        const captain = await captainModel.findOne({email}).select('+password');
        if(!captain) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const isMatch = await captain.comparePassword(password);
        if(!isMatch) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = captain.generateAuthToken();

        res.cookie('token', token);

        res.status(200).json({
            message: 'Captain logged in successfully',
            captain,
            token
        });

    } catch (error) {
        next(error);
    }
}

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.captain);
    } catch (error) {
        next(error);
    }
}

module.exports.logoutCaptain = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.cookies?.token || req.header.authorization?.split(' ')[1];
        if(!token) {
            return res.status(401).json({message: 'Captain not logged in'});
        }
        await blacklistTokenModel.create({token});
        res.status(200).json({message: 'Captain logged out successfully'});
    } catch (error) {
        next(error);
    }
}