const userModel = require('../models/user.model');

module.exports.createUser = async ({firstName, lastName, email, password}) => {
    try {
        if(!firstName || !email || !password) {
            throw new Error('All fields are required');
        }

        const user = await userModel.create({
            fullName: {
                firstName,
                lastName,
            },
            email,
            password: await userModel.hashPassword(password)
        });

        return user;

    } catch (error) {
        console.log('Error while creating user', error.message);
    }
}