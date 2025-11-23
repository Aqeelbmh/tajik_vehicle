import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import './Products.css';

const SparePartForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = !!id;

    const [formData, setFormData] = useState({
        name: '',
        partNumber: '',
        category: '',
        compatibleModels: [''],
        price: '',
        description: '',
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

    // Fetch spare part data if editing
    useEffect(() => {
        if (isEditing) {
            const fetchSparePart = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${baseUrl}/spare-parts/${id}`);
                    if (response.ok) {
                        const part = await response.json();
                        // Format data for form
                        setFormData({
                            ...part,
                            price: part.price?.toString() || '',
                            compatibleModels: part.compatibleModels && part.compatibleModels.length > 0 ? part.compatibleModels : [''],
                            images: part.images && part.images.length > 0 ? part.images : ['']
                        });
                    } else {
                        const errorData = await response.json().catch(() => ({}));
                        setError(errorData.message || 'Failed to fetch spare part');
                    }
                } catch (err) {
                    console.error('Error fetching spare part:', err);
                    setError('Failed to load spare part data');
                } finally {
                    setLoading(false);
                }
            };

            fetchSparePart();
        }
    }, [id, isEditing, baseUrl]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleCompatibleModelChange = (index, value) => {
        const newModels = [...formData.compatibleModels];
        newModels[index] = value;
        setFormData(prev => ({ ...prev, compatibleModels: newModels }));
    };

    const addCompatibleModelField = () => {
        setFormData(prev => ({ ...prev, compatibleModels: [...prev.compatibleModels, ''] }));
    };

    const removeCompatibleModelField = (index) => {
        if (formData.compatibleModels.length > 1) {
            const newModels = formData.compatibleModels.filter((_, i) => i !== index);
            setFormData(prev => ({ ...prev, compatibleModels: newModels }));
        }
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
                price: parseFloat(formData.price) || 0
            };

            // Remove empty compatible model fields
            submitData.compatibleModels = formData.compatibleModels.filter(model => model.trim() !== '');

            // Remove empty image fields
            submitData.images = formData.images.filter(img => img.trim() !== '');

            const url = isEditing ? `${baseUrl}/spare-parts/${id}` : `${baseUrl}/spare-parts`;
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
                    navigate('/admin/products/spare-parts');
                }, 1500);
            } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || `Failed to ${isEditing ? 'update' : 'create'} spare part`);
            }
        } catch (err) {
            console.error('Error saving spare part:', err);
            setError('Failed to save spare part: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditing) {
        return (
            <div className="product-form">
                <div className="container">
                    <div className="loading">Loading spare part data...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="product-form">
            <div className="container">
                <AdminNavigation />
                <div className="form-header">
                    <h1>{isEditing ? 'Edit Spare Part' : 'Add New Spare Part'}</h1>
                    <button className="btn btn-secondary" onClick={() => navigate('/admin/products/spare-parts')}>
                        ← Back to Spare Parts
                    </button>
                </div>

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        Spare part {isEditing ? 'updated' : 'created'} successfully!
                    </div>
                )}

                <form onSubmit={handleSubmit} className="glass-panel">
                    <div className="form-grid">
                        <div className="form-group">
                            <label htmlFor="name">Part Name *</label>
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
                            <label htmlFor="partNumber">Part Number *</label>
                            <input
                                type="text"
                                id="partNumber"
                                name="partNumber"
                                value={formData.partNumber}
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
                            <label>Compatible Models</label>
                            {formData.compatibleModels.map((model, index) => (
                                <div key={index} className="compatible-model-input-group">
                                    <input
                                        type="text"
                                        value={model}
                                        onChange={(e) => handleCompatibleModelChange(index, e.target.value)}
                                        placeholder="Model name"
                                    />
                                    {formData.compatibleModels.length > 1 && (
                                        <button
                                            type="button"
                                            className="btn btn-danger btn-sm"
                                            onClick={() => removeCompatibleModelField(index)}
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-outline"
                                onClick={addCompatibleModelField}
                            >
                                Add Model
                            </button>
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
                            onClick={() => navigate('/admin/products/spare-parts')}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditing ? 'Update Spare Part' : 'Create Spare Part')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SparePartForm;