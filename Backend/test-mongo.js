const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/uber-video', {
    serverSelectionTimeoutMS: 5000
})
.then(() => {
    console.log('✅ MongoDB connection successful!');
    process.exit(0);
})
.catch((err) => {
    console.log('❌ MongoDB connection failed:', err.message);
    console.log('\nPossible solutions:');
    console.log('1. Start MongoDB service: net start MongoDB');
    console.log('2. Check if MongoDB is running: Get-Service MongoDB');
    console.log('3. Verify MongoDB port (default 27017)');
    console.log('4. Check MongoDB configuration');
    process.exit(1);
});
