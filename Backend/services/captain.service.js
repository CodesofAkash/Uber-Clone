const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({firstName, lastName, email, password, vehicle}) => {
    try {
        if(!firstName || !email || !password || !vehicle) {
            throw new Error('All fields are required');
        }

        const captain = await captainModel.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password: await captainModel.hashPassword(password),
            vehicle: {
                color: vehicle.color,
                plate: vehicle.plate,
                capacity: vehicle.capacity,
                type: vehicle.type
            }
        });

        return captain;

    } catch (error) {
        console.log('Error while creating captain', error.message);
    }
}