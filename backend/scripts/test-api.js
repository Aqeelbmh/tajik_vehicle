// Script to test API endpoints

const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:5000/api';

async function testAPI() {
    try {
        console.log('Testing API endpoints...\n');

        // Test health check
        console.log('1. Testing health check endpoint...');
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        const healthData = await healthResponse.json();
        console.log('Health check:', healthData);

        // Test get all leads
        console.log('\n2. Testing get all leads endpoint...');
        const leadsResponse = await fetch(`${API_BASE_URL}/leads`);
        const leadsData = await leadsResponse.json();
        console.log('Leads count:', leadsData.length);

        // Test create lead
        console.log('\n3. Testing create lead endpoint...');
        const newLead = {
            name: 'Test User',
            company: 'Test Company',
            email: 'test@example.com',
            phone: '+1234567890',
            subject: 'Test Subject',
            message: 'Test message'
        };

        const createLeadResponse = await fetch(`${API_BASE_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLead),
        });

        const createLeadData = await createLeadResponse.json();
        console.log('Created lead:', createLeadData);

        // Test update lead status
        console.log('\n4. Testing update lead status endpoint...');
        const updateLeadResponse = await fetch(`${API_BASE_URL}/leads/${createLeadData._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'Quoting' }),
        });

        const updateLeadData = await updateLeadResponse.json();
        console.log('Updated lead:', updateLeadData);

        // Test get all partners
        console.log('\n5. Testing get all partners endpoint...');
        const partnersResponse = await fetch(`${API_BASE_URL}/partners`);
        const partnersData = await partnersResponse.json();
        console.log('Partners count:', partnersData.length);

        // Test create partner
        console.log('\n6. Testing create partner endpoint...');
        const newPartner = {
            name: 'Test Partner',
            company: 'Test Partner Company',
            email: 'partner@example.com',
            phone: '+1234567890',
            message: 'Test partner message'
        };

        const createPartnerResponse = await fetch(`${API_BASE_URL}/partners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPartner),
        });

        const createPartnerData = await createPartnerResponse.json();
        console.log('Created partner:', createPartnerData);

        console.log('\nAll tests completed successfully!');
    } catch (err) {
        console.error('Error testing API:', err);
    }
}

// Run tests
testAPI();