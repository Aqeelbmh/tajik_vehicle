// Simple script to verify MongoDB credentials
const { MongoClient } = require('mongodb');

// Use the exact connection string provided with properly encoded password
const username = "bmhaqeel995_db_user";
const password = "<Thajik321#>";
const cluster = "tajik1.dvdguqc.mongodb.net";
const appName = "tajik1";

// Properly encode the password
const encodedPassword = encodeURIComponent(password);
const uri = `mongodb+srv://${username}:${encodedPassword}@${cluster}/?appName=${appName}`;

async function testConnection() {
    const client = new MongoClient(uri, {
        tls: true,
        tlsAllowInvalidCertificates: false,
        tlsAllowInvalidHostnames: false
    });

    try {
        console.log('Attempting to connect to MongoDB...');
        console.log('Using connection string:', uri.replace(encodedPassword, '********'));

        // Connect to the server
        await client.connect();
        console.log('✅ Successfully connected to MongoDB!');

        // List databases
        const databases = await client.db().admin().listDatabases();
        console.log('Available databases:');
        databases.databases.forEach(db => console.log(`  - ${db.name}`));

    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        console.log('\nTroubleshooting steps:');
        console.log('1. Verify the username is correct: bmhaqeel995_db_user');
        console.log('2. Verify the password is correct: <Thajik321#>');
        console.log('3. Check if the user has proper permissions in MongoDB Atlas');
        console.log('4. Try resetting the password in MongoDB Atlas');
    } finally {
        await client.close();
    }
}

testConnection().catch(console.dir);