import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import './Products.css';

const VehicleForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        model: '',
        brand: '',
        category: '',
        price: '',
        description: '',
        specifications: '',
        images: [''],
        inStock: true,
        featured: false
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    // Add baseUrl constant for API calls
    const baseUrl = import.meta.env?.VITE_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

    // Fetch vehicle data if editing
    useEffect(() => {
        if (isEditing) {
            const fetchVehicle = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${baseUrl}/vehicles/${id}`);
                    if (response.ok) {
                        const vehicle = await response.json();
                        // Format data for form
                        setFormData({
                            ...vehicle,
                            price: vehicle.price?.toString() || '',
                            specifications: JSON.stringify(vehicle.specifications || {}, null, 2),
                            images: vehicle.images && vehicle.images.length > 0 ? vehicle.images : ['']
                        });
                    } else {
                        const errorData = await response.json().catch(() => ({}));
                        setError(errorData.message || 'Failed to fetch vehicle');
                    }
                } catch (err) {
                    console.error('Error fetching vehicle:', err);
                    setError('Failed to load vehicle data');
                } finally {
                    setLoading(false);
                }
            };

            fetchVehicle();
        }
    }, [id, isEditing, baseUrl]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (index, value) => {
        const newImages = [...formData.images];
        newImages[index] = value;
        setFormData(prev => ({ ...prev, images: newImages }));
    };

    const addImageField = () => {
        setFormData(prev => ({ ...prev, images: [...prev.images, ''] }));
    };

    const removeImageField = (index) => {
        if (formData.images.length > 1) {
            const newImages = formData.images.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, images: newImages }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            // Prepare data for submission
            const submitData = {
                ...formData,
                price: parseFloat(formData.price) || 0,
                specifications: formData.specifications ? JSON.parse(formData.specifications) : {}
            };

            // Remove empty image fields
            submitData.images = formData.images.filter(img => img.trim() !== '');

            const url = isEditing ? `${baseUrl}/vehicles/${id}` : `${baseUrl}/vehicles`;
            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData)
            });

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin/products/vehicles');
                }, 1500);
            } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} vehicle`);
            }
        } catch (err) {
            console.error('Error saving vehicle:', err);
            setError('Failed to save vehicle: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return (
            <div className="product-form">
                <div className="container">
                    <div className="loading">Loading vehicle data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-form">
            <div className="container">
                <AdminNavigation />
                <div className="form-header">
                    <h1>{isEditing ? 'Edit Vehicle' : 'Add New Vehicle'}</h1>
                    <button className="btn btn-secondary" onClick={() => navigate('/admin/products/vehicles')}>
                        ← Back to Vehicles
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        Vehicle {isEditing ? 'updated' : 'created'} successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="glass-panel">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Vehicle Name *</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="model">Model *</label>
                            <input
                                type="text"
                                id="model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="brand">Brand *</label>
                            <input
                                type="text"
                                id="brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="category">Category *</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="price">Price *</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    checked={formData.inStock}
                                    onChange={handleChange}
                                />
                                In Stock
                            </label>
                        </div>

                        <div className="form-group checkbox-group">
                            <label>
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                />
                                Featured
                            </label>
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="description">Description</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                rows="4"
                            />
                        </div>

                        <div className="form-group full-width">
                            <label htmlFor="specifications">Specifications (JSON format)</label>
                            <textarea
                                id="specifications"
                                name="specifications"
                                value={formData.specifications}
                                onChange={handleChange}
                                rows="6"
                                placeholder='{"engine": "V8", "horsepower": 400, "transmission": "Automatic"}'
                            />
                        </div>

                        <div className="form-group full-width">
                            <label>Images</label>
                            {formData.images.map((image, index) => (
                                <div key={index} className="image-input-group">
                                    <input
                                        type="text"
                                        value={image}
                                        onChange={(e) => handleImageChange(index, e.target.value)}
                                        placeholder="Image URL"
                                    />
                                    {formData.images.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeImageField(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={addImageField}
                            >
                                Add Image
                            </button>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => navigate('/admin/products/vehicles')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Update Vehicle' : 'Create Vehicle')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VehicleForm;