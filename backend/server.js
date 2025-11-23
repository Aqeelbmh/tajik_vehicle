const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
// Railway provides PORT environment variable
const PORT = process.env.RAILWAY_PORT || process.env.PORT || 8081;

// Middleware
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:80', 'http://localhost',
        'https://tajik-vehicle-production.up.railway.app',  // Add Railway domain
        'https://tajik-vehicle.up.railway.app'],            // Add Railway domain
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB with better error handling
const connectDB = async () => {
    try {
        console.log('Attempting to connect to MongoDB...');
        // Use RAILWAY_MONGO_URI if available, otherwise use MONGODB_URI
        const mongoUri = process.env.RAILWAY_MONGO_URI || process.env.MONGODB_URI || 'mongodb://mongo:27017/hvsp';

        const conn = await mongoose.connect(mongoUri, {
            // Remove deprecated options
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        });
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        console.error('Connection string:', process.env.MONGODB_URI);
        console.log('Starting server without database connection...');
        console.log('To fix this issue:');
        console.log('1. Log in to your MongoDB Atlas account');
        console.log('2. Go to your cluster\'s security settings');
        console.log('3. Add your current IP address to the IP whitelist');
        console.log('Alternatively, you can add 0.0.0.0/0 to the whitelist to allow all IPs (not recommended for production)');
        // Server will continue to run even without DB connection
    }
};

// Call the connect function
connectDB();

// Define schemas
const contentSchema = new mongoose.Schema({
    page: { type: String, required: true },
    section: { type: String, required: true },
    title: String,
    content: String,
    imageUrl: String,
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

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

// Vehicle product schema
const vehicleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    model: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: String,
    specifications: Object,
    images: [String],
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Spare part product schema
const sparePartSchema = new mongoose.Schema({
    name: { type: String, required: true },
    partNumber: { type: String, required: true },
    category: { type: String, required: true },
    compatibleModels: [String],
    price: { type: Number, required: true },
    description: String,
    images: [String],
    inStock: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Create models (these will only work if DB connection is successful)
let Content, Lead, Partner, Vehicle, SparePart;
try {
    Content = mongoose.model('Content', contentSchema);
    Lead = mongoose.model('Lead', leadSchema);
    Partner = mongoose.model('Partner', partnerSchema);
    Vehicle = mongoose.model('Vehicle', vehicleSchema);
    SparePart = mongoose.model('SparePart', sparePartSchema);
} catch (error) {
    console.log('Models will be created when DB connection is established');
}

// Routes with error handling for when DB is not available
app.get('/api/leads', async (req, res) => {
    try {
        if (!Lead) {
            console.log('Lead model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching all leads');
        const leads = await Lead.find().sort({ createdAt: -1 });
        res.json(leads);
    } catch (err) {
        console.error('Error fetching leads:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/leads', async (req, res) => {
    try {
        if (!Lead) {
            console.log('Lead model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Creating new lead:', req.body);
        const lead = new Lead(req.body);
        const newLead = await lead.save();
        console.log('Lead created successfully:', newLead._id);
        res.status(201).json(newLead);
    } catch (err) {
        console.error('Error creating lead:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/leads/:id', async (req, res) => {
    try {
        if (!Lead) {
            console.log('Lead model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Updating lead:', req.params.id);
        const lead = await Lead.findById(req.params.id);
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }

        Object.assign(lead, req.body);
        lead.updatedAt = new Date();

        const updatedLead = await lead.save();
        console.log('Lead updated successfully:', updatedLead._id);
        res.json(updatedLead);
    } catch (err) {
        console.error('Error updating lead:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Partner inquiry routes
app.get('/api/partners', async (req, res) => {
    try {
        if (!Partner) {
            console.log('Partner model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching all partners');
        const partners = await Partner.find().sort({ createdAt: -1 });
        res.json(partners);
    } catch (err) {
        console.error('Error fetching partners:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/partners', async (req, res) => {
    try {
        if (!Partner) {
            console.log('Partner model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Creating new partner:', req.body);
        const partner = new Partner(req.body);
        const newPartner = await partner.save();
        console.log('Partner created successfully:', newPartner._id);
        res.status(201).json(newPartner);
    } catch (err) {
        console.error('Error creating partner:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Parts inquiry routes
app.post('/api/parts-inquiry', async (req, res) => {
    try {
        // In a real application, this would be stored in a database
        console.log('Parts inquiry received:', req.body);
        res.json({ message: 'Parts inquiry received successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Vehicle quote request routes
app.post('/api/vehicle-quote', async (req, res) => {
    try {
        // In a real application, this would be stored in a database
        console.log('Vehicle quote request received:', req.body);
        res.json({ message: 'Vehicle quote request received successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// CMS routes
// Get all content (for CMS dashboard)
app.get('/api/content', async (req, res) => {
    try {
        if (!Content) {
            console.log('Content model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching all content');
        const contents = await Content.find().sort({ createdAt: -1 });
        res.json(contents);
    } catch (err) {
        console.error('Error fetching all content:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/content/:page', async (req, res) => {
    try {
        if (!Content) {
            console.log('Content model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching content for page:', req.params.page);
        const contents = await Content.find({
            page: req.params.page,
            isActive: true
        }).sort({ order: 1 });
        res.json(contents);
    } catch (err) {
        console.error('Error fetching content:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/content/:page/:section', async (req, res) => {
    try {
        if (!Content) {
            console.log('Content model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching content for page/section:', req.params.page, req.params.section);
        const content = await Content.findOne({
            page: req.params.page,
            section: req.params.section,
            isActive: true
        });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (err) {
        console.error('Error fetching content:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/content', async (req, res) => {
    try {
        if (!Content) {
            console.log('Content model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Creating new content:', req.body);
        const content = new Content(req.body);
        const newContent = await content.save();
        console.log('Content created successfully:', newContent._id);
        res.status(201).json(newContent);
    } catch (err) {
        console.error('Error creating content:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/content/:id', async (req, res) => {
    try {
        if (!Content) {
            console.log('Content model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Updating content:', req.params.id);
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        Object.assign(content, req.body);
        content.updatedAt = new Date();

        const updatedContent = await content.save();
        console.log('Content updated successfully:', updatedContent._id);
        res.json(updatedContent);
    } catch (err) {
        console.error('Error updating content:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/content/:id', async (req, res) => {
    try {
        if (!Content) {
            console.log('Content model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Deleting content:', req.params.id);
        const content = await Content.findById(req.params.id);
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }

        await content.deleteOne();
        console.log('Content deleted successfully:', req.params.id);
        res.json({ message: 'Content deleted' });
    } catch (err) {
        console.error('Error deleting content:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Vehicle CRUD routes
// Get all vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        if (!Vehicle) {
            console.log('Vehicle model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching all vehicles');
        const vehicles = await Vehicle.find().sort({ createdAt: -1 });
        res.json(vehicles);
    } catch (err) {
        console.error('Error fetching vehicles:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Get vehicle by ID
app.get('/api/vehicles/:id', async (req, res) => {
    try {
        if (!Vehicle) {
            console.log('Vehicle model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching vehicle:', req.params.id);
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (err) {
        console.error('Error fetching vehicle:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Create new vehicle
app.post('/api/vehicles', async (req, res) => {
    try {
        if (!Vehicle) {
            console.log('Vehicle model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Creating new vehicle:', req.body);
        const vehicle = new Vehicle(req.body);
        const newVehicle = await vehicle.save();
        console.log('Vehicle created successfully:', newVehicle._id);
        res.status(201).json(newVehicle);
    } catch (err) {
        console.error('Error creating vehicle:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Update vehicle
app.put('/api/vehicles/:id', async (req, res) => {
    try {
        if (!Vehicle) {
            console.log('Vehicle model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Updating vehicle:', req.params.id);
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        Object.assign(vehicle, req.body);
        vehicle.updatedAt = new Date();

        const updatedVehicle = await vehicle.save();
        console.log('Vehicle updated successfully:', updatedVehicle._id);
        res.json(updatedVehicle);
    } catch (err) {
        console.error('Error updating vehicle:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Delete vehicle
app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        if (!Vehicle) {
            console.log('Vehicle model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Deleting vehicle:', req.params.id);
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        await vehicle.deleteOne();
        console.log('Vehicle deleted successfully:', req.params.id);
        res.json({ message: 'Vehicle deleted' });
    } catch (err) {
        console.error('Error deleting vehicle:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Spare Part CRUD routes
// Get all spare parts
app.get('/api/spare-parts', async (req, res) => {
    try {
        if (!SparePart) {
            console.log('SparePart model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching all spare parts');
        const spareParts = await SparePart.find().sort({ createdAt: -1 });
        res.json(spareParts);
    } catch (err) {
        console.error('Error fetching spare parts:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Get spare part by ID
app.get('/api/spare-parts/:id', async (req, res) => {
    try {
        if (!SparePart) {
            console.log('SparePart model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Fetching spare part:', req.params.id);
        const sparePart = await SparePart.findById(req.params.id);
        if (!sparePart) {
            return res.status(404).json({ message: 'Spare part not found' });
        }
        res.json(sparePart);
    } catch (err) {
        console.error('Error fetching spare part:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Create new spare part
app.post('/api/spare-parts', async (req, res) => {
    try {
        if (!SparePart) {
            console.log('SparePart model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Creating new spare part:', req.body);
        const sparePart = new SparePart(req.body);
        const newSparePart = await sparePart.save();
        console.log('Spare part created successfully:', newSparePart._id);
        res.status(201).json(newSparePart);
    } catch (err) {
        console.error('Error creating spare part:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Update spare part
app.put('/api/spare-parts/:id', async (req, res) => {
    try {
        if (!SparePart) {
            console.log('SparePart model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Updating spare part:', req.params.id);
        const sparePart = await SparePart.findById(req.params.id);
        if (!sparePart) {
            return res.status(404).json({ message: 'Spare part not found' });
        }

        Object.assign(sparePart, req.body);
        sparePart.updatedAt = new Date();

        const updatedSparePart = await sparePart.save();
        console.log('Spare part updated successfully:', updatedSparePart._id);
        res.json(updatedSparePart);
    } catch (err) {
        console.error('Error updating spare part:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Delete spare part
app.delete('/api/spare-parts/:id', async (req, res) => {
    try {
        if (!SparePart) {
            console.log('SparePart model not available - DB not connected');
            return res.status(503).json({ message: 'Database not available' });
        }
        console.log('Deleting spare part:', req.params.id);
        const sparePart = await SparePart.findById(req.params.id);
        if (!sparePart) {
            return res.status(404).json({ message: 'Spare part not found' });
        }

        await sparePart.deleteOne();
        console.log('Spare part deleted successfully:', req.params.id);
        res.json({ message: 'Spare part deleted' });
    } catch (err) {
        console.error('Error deleting spare part:', err.message);
        if (err.name === 'MongoServerSelectionError') {
            return res.status(503).json({ message: 'Database connection timeout. Please check your MongoDB connection.' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date(),
        database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;