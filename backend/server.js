const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
// Railway provides PORT environment variable
const PORT = process.env.RAILWAY_PORT || process.env.PORT || 8081;

// Initialize Prisma Client
const prisma = new PrismaClient();

// Middleware
app.use(cors({
    origin: ['http://localhost:5174', 'http://localhost:80', 'http://localhost',
        'https://tajik-vehicle-production.up.railway.app',
        'https://tajik-vehicle.up.railway.app',
        'https://tajik-vehicle.vercel.app'],
    credentials: true
}));
app.use(express.json());

// Test DB Connection
async function checkDbConnection() {
    try {
        await prisma.$connect();
        console.log('Connected to Supabase (PostgreSQL) via Prisma');
    } catch (error) {
        console.error('Database connection error:', error.message);
        console.log('Ensure DATABASE_URL is set correctly in your environment variables.');
    }
}
checkDbConnection();

// --- Routes ---

// Leads
app.get('/api/leads', async (req, res) => {
    try {
        const leads = await prisma.lead.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(leads);
    } catch (err) {
        console.error('Error fetching leads:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/leads', async (req, res) => {
    try {
        console.log('Creating new lead:', req.body);
        const newLead = await prisma.lead.create({
            data: req.body
        });
        console.log('Lead created successfully:', newLead.id);
        res.status(201).json(newLead);
    } catch (err) {
        console.error('Error creating lead:', err.message);
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/leads/:id', async (req, res) => {
    try {
        console.log('Updating lead:', req.params.id);
        const updatedLead = await prisma.lead.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
                updatedAt: new Date() // Explicitly update updatedAt if needed, though @updatedAt handles it
            }
        });
        res.json(updatedLead);
    } catch (err) {
        console.error('Error updating lead:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(400).json({ message: err.message });
    }
});

// Partners
app.get('/api/partners', async (req, res) => {
    try {
        const partners = await prisma.partner.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(partners);
    } catch (err) {
        console.error('Error fetching partners:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/partners', async (req, res) => {
    try {
        console.log('Creating new partner:', req.body);
        const newPartner = await prisma.partner.create({
            data: req.body
        });
        console.log('Partner created successfully:', newPartner.id);
        res.status(201).json(newPartner);
    } catch (err) {
        console.error('Error creating partner:', err.message);
        res.status(400).json({ message: err.message });
    }
});

// Parts Inquiry (Stateless)
app.post('/api/parts-inquiry', async (req, res) => {
    try {
        console.log('Parts inquiry received:', req.body);
        res.json({ message: 'Parts inquiry received successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Vehicle Quote (Stateless)
app.post('/api/vehicle-quote', async (req, res) => {
    try {
        console.log('Vehicle quote request received:', req.body);
        res.json({ message: 'Vehicle quote request received successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// CMS Content
app.get('/api/content', async (req, res) => {
    try {
        const contents = await prisma.content.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(contents);
    } catch (err) {
        console.error('Error fetching all content:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/content/:page', async (req, res) => {
    try {
        const contents = await prisma.content.findMany({
            where: {
                page: req.params.page,
                isActive: true
            },
            orderBy: { order: 'asc' }
        });
        res.json(contents);
    } catch (err) {
        console.error('Error fetching content:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/content/:page/:section', async (req, res) => {
    try {
        const content = await prisma.content.findFirst({
            where: {
                page: req.params.page,
                section: req.params.section,
                isActive: true
            }
        });
        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.json(content);
    } catch (err) {
        console.error('Error fetching content:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/content', async (req, res) => {
    try {
        console.log('Creating new content:', req.body);
        const newContent = await prisma.content.create({
            data: req.body
        });
        res.status(201).json(newContent);
    } catch (err) {
        console.error('Error creating content:', err.message);
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/content/:id', async (req, res) => {
    try {
        const updatedContent = await prisma.content.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });
        res.json(updatedContent);
    } catch (err) {
        console.error('Error updating content:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/content/:id', async (req, res) => {
    try {
        await prisma.content.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Content deleted' });
    } catch (err) {
        console.error('Error deleting content:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Content not found' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(vehicles);
    } catch (err) {
        console.error('Error fetching vehicles:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: req.params.id }
        });
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (err) {
        console.error('Error fetching vehicle:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/vehicles', async (req, res) => {
    try {
        console.log('Creating new vehicle:', req.body);
        const newVehicle = await prisma.vehicle.create({
            data: req.body
        });
        res.status(201).json(newVehicle);
    } catch (err) {
        console.error('Error creating vehicle:', err.message);
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/vehicles/:id', async (req, res) => {
    try {
        const updatedVehicle = await prisma.vehicle.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });
        res.json(updatedVehicle);
    } catch (err) {
        console.error('Error updating vehicle:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        await prisma.vehicle.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Vehicle deleted' });
    } catch (err) {
        console.error('Error deleting vehicle:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Spare Parts
app.get('/api/spare-parts', async (req, res) => {
    try {
        const spareParts = await prisma.sparePart.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(spareParts);
    } catch (err) {
        console.error('Error fetching spare parts:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/spare-parts/:id', async (req, res) => {
    try {
        const sparePart = await prisma.sparePart.findUnique({
            where: { id: req.params.id }
        });
        if (!sparePart) {
            return res.status(404).json({ message: 'Spare part not found' });
        }
        res.json(sparePart);
    } catch (err) {
        console.error('Error fetching spare part:', err.message);
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/spare-parts', async (req, res) => {
    try {
        console.log('Creating new spare part:', req.body);
        const newSparePart = await prisma.sparePart.create({
            data: req.body
        });
        res.status(201).json(newSparePart);
    } catch (err) {
        console.error('Error creating spare part:', err.message);
        res.status(400).json({ message: err.message });
    }
});

app.put('/api/spare-parts/:id', async (req, res) => {
    try {
        const updatedSparePart = await prisma.sparePart.update({
            where: { id: req.params.id },
            data: {
                ...req.body,
                updatedAt: new Date()
            }
        });
        res.json(updatedSparePart);
    } catch (err) {
        console.error('Error updating spare part:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Spare part not found' });
        }
        res.status(400).json({ message: err.message });
    }
});

app.delete('/api/spare-parts/:id', async (req, res) => {
    try {
        await prisma.sparePart.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Spare part deleted' });
    } catch (err) {
        console.error('Error deleting spare part:', err.message);
        if (err.code === 'P2025') {
            return res.status(404).json({ message: 'Spare part not found' });
        }
        res.status(500).json({ message: err.message });
    }
});

// Health check
app.get('/api/health', async (req, res) => {
    let dbStatus = 'Disconnected';
    try {
        // Simple query to check DB connection
        await prisma.$queryRaw`SELECT 1`;
        dbStatus = 'Connected';
    } catch (e) {
        dbStatus = 'Error: ' + e.message;
    }

    res.json({
        status: 'OK',
        timestamp: new Date(),
        database: dbStatus
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;