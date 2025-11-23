import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import './Products.css';

const SparePartManager = () => {
    const navigate = useNavigate();
    const [spareParts, setSpareParts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dbStatus, setDbStatus] = useState('Unknown');

    // Add baseUrl constant for API calls
    const baseUrl = import.meta.env?.VITE_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

    // Fetch all spare parts
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // Check health first
                const healthResponse = await fetch(`${baseUrl}/health`);
                if (healthResponse.ok) {
                    const healthData = await healthResponse.json();
                    setDbStatus(healthData.database);
                }

                const response = await fetch(`${baseUrl}/spare-parts`);
                if (response.ok) {
                    const data = await response.json();
                    setSpareParts(data);
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    setError(errorData.message || 'Failed to fetch spare parts');
                }
            } catch (err) {
                console.error('Error fetching spare parts:', err);
                setError('Failed to load spare parts. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl]);

    const handleEditSparePart = (id) => {
        navigate(`/admin/products/spare-parts/edit/${id}`);
    };

    const handleAddSparePart = () => {
        navigate('/admin/products/spare-parts/create');
    };

    const handleDeleteSparePart = async (id) => {
        if (window.confirm('Are you sure you want to delete this spare part? This action cannot be undone.')) {
            try {
                const response = await fetch(`${baseUrl}/spare-parts/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove from state
                    setSpareParts(spareParts.filter(part => part._id !== id));
                    alert('Spare part deleted successfully');
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    alert(errorData.message || 'Failed to delete spare part');
                }
            } catch (err) {
                console.error('Error deleting spare part:', err);
                alert('Failed to delete spare part: ' + err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="product-manager">
                <div className="container">
                    <div className="loading">Loading spare parts...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-manager">
            <div className="container">
                <AdminNavigation />
                <div className="dashboard-header">
                    <div>
                        <h1>Spare Part Management</h1>
                        <p className="dashboard-subtitle">Manage your spare parts inventory</p>
                    </div>
                    <div className="dashboard-actions">
                        <div className="db-status">
                            Database: <span className={dbStatus === 'Connected' ? 'status-connected' : 'status-disconnected'}>{dbStatus}</span>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddSparePart}>
                            Add New Spare Part
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="content-summary">
                    <p>Showing {spareParts.length} spare parts</p>
                </div>

                <div className="content-list">
                    {spareParts.length === 0 ? (
                        <div className="empty-state">
                            <p>No spare parts found. <button className="btn btn-link" onClick={handleAddSparePart}>Add your first spare part</button></p>
                        </div>
                    ) : (
                        <div className="content-grid">
                            {spareParts.map((part) => (
                                <div key={part._id} className="content-card glass-panel">
                                    <div className="content-header">
                                        <h3>{part.name}</h3>
                                        <div className="content-meta">
                                            <span className="content-tag page-tag">{part.partNumber}</span>
                                            <span className="content-tag section-tag">{part.category}</span>
                                        </div>
                                    </div>
                                    <div className="content-body">
                                        {part.description && (
                                            <p>{part.description.substring(0, 100)}{part.description.length > 100 ? '...' : ''}</p>
                                        )}
                                        {part.images && part.images.length > 0 && (
                                            <div className="content-image">
                                                <img src={part.images[0]} alt={part.name} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="content-footer">
                                        <div className="content-info">
                                            <span className="price">${part.price?.toLocaleString()}</span>
                                            <span className={`status-badge ${part.inStock ? 'active' : 'inactive'}`}>
                                                {part.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                        <div className="content-actions">
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => handleEditSparePart(part._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteSparePart(part._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SparePartManager;