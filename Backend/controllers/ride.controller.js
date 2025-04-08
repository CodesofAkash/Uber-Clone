const rideService = require('../services/ride.service');
const rideModel = require('../models/ride.model');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            user: req.user._id,
            pickup,
            destination,
            vehicleType
        });

        res.status(201).json({ ride });

        const pickupCoordinates = await mapService.getAddressCoordinates(pickup);
        const captainsInRadius = await mapService.getCaptainsInRadius(pickupCoordinates.ltd, pickupCoordinates.lng, 10);

        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        rideWithUser.otp = "";

        captainsInRadius.forEach(captain => {
            sendMessageToSocketId(captain.socketId, {
                event: 'new-ride',
                data: rideWithUser
            });
        });


    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json({ fare });
    } catch (error) {
        return res.status(500).json({ error: "could not calculate fare" });
    }
}

module.exports.acceptRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.acceptRide(rideId, req.captain._id);
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        sendMessageToSocketId(rideWithUser.user.socketId, {
            event: 'ride-accepted',
            data: {
                ride,
                fullName: req.captain.fullName,
                vehicle: req.captain.vehicle
            }
        });
        return res.status(200).json(rideWithUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.confirmRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId, otp } = req.body;

    try {
        const ride = await rideService.confirmRide(rideId, otp);
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).select('+otp').populate('user');
        sendMessageToSocketId(rideWithUser.user.socketId, {
            event: 'ride-started',
            data: {
                ride: rideWithUser,
                fullName: req.captain.fullName,
                vehicle: req.captain.vehicle
            }
        });
        return res.status(200).json(rideWithUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.cancelRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.cancelRide(rideId);
        const rideWithUser = await rideModel.findOne({ _id: ride._id }).populate('user');
        rideWithUser.otp = "";
        sendMessageToSocketId(rideWithUser.user.socketId, {
            event: 'ride-cancelled',
            data: ride
        });
        return res.status(200).json(rideWithUser);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports.completeRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.completeRide(rideId, req.captain._id);
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-completed',
            data: ride
        });
        return res.status(200).json({ ride });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}