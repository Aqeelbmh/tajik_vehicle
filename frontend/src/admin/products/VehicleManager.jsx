import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import './Products.css';

const VehicleManager = () => {
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dbStatus, setDbStatus] = useState('Unknown');

    // Add baseUrl constant for API calls
    const baseUrl = import.meta.env?.VITE_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

    // Fetch all vehicles
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

                const response = await fetch(`${baseUrl}/vehicles`);
                if (response.ok) {
                    const data = await response.json();
                    setVehicles(data);
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    setError(errorData.message || 'Failed to fetch vehicles');
                }
            } catch (err) {
                console.error('Error fetching vehicles:', err);
                setError('Failed to load vehicles. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl]);

    const handleEditVehicle = (id) => {
        navigate(`/admin/products/vehicles/edit/${id}`);
    };

    const handleAddVehicle = () => {
        navigate('/admin/products/vehicles/create');
    };

    const handleDeleteVehicle = async (id) => {
        if (window.confirm('Are you sure you want to delete this vehicle? This action cannot be undone.')) {
            try {
                const response = await fetch(`${baseUrl}/vehicles/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove from state
                    setVehicles(vehicles.filter(vehicle => vehicle._id !== id));
                    alert('Vehicle deleted successfully');
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    alert(errorData.message || 'Failed to delete vehicle');
                }
            } catch (err) {
                console.error('Error deleting vehicle:', err);
                alert('Failed to delete vehicle: ' + err.message);
            }
        }
    };

    if (loading) {
        return (
            <div className="product-manager">
                <div className="container">
                    <div className="loading">Loading vehicles...</div>
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
                        <h1>Vehicle Management</h1>
                        <p className="dashboard-subtitle">Manage your vehicle inventory</p>
                    </div>
                    <div className="dashboard-actions">
                        <div className="db-status">
                            Database: <span className={dbStatus === 'Connected' ? 'status-connected' : 'status-disconnected'}>{dbStatus}</span>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddVehicle}>
                            Add New Vehicle
                        </button>
                    </div>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                <div className="content-summary">
                    <p>Showing {vehicles.length} vehicles</p>
                </div>

                <div className="content-list">
                    {vehicles.length === 0 ? (
                        <div className="empty-state">
                            <p>No vehicles found. <button className="btn btn-link" onClick={handleAddVehicle}>Add your first vehicle</button></p>
                        </div>
                    ) : (
                        <div className="content-grid">
                            {vehicles.map((vehicle) => (
                                <div key={vehicle._id} className="content-card glass-panel">
                                    <div className="content-header">
                                        <h3>{vehicle.name}</h3>
                                        <div className="content-meta">
                                            <span className="content-tag page-tag">{vehicle.brand}</span>
                                            <span className="content-tag section-tag">{vehicle.model}</span>
                                        </div>
                                    </div>
                                    <div className="content-body">
                                        {vehicle.description && (
                                            <p>{vehicle.description.substring(0, 100)}{vehicle.description.length > 100 ? '...' : ''}</p>
                                        )}
                                        {vehicle.images && vehicle.images.length > 0 && (
                                            <div className="content-image">
                                                <img src={vehicle.images[0]} alt={vehicle.name} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="content-footer">
                                        <div className="content-info">
                                            <span className="price">${vehicle.price?.toLocaleString()}</span>
                                            <span className={`status-badge ${vehicle.inStock ? 'active' : 'inactive'}`}>
                                                {vehicle.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </div>
                                        <div className="content-actions">
                                            <button
                                                className="btn btn-outline btn-sm"
                                                onClick={() => handleEditVehicle(vehicle._id)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteVehicle(vehicle._id)}
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

export default VehicleManager;