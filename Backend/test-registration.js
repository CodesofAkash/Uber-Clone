const axios = require('axios');

async function testRegistration() {
    try {
        const response = await axios.post('http://localhost:4000/users/register', {
            fullName: {
                firstName: 'John',
                lastName: 'Doe'
            },
            email: 'john@example.com',
            password: '123456'
        });
        
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

testRegistration();
