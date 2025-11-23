const mongoose = require('mongoose');

// Use the exact connection string provided by the user
const MONGODB_URI = "mongodb+srv://bmhaqeel995_db_user:%3CThajik321%23%3E@tajik1.dvdguqc.mongodb.net/?appName=tajik1";

console.log('Attempting to connect to MongoDB with exact connection string...');
console.log('Connection string:', MONGODB_URI);

mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    // Add SSL options to resolve TLS issues
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false
}).then(() => {
    console.log('Successfully connected to MongoDB!');
    console.log('Connection details:');
    console.log('- Host:', mongoose.connection.host);
    console.log('- Port:', mongoose.connection.port);
    console.log('- Name:', mongoose.connection.name);
    mongoose.connection.close();
}).catch((error) => {
    console.error('MongoDB connection error:', error.message);
    console.error('Error code:', error.code);
    console.error('Error name:', error.name);

    // Additional debugging information
    if (error.name === 'MongoServerSelectionError') {
        console.log('\nDebugging tips:');
        console.log('1. Check if your IP is whitelisted in MongoDB Atlas');
        console.log('2. Verify your credentials are correct');
        console.log('3. Check if the MongoDB Atlas cluster is running');
        console.log('4. Try connecting with a MongoDB client like MongoDB Compass');
    }
});