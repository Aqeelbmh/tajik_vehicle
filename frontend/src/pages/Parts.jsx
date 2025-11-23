import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { partsService } from '../services/api';
import useScrollReveal from '../hooks/useScrollReveal';

const Parts = () => {
    const { t } = useTranslation();
    useScrollReveal();

    const [searchTerm, setSearchTerm] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [parts, setParts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch spare parts from database
    React.useEffect(() => {
        const fetchParts = async () => {
            try {
                setLoading(true);
                const baseUrl = import.meta.env?.VITE_API_URL ||
                    (window.location.hostname === 'localhost' ? 'http://localhost:8081/api' : '/api');

                const response = await fetch(`${baseUrl}/spare-parts`);
                if (response.ok) {
                    const data = await response.json();
                    setParts(data);
                } else {
                    console.error('Failed to fetch spare parts');
                }
            } catch (error) {
                console.error('Error fetching spare parts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchParts();
    }, []);

    const filteredParts = parts.filter(part =>
        part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (part.compatibleModels && part.compatibleModels.some(model => model.toLowerCase().includes(searchTerm.toLowerCase())))
    );

    const handleInquirySubmit = async (partId) => {
        try {
            setIsSubmitting(true);
            setSubmitError('');

            const part = parts.find(p => p.id === partId);
            if (!part) {
                throw new Error('Part not found');
            }

            const inquiryData = {
                name: 'Anonymous User',
                company: '',
                email: '',
                phone: '',
                partNumber: part.partNumber || '',
                message: `Request for availability of part: ${part.name} (ID: ${partId})`
            };

            const response = await partsService.submitInquiry(inquiryData);

            if (response) {
                setSubmitSuccess(true);
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                throw new Error('Failed to submit inquiry');
            }
        } catch (err) {
            console.error('Error submitting parts inquiry:', err);
            setSubmitError(t('common.error') + ': ' + (err.message || 'Unknown error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-shell parts-page">
            <div className="container">
                <section className="page-hero hero-compact" data-reveal>
                    <div>
                        <p className="section-eyebrow">{t('nav.parts')}</p>
                        <h1>{t('parts.title')}</h1>
                        <p className="page-subtitle">{t('parts.subtitle')}</p>
                    </div>
                    <div className="chip-list">
                        <span className="chip">OEM Certified</span>
                        <span className="chip">Express Import</span>
                        <span className="chip">VIN Matched</span>
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="glass-panel parts-search-panel">
                        <div className="search-group">
                            <label htmlFor="parts-search">{t('parts.search_placeholder')}</label>
                            <input
                                id="parts-search"
                                type="text"
                                placeholder="e.g. EB-2023-X1 or Tractor X1"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>
                        <div className="pill-cloud">
                            {['engine', 'hydraulics', 'drivetrain', 'electronics'].map((pill) => (
                                <button
                                    key={pill}
                                    type="button"
                                    className="pill-btn"
                                    onClick={() => setSearchTerm(pill)}
                                >
                                    {pill}
                                </button>
                            ))}
                        </div>
                        <p className="helper-text">Search by SKU, VIN, or compatibility to surface curated inventory.</p>
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="section-head text-center">
                        <p className="section-eyebrow">{t('parts.categories')}</p>
                        <h2>{t('parts.categories_subtitle')}</h2>
                    </div>
                    <div className="category-grid">
                        {categories.map((category, index) => (
                            <div
                                key={category.id}
                                className="category-card glass-panel"
                                data-reveal
                                style={{ '--reveal-delay': `${index * 0.08}s` }}
                            >
                                <div className="placeholder-icon">
                                    {category.label.charAt(0)}
                                </div>
                                <h3>{category.label}</h3>
                                <p>Browse all {category.label.toLowerCase()}</p>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => {
                                        // Set the search term to this category to filter parts
                                        setSearchTerm(category.name);
                                    }}
                                >
                                    {t('parts.request_availability')}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {submitSuccess && (
                    <div className="success-message" data-reveal>
                        {t('common.success')} Your inquiry has been submitted successfully.
                    </div>
                )}

                {submitError && (
                    <div className="error-message" data-reveal>
                        {submitError}
                    </div>
                )}

                <section className="section-block" data-reveal>
                    <div className="section-head">
                        <h2>Search Results ({filteredParts.length})</h2>
                        <p className="section-description">
                            Each record is mapped to live inventory, warranty programs, and available upgrade kits.
                        </p>
                    </div>
                    {loading ? (
                        <div className="loading glass-panel">
                            <p>Loading spare parts...</p>
                        </div>
                    ) : filteredParts.length > 0 ? (
                        <div className="parts-list">
                            {filteredParts.map((part, index) => (
                                <div
                                    key={part.id}
                                    className="part-item glass-panel"
                                    data-reveal
                                    style={{ '--reveal-delay': `${index * 0.05}s` }}
                                >
                                    <div className="part-details">
                                        <div className="card-badges">
                                            <span className="badge-neutral">{categories.find(cat => cat.name === part.category)?.label}</span>
                                            <span className="badge-neutral">{part.partNumber}</span>
                                        </div>
                                        <h3>{part.name}</h3>
                                        <div className="part-specs">
                                            <p><strong>Part Number:</strong> {part.partNumber}</p>
                                            <p><strong>Compatibility:</strong> {part.compatibleModels ? part.compatibleModels.join(', ') : 'N/A'}</p>
                                            {part.price && <p><strong>Price:</strong> ${part.price}</p>}
                                        </div>
                                    </div>
                                    <div className="part-actions">
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleInquirySubmit(part.id)}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? t('common.submitting') : t('parts.request_availability')}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-results glass-panel">
                            <p>No parts match your search criteria.</p>
                            <button
                                className="btn btn-outline"
                                onClick={() => setSearchTerm('')}
                            >
                                Clear Search
                            </button>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default Parts;
