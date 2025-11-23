import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const ContentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const isEditing = !!id;

    // Add baseUrl constant for API calls
    const baseUrl = import.meta.env?.VITE_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

    const [formData, setFormData] = useState({
        page: '',
        section: '',
        title: '',
        content: '',
        imageUrl: '',
        order: 0,
        isActive: true
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch content data if editing
    useEffect(() => {
        if (isEditing) {
            const fetchContent = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${baseUrl}/content/${id}`);
                    if (response.ok) {
                        const data = await response.json();
                        setFormData({
                            page: data.page || '',
                            section: data.section || '',
                            title: data.title || '',
                            content: data.content || '',
                            imageUrl: data.imageUrl || '',
                            order: data.order || 0,
                            isActive: data.isActive !== undefined ? data.isActive : true
                        });
                    } else {
                        setError('Failed to fetch content');
                    }
                } catch (err) {
                    console.error('Error fetching content:', err);
                    setError('Failed to load content');
                } finally {
                    setLoading(false);
                }
            };

            fetchContent();
        } else {
            // Check if we have pre-filled data from the overview view
            if (location.state && location.state.page) {
                setFormData(prev => ({
                    ...prev,
                    page: location.state.page,
                    section: location.state.section || ''
                }));
            }
        }
    }, [id, isEditing, location.state]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.page || !formData.section) {
            setError('Page and Section are required fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const url = isEditing
                ? `${baseUrl}/content/${id}`
                : `${baseUrl}/content`;

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert(`Content ${isEditing ? 'updated' : 'created'} successfully!`);
                navigate('/admin/cms');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to save content');
            }
        } catch (err) {
            console.error('Error saving content:', err);
            setError('Failed to save content. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? Any unsaved changes will be lost.')) {
            navigate('/admin/cms');
        }
    };

    // Page options with descriptions
    const pageOptions = [
        { value: 'home', label: 'Home', description: 'Main landing page' },
        { value: 'vehicles', label: 'Vehicles', description: 'Vehicle catalog and listings' },
        { value: 'parts', label: 'Parts', description: 'Spare parts catalog' },
        { value: 'services', label: 'Services', description: 'Service offerings' },
        { value: 'about', label: 'About', description: 'Company information' },
        { value: 'partners', label: 'Partners', description: 'Partner information' },
        { value: 'gallery', label: 'Gallery', description: 'Image gallery' },
        { value: 'contact', label: 'Contact', description: 'Contact information' }
    ];

    // Common section names for autocomplete
    const commonSections = [
        'hero', 'features', 'testimonials', 'cta', 'about', 'services',
        'team', 'mission', 'vision', 'contact', 'faq', 'pricing'
    ];

    if (loading && isEditing) {
        return (
            <div className="content-form-page">
                <div className="container">
                    <div className="loading">Loading content...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="content-form-page">
            <div className="container">
                <div className="content-form glass-panel">
                    <div className="form-header">
                        <h1>{isEditing ? 'Edit Content' : 'Add New Content'}</h1>
                        <p>{isEditing ? 'Edit existing content' : 'Create new content for your website'}</p>
                        {!isEditing && location.state && location.state.page && (
                            <p className="form-subtitle">
                                Creating content for page: <strong>{location.state.page}</strong>
                                {location.state.section && ` / section: <strong>${location.state.section}</strong>`}
                            </p>
                        )}
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="page">Page *</label>
                                <select
                                    id="page"
                                    name="page"
                                    value={formData.page}
                                    onChange={handleInputChange}
                                    required
                                    className="form-control"
                                    disabled={isEditing || (location.state && location.state.page)}
                                >
                                    <option value="">Select a page</option>
                                    {pageOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {!formData.page && <span className="field-error">Page is required</span>}
                                {formData.page && (
                                    <div className="field-description">
                                        {pageOptions.find(opt => opt.value === formData.page)?.description}
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="section">Section *</label>
                                <input
                                    type="text"
                                    id="section"
                                    name="section"
                                    value={formData.section}
                                    onChange={handleInputChange}
                                    placeholder="e.g., hero, features, testimonials"
                                    required
                                    className="form-control"
                                    list="common-sections"
                                    disabled={isEditing}
                                />
                                <datalist id="common-sections">
                                    {commonSections.map(section => (
                                        <option key={section} value={section} />
                                    ))}
                                </datalist>
                                {!formData.section && <span className="field-error">Section is required</span>}
                                <div className="field-description">
                                    Enter the section name where this content will appear
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleInputChange}
                                placeholder="Content title"
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="content">Content</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleInputChange}
                                rows="8"
                                placeholder="Enter your content here..."
                                className="form-control"
                            ></textarea>
                            <div className="field-description">
                                You can use plain text. For rich formatting, consider using HTML.
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="imageUrl">Image URL</label>
                            <input
                                type="text"
                                id="imageUrl"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleInputChange}
                                placeholder="https://example.com/image.jpg"
                                className="form-control"
                            />
                            <div className="field-description">
                                Enter the full URL to an image (optional)
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="order">Order</label>
                                <input
                                    type="number"
                                    id="order"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    min="0"
                                    className="form-control"
                                />
                                <div className="field-description">
                                    Lower numbers appear first
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleInputChange}
                                    />
                                    Active
                                </label>
                                <div className="field-description">
                                    Inactive content will not be displayed
                                </div>
                            </div>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handleCancel}
                                disabled={loading}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                            >
                                {loading ? 'Saving...' : (isEditing ? 'Update Content' : 'Create Content')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContentForm;