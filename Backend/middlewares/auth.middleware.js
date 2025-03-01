const blacklistTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized'}); 
        }

        const isBlacklisted = await blacklistTokenModel.findOne({token});
        if(isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findOne({ _id: decoded._id }).select('+password');

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        next(error);
    }
};

module.exports.authCaptain = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized'}); 
        }

        const isBlacklisted = await blacklistTokenModel.findOne({token});
        if(isBlacklisted) {
            return res.status(401).json({ message: 'Unauthorized'});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findOne({ _id: decoded._id }).select('+password');

        req.captain = captain;
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        next(error);
    }
};
