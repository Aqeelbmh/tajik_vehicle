// Script to initialize the MongoDB database with sample data

const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hvsp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define schemas
const leadSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    subject: String,
    message: String,
    status: { type: String, default: 'New Inquiry' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const partnerSchema = new mongoose.Schema({
    name: String,
    company: String,
    email: String,
    phone: String,
    message: String,
    status: { type: String, default: 'New Inquiry' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create models
const Lead = mongoose.model('Lead', leadSchema);
const Partner = mongoose.model('Partner', partnerSchema);

// Sample data
const sampleLeads = [
    {
        name: 'John Smith',
        company: 'ABC Construction',
        email: 'john@abc.com',
        phone: '+992 123 456 789',
        subject: 'Vehicle Inquiry',
        message: 'Interested in bulldozer models',
        status: 'New Inquiry'
    },
    {
        name: 'Maria Garcia',
        company: 'FarmTech Solutions',
        email: 'maria@farmtech.tj',
        phone: '+992 987 654 321',
        subject: 'Parts Request',
        message: 'Need engine parts for tractor model X1',
        status: 'Quoting'
    },
    {
        name: 'Ahmad Rashid',
        company: 'Rashid Logistics',
        email: 'ahmad@rashid.tj',
        phone: '+992 456 789 123',
        subject: 'Service Inquiry',
        message: 'Request for maintenance service',
        status: 'Negotiation'
    }
];

const samplePartners = [
    {
        name: 'David Wilson',
        company: 'Global Parts Inc',
        email: 'david@globalparts.com',
        phone: '+992 111 222 333',
        message: 'Interested in becoming a distribution partner',
        status: 'New Inquiry'
    },
    {
        name: 'Elena Petrova',
        company: 'TechSolutions TJ',
        email: 'elena@techsolutions.tj',
        phone: '+992 444 555 666',
        message: 'Partnership opportunity for spare parts',
        status: 'Contacted'
    }
];

// Initialize database
const initDB = async () => {
    try {
        // Clear existing data
        await Lead.deleteMany({});
        await Partner.deleteMany({});

        // Insert sample data
        await Lead.insertMany(sampleLeads);
        await Partner.insertMany(samplePartners);

        console.log('Database initialized with sample data');
        process.exit(0);
    } catch (err) {
        console.error('Error initializing database:', err);
        process.exit(1);
    }
};

// Run initialization
initDB();