// API service for communicating with the backend

// Use a default URL if environment variable is not set
// In development, use localhost; in production, use relative path for proxy
const API_BASE_URL = import.meta.env?.VITE_API_URL ||
    (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

// Handle API responses
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'API request failed');
    }
    return response.json();
};

// Lead management
export const leadService = {
    // Get all leads
    getAllLeads: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/leads`);
            return handleResponse(response);
        } catch (error) {
            console.error('Error fetching leads:', error);
            // Return empty array if API is not available
            return [];
        }
    },

    // Create a new lead
    createLead: async (leadData) => {
        const response = await fetch(`${API_BASE_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(leadData),
        });
        return handleResponse(response);
    },

    // Update lead status
    updateLeadStatus: async (id, status) => {
        const response = await fetch(`${API_BASE_URL}/leads/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status }),
        });
        return handleResponse(response);
    },
};

// Partner management
export const partnerService = {
    // Get all partners
    getAllPartners: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/partners`);
            return handleResponse(response);
        } catch (error) {
            console.error('Error fetching partners:', error);
            // Return empty array if API is not available
            return [];
        }
    },

    // Create a new partner inquiry
    createPartnerInquiry: async (partnerData) => {
        const response = await fetch(`${API_BASE_URL}/partners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partnerData),
        });
        return handleResponse(response);
    },
};

// Parts inquiry
export const partsService = {
    // Submit a parts inquiry
    submitInquiry: async (inquiryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/parts-inquiry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(inquiryData),
            });
            return handleResponse(response);
        } catch (error) {
            console.error('Error submitting parts inquiry:', error);
            throw error;
        }
    },
};

// Vehicle quote request
export const vehicleService = {
    // Submit a vehicle quote request
    requestQuote: async (quoteData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/vehicle-quote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(quoteData),
            });
            return handleResponse(response);
        } catch (error) {
            console.warn('Vehicle quote API unavailable, returning fallback response.', error);
            return { status: 'queued', fallback: true };
        }
    },
};

// Health check
export const healthService = {
    checkHealth: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            return handleResponse(response);
        } catch (error) {
            console.error('Health check failed:', error);
            // Return a fallback response if API is not available
            return { status: 'Disconnected', timestamp: new Date(), database: 'Unknown' };
        }
    },
};