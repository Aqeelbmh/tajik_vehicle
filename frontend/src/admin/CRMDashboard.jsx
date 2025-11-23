import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { leadService, partnerService } from '../services/api';
import AdminNavigation from './AdminNavigation';
import './products/Products.css';

const CRMDashboard = () => {
    const { t } = useTranslation();
    const [leads, setLeads] = useState([]);
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dbStatus, setDbStatus] = useState('Unknown');

    // Add baseUrl constant for API calls
    const baseUrl = import.meta.env?.VITE_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

    // Fetch data from backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Check health first
                const healthResponse = await fetch(`${baseUrl}/health`);
                let databaseStatus = 'Disconnected';
                if (healthResponse.ok) {
                    const healthData = await healthResponse.json();
                    databaseStatus = healthData.database;
                    setDbStatus(databaseStatus);
                }

                // If database is disconnected, use mock data
                if (databaseStatus !== 'Connected') {
                    console.log('Database disconnected, using mock data');
                    // Mock leads data
                    const mockLeads = [
                        {
                            _id: '1',
                            name: 'John Smith',
                            company: 'Construction Co.',
                            email: 'john@example.com',
                            phone: '+992 123 456 789',
                            subject: 'Tractor Inquiry',
                            message: 'Interested in purchasing a new tractor for agricultural use.',
                            status: 'New Inquiry',
                            createdAt: new Date('2025-11-15')
                        },
                        {
                            _id: '2',
                            name: 'Sarah Johnson',
                            company: 'Farm Equipment Ltd',
                            email: 'sarah@farmequip.com',
                            phone: '+992 987 654 321',
                            subject: 'Parts Request',
                            message: 'Need spare parts for John Deere tractor model X200.',
                            status: 'Quoting',
                            createdAt: new Date('2025-11-17')
                        },
                        {
                            _id: '3',
                            name: 'Michael Brown',
                            company: 'Industrial Solutions',
                            email: 'michael@industrialsol.com',
                            phone: '+992 456 789 123',
                            subject: 'Bulldozer Quote',
                            message: 'Requesting quote for CAT bulldozer with specific attachments.',
                            status: 'Negotiation',
                            createdAt: new Date('2025-11-18')
                        }
                    ];

                    // Mock partners data
                    const mockPartners = [
                        {
                            _id: '1',
                            name: 'Alex Turner',
                            company: 'Heavy Machinery Distributors',
                            email: 'alex@hmd.com',
                            phone: '+992 111 222 333',
                            message: 'Interested in becoming a regional partner for spare parts distribution.',
                            status: 'New Inquiry',
                            createdAt: new Date('2025-11-16')
                        },
                        {
                            _id: '2',
                            name: 'Emma Wilson',
                            company: 'Agricultural Services',
                            email: 'emma@agservices.com',
                            phone: '+992 444 555 666',
                            message: 'Looking to establish service center partnership.',
                            status: 'Quoting',
                            createdAt: new Date('2025-11-18')
                        }
                    ];

                    setLeads(mockLeads);
                    setPartners(mockPartners);
                    setError('Database is currently disconnected. Displaying mock data for demonstration.');
                } else {
                    // Database is connected, fetch real data
                    const [leadsData, partnersData] = await Promise.all([
                        leadService.getAllLeads(),
                        partnerService.getAllPartners()
                    ]);

                    setLeads(leadsData);
                    setPartners(partnersData);
                    setError(null);
                }
            } catch (err) {
                console.error('Error fetching CRM data:', err);
                setError('Failed to load CRM data. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Refresh data every 30 seconds
        const interval = setInterval(fetchData, 30000);
        return () => clearInterval(interval);
    }, []);

    const updateLeadStatus = async (id, newStatus) => {
        // If database is disconnected, update mock data locally
        if (dbStatus !== 'Connected') {
            setLeads(leads.map(lead =>
                lead._id === id ? { ...lead, status: newStatus, updatedAt: new Date() } : lead
            ));
            return;
        }

        try {
            const updatedLead = await leadService.updateLeadStatus(id, newStatus);
            setLeads(leads.map(lead =>
                lead._id === id ? updatedLead : lead
            ));
        } catch (err) {
            console.error('Error updating lead status:', err);
            alert('Failed to update lead status. Please try again.');
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'New Inquiry': return 'status-new';
            case 'Quoting': return 'status-quoting';
            case 'Negotiation': return 'status-negotiation';
            case 'Closed/Won': return 'status-won';
            case 'Closed/Lost': return 'status-lost';
            default: return 'status-new';
        }
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'New Inquiry': return 'New';
            case 'Quoting': return 'Quoting';
            case 'Negotiation': return 'Negotiation';
            case 'Closed/Won': return 'Won';
            case 'Closed/Lost': return 'Lost';
            default: return status;
        }
    };

    const refreshData = async () => {
        try {
            setLoading(true);

            // Check health first
            const healthResponse = await fetch(`${baseUrl}/health`);
            let databaseStatus = 'Disconnected';
            if (healthResponse.ok) {
                const healthData = await healthResponse.json();
                databaseStatus = healthData.database;
                setDbStatus(databaseStatus);
            }

            // If database is disconnected, use mock data
            if (databaseStatus !== 'Connected') {
                console.log('Database disconnected, using mock data');
                // Mock leads data
                const mockLeads = [
                    {
                        _id: '1',
                        name: 'John Smith',
                        company: 'Construction Co.',
                        email: 'john@example.com',
                        phone: '+992 123 456 789',
                        subject: 'Tractor Inquiry',
                        message: 'Interested in purchasing a new tractor for agricultural use.',
                        status: 'New Inquiry',
                        createdAt: new Date('2025-11-15')
                    },
                    {
                        _id: '2',
                        name: 'Sarah Johnson',
                        company: 'Farm Equipment Ltd',
                        email: 'sarah@farmequip.com',
                        phone: '+992 987 654 321',
                        subject: 'Parts Request',
                        message: 'Need spare parts for John Deere tractor model X200.',
                        status: 'Quoting',
                        createdAt: new Date('2025-11-17')
                    },
                    {
                        _id: '3',
                        name: 'Michael Brown',
                        company: 'Industrial Solutions',
                        email: 'michael@industrialsol.com',
                        phone: '+992 456 789 123',
                        subject: 'Bulldozer Quote',
                        message: 'Requesting quote for CAT bulldozer with specific attachments.',
                        status: 'Negotiation',
                        createdAt: new Date('2025-11-18')
                    }
                ];

                // Mock partners data
                const mockPartners = [
                    {
                        _id: '1',
                        name: 'Alex Turner',
                        company: 'Heavy Machinery Distributors',
                        email: 'alex@hmd.com',
                        phone: '+992 111 222 333',
                        message: 'Interested in becoming a regional partner for spare parts distribution.',
                        status: 'New Inquiry',
                        createdAt: new Date('2025-11-16')
                    },
                    {
                        _id: '2',
                        name: 'Emma Wilson',
                        company: 'Agricultural Services',
                        email: 'emma@agservices.com',
                        phone: '+992 444 555 666',
                        message: 'Looking to establish service center partnership.',
                        status: 'Quoting',
                        createdAt: new Date('2025-11-18')
                    }
                ];

                setLeads(mockLeads);
                setPartners(mockPartners);
                setError('Database is currently disconnected. Displaying mock data for demonstration.');
            } else {
                // Database is connected, fetch real data
                const [leadsData, partnersData] = await Promise.all([
                    leadService.getAllLeads(),
                    partnerService.getAllPartners()
                ]);

                setLeads(leadsData);
                setPartners(partnersData);
                setError(null);
            }
        } catch (err) {
            console.error('Error refreshing CRM data:', err);
            setError('Failed to refresh CRM data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="crm-dashboard">{t('common.loading')}</div>;
    }

    return (
        <div className="crm-dashboard">
            <div className="container">
                <AdminNavigation />
                <div className="dashboard-header">
                    <div>
                        <h1>CRM Dashboard</h1>
                        <p className="dashboard-subtitle">Manage customer inquiries and partner requests</p>
                    </div>
                    <div className="dashboard-actions">
                        <div className="db-status">
                            Database: <span className={dbStatus === 'Connected' ? 'status-connected' : 'status-disconnected'}>{dbStatus}</span>
                        </div>
                        <button className="btn btn-secondary" onClick={refreshData}>
                            Refresh Data
                        </button>
                    </div>
                    {dbStatus !== 'Connected' && (
                        <div className="warning-message">
                            <p>⚠️ Database is currently disconnected. Displaying mock data for demonstration purposes.</p>
                        </div>
                    )}
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* Leads Section */}
                <section className="crm-section">
                    <div className="section-header">
                        <h2>Customer Inquiries ({leads.length})</h2>
                        <div className="section-stats">
                            <span className="stat-item">
                                New: {leads.filter(l => l.status === 'New Inquiry').length}
                            </span>
                            <span className="stat-item">
                                In Progress: {leads.filter(l => ['Quoting', 'Negotiation'].includes(l.status)).length}
                            </span>
                            <span className="stat-item">
                                Closed: {leads.filter(l => l.status.startsWith('Closed')).length}
                            </span>
                        </div>
                    </div>
                    <div className="leads-table">
                        {leads.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Contact</th>
                                        <th>Subject</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map(lead => (
                                        <tr key={lead._id}>
                                            <td>
                                                <div className="lead-name">{lead.name}</div>
                                                {lead.company && <div className="lead-company">{lead.company}</div>}
                                            </td>
                                            <td>{lead.company || '-'}</td>
                                            <td>
                                                <div>{lead.email}</div>
                                                <div>{lead.phone}</div>
                                            </td>
                                            <td>
                                                <div className="lead-subject">{lead.subject}</div>
                                                {lead.message && (
                                                    <div className="lead-message-preview">
                                                        {lead.message.substring(0, 50)}{lead.message.length > 50 ? '...' : ''}
                                                    </div>
                                                )}
                                            </td>
                                            <td>
                                                <span className={`status-badge ${getStatusColor(lead.status)}`}>
                                                    {getStatusLabel(lead.status)}
                                                </span>
                                            </td>
                                            <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <select
                                                    value={lead.status}
                                                    onChange={(e) => updateLeadStatus(lead._id, e.target.value)}
                                                    className="status-select"
                                                >
                                                    <option value="New Inquiry">New</option>
                                                    <option value="Quoting">Quoting</option>
                                                    <option value="Negotiation">Negotiation</option>
                                                    <option value="Closed/Won">Won</option>
                                                    <option value="Closed/Lost">Lost</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <p>No customer inquiries found.</p>
                                {dbStatus !== 'Connected' && (
                                    <p className="empty-state-note">Database connection required to view inquiries.</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>

                {/* Partners Section */}
                <section className="crm-section">
                    <div className="section-header">
                        <h2>Partner Inquiries ({partners.length})</h2>
                        <div className="section-stats">
                            <span className="stat-item">
                                New: {partners.filter(p => p.status === 'New Inquiry').length}
                            </span>
                            <span className="stat-item">
                                In Progress: {partners.filter(p => ['Quoting', 'Negotiation'].includes(p.status)).length}
                            </span>
                            <span className="stat-item">
                                Closed: {partners.filter(p => p.status.startsWith('Closed')).length}
                            </span>
                        </div>
                    </div>
                    <div className="partners-table">
                        {partners.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Company</th>
                                        <th>Contact</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {partners.map(partner => (
                                        <tr key={partner._id}>
                                            <td>
                                                <div className="lead-name">{partner.name}</div>
                                                {partner.company && <div className="lead-company">{partner.company}</div>}
                                            </td>
                                            <td>{partner.company || '-'}</td>
                                            <td>
                                                <div>{partner.email}</div>
                                                <div>{partner.phone}</div>
                                            </td>
                                            <td>
                                                <span className={`status-badge ${getStatusColor(partner.status)}`}>
                                                    {getStatusLabel(partner.status)}
                                                </span>
                                            </td>
                                            <td>{new Date(partner.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <div className="empty-state">
                                <p>No partner inquiries found.</p>
                                {dbStatus !== 'Connected' && (
                                    <p className="empty-state-note">Database connection required to view inquiries.</p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default CRMDashboard;