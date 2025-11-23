import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNavigation from '../AdminNavigation';
import '../products/Products.css';

const CMSDashboard = () => {
    const navigate = useNavigate();
    const [contents, setContents] = useState([]);
    const [filteredContents, setFilteredContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [dbStatus, setDbStatus] = useState('Unknown');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPage, setFilterPage] = useState('all');
    const [sortBy, setSortBy] = useState('createdAt');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'overview'

    // Add baseUrl constant for API calls
    const baseUrl = import.meta.env?.VITE_API_URL ||
        (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

    console.log('CMS Dashboard loaded');

    // Fetch all content items
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

                const response = await fetch(`${baseUrl}/content`);
                if (response.ok) {
                    const data = await response.json();
                    setContents(data);
                    setFilteredContents(data);
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    setError(errorData.message || 'Failed to fetch content');
                }
            } catch (err) {
                console.error('Error fetching CMS data:', err);
                setError('Failed to load CMS data. Please check if the backend server is running.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [baseUrl]);

    // Filter and sort contents
    useEffect(() => {
        let result = [...contents];

        // Apply search filter
        if (searchTerm) {
            result = result.filter(content =>
                content.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                content.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                content.page?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                content.section?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply page filter
        if (filterPage !== 'all') {
            result = result.filter(content => content.page === filterPage);
        }

        // Apply sorting
        result.sort((a, b) => {
            if (sortBy === 'title') {
                return (a.title || '').localeCompare(b.title || '');
            } else if (sortBy === 'page') {
                return (a.page || '').localeCompare(b.page || '');
            } else if (sortBy === 'section') {
                return (a.section || '').localeCompare(b.section || '');
            } else {
                // Default sort by createdAt (newest first)
                return new Date(b.createdAt) - new Date(a.createdAt);
            }
        });

        setFilteredContents(result);
    }, [contents, searchTerm, filterPage, sortBy]);

    const handleEditContent = (id) => {
        navigate(`/admin/cms/edit/${id}`);
    };

    const handleAddContent = () => {
        navigate('/admin/cms/create');
    };

    const handleDeleteContent = async (id) => {
        if (window.confirm('Are you sure you want to delete this content? This action cannot be undone.')) {
            try {
                const response = await fetch(`${baseUrl}/content/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove from state
                    setContents(contents.filter(content => content._id !== id));
                    alert('Content deleted successfully');
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    alert(errorData.message || 'Failed to delete content');
                }
            } catch (err) {
                console.error('Error deleting content:', err);
                alert('Failed to delete content: ' + err.message);
            }
        }
    };

    // Get unique pages for filter dropdown
    const getUniquePages = () => {
        const pages = [...new Set(contents.map(content => content.page))];
        return pages.sort();
    };

    // Get page and section overview data
    const getPageSectionOverview = () => {
        const overview = {};

        contents.forEach(content => {
            const page = content.page || 'Unknown';
            const section = content.section || 'Unknown';

            if (!overview[page]) {
                overview[page] = {
                    sections: {},
                    totalContent: 0
                };
            }

            if (!overview[page].sections[section]) {
                overview[page].sections[section] = {
                    count: 0,
                    active: 0,
                    inactive: 0,
                    contents: []
                };
            }

            overview[page].sections[section].count++;
            overview[page].sections[section].contents.push(content);
            if (content.isActive) {
                overview[page].sections[section].active++;
            } else {
                overview[page].sections[section].inactive++;
            }

            overview[page].totalContent++;
        });

        return overview;
    };

    if (loading) {
        return (
            <div className="cms-dashboard">
                <div className="container">
                    <div className="loading">Loading CMS data...</div>
                </div>
            </div>
        );
    }

    const pageSectionOverview = getPageSectionOverview();

    return (
        <div className="cms-dashboard">
            <div className="container">
                <AdminNavigation />
                <div className="dashboard-header">
                    <div>
                        <h1>CMS Dashboard</h1>
                        <p className="dashboard-subtitle">Manage your website content</p>
                    </div>
                    <div className="dashboard-actions">
                        <div className="db-status">
                            Database: <span className={dbStatus === 'Connected' ? 'status-connected' : 'status-disconnected'}>{dbStatus}</span>
                        </div>
                        <button className="btn btn-primary" onClick={handleAddContent}>
                            Add New Content
                        </button>
                    </div>
                </div>

                {/* View Mode Toggle */}
                <div className="view-mode-toggle">
                    <button
                        className={`btn btn-outline ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        List View
                    </button>
                    <button
                        className={`btn btn-outline ${viewMode === 'overview' ? 'active' : ''}`}
                        onClick={() => setViewMode('overview')}
                    >
                        Section Overview
                    </button>
                </div>

                {viewMode === 'list' ? (
                    <>
                        {/* Filters and Search */}
                        <div className="cms-filters">
                            <div className="filter-group">
                                <label htmlFor="search">Search:</label>
                                <input
                                    type="text"
                                    id="search"
                                    placeholder="Search content..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="filter-group">
                                <label htmlFor="page-filter">Page:</label>
                                <select
                                    id="page-filter"
                                    value={filterPage}
                                    onChange={(e) => setFilterPage(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="all">All Pages</option>
                                    {getUniquePages().map(page => (
                                        <option key={page} value={page}>{page}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="sort-by">Sort by:</label>
                                <select
                                    id="sort-by"
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="form-control"
                                >
                                    <option value="createdAt">Date Created</option>
                                    <option value="title">Title</option>
                                    <option value="page">Page</option>
                                    <option value="section">Section</option>
                                </select>
                            </div>
                        </div>

                        {error && (
                            <div className="error-message">
                                {error}
                            </div>
                        )}

                        {/* Content count */}
                        <div className="content-summary">
                            <p>Showing {filteredContents.length} of {contents.length} content items</p>
                        </div>

                        <div className="content-list">
                            {filteredContents.length === 0 ? (
                                <div className="empty-state">
                                    <p>No content found. <button className="btn btn-link" onClick={handleAddContent}>Create your first content</button></p>
                                </div>
                            ) : (
                                <div className="content-grid">
                                    {filteredContents.map((content) => (
                                        <div key={content._id} className="content-card glass-panel">
                                            <div className="content-header">
                                                <h3>{content.title || 'Untitled'}</h3>
                                                <div className="content-meta">
                                                    <span className="content-tag page-tag">{content.page}</span>
                                                    <span className="content-tag section-tag">{content.section}</span>
                                                </div>
                                            </div>
                                            <div className="content-body">
                                                {content.content && (
                                                    <p>{content.content.substring(0, 100)}{content.content.length > 100 ? '...' : ''}</p>
                                                )}
                                                {content.imageUrl && (
                                                    <div className="content-image">
                                                        <img src={content.imageUrl} alt={content.title} />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="content-footer">
                                                <div className="content-info">
                                                    <span className={`status-badge ${content.isActive ? 'active' : 'inactive'}`}>
                                                        {content.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                    <span className="content-date">
                                                        {new Date(content.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <div className="content-actions">
                                                    <button
                                                        className="btn btn-outline btn-sm"
                                                        onClick={() => handleEditContent(content._id)}
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDeleteContent(content._id)}
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
                    </>
                ) : (
                    // Section Overview View
                    <div className="section-overview">
                        <div className="content-summary">
                            <p>Total Pages: {Object.keys(pageSectionOverview).length} | Total Content Items: {contents.length}</p>
                        </div>

                        {Object.keys(pageSectionOverview).length === 0 ? (
                            <div className="empty-state">
                                <p>No content found. <button className="btn btn-link" onClick={handleAddContent}>Create your first content</button></p>
                            </div>
                        ) : (
                            <div className="overview-grid">
                                {Object.entries(pageSectionOverview).map(([page, pageData]) => (
                                    <div key={page} className="page-section-card glass-panel">
                                        <div className="page-header">
                                            <h3>{page}</h3>
                                            <span className="content-count">{pageData.totalContent} items</span>
                                        </div>
                                        <div className="sections-list">
                                            {Object.entries(pageData.sections).map(([section, sectionData]) => (
                                                <div key={section} className="section-item">
                                                    <div className="section-info">
                                                        <h4>{section}</h4>
                                                        <div className="section-stats">
                                                            <span className="stat active">{sectionData.active} active</span>
                                                            <span className="stat inactive">{sectionData.inactive} inactive</span>
                                                            <span className="stat total">{sectionData.count} total</span>
                                                        </div>
                                                    </div>
                                                    <div className="section-actions">
                                                        <button
                                                            className="btn btn-outline btn-sm"
                                                            onClick={() => {
                                                                setFilterPage(page);
                                                                setSearchTerm(section);
                                                                setViewMode('list');
                                                            }}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={() => {
                                                                // Navigate to create new content with pre-filled page and section
                                                                navigate('/admin/cms/create', {
                                                                    state: {
                                                                        page: page,
                                                                        section: section
                                                                    }
                                                                });
                                                            }}
                                                        >
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CMSDashboard;