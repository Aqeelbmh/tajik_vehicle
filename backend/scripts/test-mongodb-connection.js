const { MongoClient, ServerApiVersion } = require('mongodb');

// Make sure to use the correct connection string with database name
const uri = "mongodb+srv://bmhaqeel995_db_user:%3CThajik321%23%3E@tajik1.dvdguqc.mongodb.net/hvsp?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
    // Add SSL options to resolve TLS issues
    tls: true,
    tlsAllowInvalidCertificates: false,
    tlsAllowInvalidHostnames: false
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // List databases to verify full connectivity
        const databases = await client.db().admin().listDatabases();
        console.log("Databases:");
        databases.databases.forEach(db => console.log(`- ${db.name}`));
    } catch (error) {
        console.error("Connection failed:", error.message);
        console.log("Please check:");
        console.log("1. Your network connection");
        console.log("2. If your IP is whitelisted in MongoDB Atlas");
        console.log("3. If your credentials are correct");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);