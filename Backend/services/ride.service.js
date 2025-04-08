const rideModel = require('../models/ride.model');
const mapService = require('./maps.service');
const crypto = require('crypto');

async function getFare( pickup, destination ) {
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination);
    if (!distanceTime || !distanceTime.distance || !distanceTime.duration) {
        throw new Error('Unable to calculate distance and time');
    }

    const { distance, duration } = distanceTime;

    let autoRate = Math.round(20 + (distance.value/1000) * 10 + (duration.value/60) * 1);
    let carRate = Math.round(50 + (distance.value/1000) * 15 + (duration.value/60) * 2);
    let motoRate = Math.round(15 + (distance.value/1000) * 8 + (duration.value/60) * 0.5);
    
    const fareRates = {
        auto:  autoRate,
        car:  carRate,
        moto:  motoRate,
    };

    if (!fareRates) {
        throw new Error('Cannot clculate fare rates');
    }

    return fareRates;
}

function getOtp(num) {
    const otp = crypto.randomInt(Math.pow(10, num-1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.getFare = getFare;

module.exports.createRide = async ({user, pickup, destination, vehicleType}) => {
    if(!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

    const ride = rideModel.create({
        user,
        pickup,
        destination,
        fare : fare[vehicleType],
        otp: getOtp(6),
    });

    return ride;
};

module.exports.acceptRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error('Ride ID and Captain ID are required');
    }

    const ride = await rideModel.findById(rideId).select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'pending') {
        throw new Error('Ride is not pending');
    }

    ride.captain = captainId;
    ride.status = 'accepted';
    await ride.save();

    return ride;
}

module.exports.confirmRide = async (rideId, otp) => {
    if (!rideId || !otp) {
        throw new Error('Ride ID and OTP are required');
    }
    
    
    const ride = await rideModel.findById(rideId).select('+otp');
    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.otp !== otp) {
        throw new Error('OTP did not match');
    }

    ride.status = 'ongoing';
    await ride.save();

    return ride;
}

module.exports.cancelRide = async (rideId) => {
    if (!rideId) {
        throw new Error('Ride ID is required');
    }

    const ride = await rideModel.findById(rideId);
    if (!ride) {
        throw new Error('Ride not found');
    }

    ride.status = 'pending';
    await ride.save();

    return ride;
}

module.exports.completeRide = async (rideId, captainId) => {
    if (!rideId || !captainId) {
        throw new Error('Ride ID and Captain ID are required');
    }

    const ride = await rideModel.findById(rideId).populate('user');
    if (!ride) {
        throw new Error('Ride not found');
    }

    if(!ride.captain.equals(captainId)) {
        throw new Error('Unauthorized');
    }

    ride.status = 'completed';
    await ride.save();

    return ride;
}