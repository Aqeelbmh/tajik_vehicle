import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import useScrollReveal from '../hooks/useScrollReveal';
import vehicles from '../data/vehicles';

const Vehicles = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    useScrollReveal();

    const [filter, setFilter] = useState({
        type: '',
        brand: ''
    });
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const vehicleTypes = [
        { value: '', label: 'All Types' },
        { value: 'tractor', label: t('vehicles.tractor') },
        { value: 'lorry', label: t('vehicles.lorry') },
        { value: 'bulldozer', label: t('vehicles.bulldozer') }
    ];

    const brands = [
        { value: '', label: 'All Brands' },
        { value: 'John Deere', label: 'John Deere' },
        { value: 'Volvo', label: 'Volvo' },
        { value: 'Caterpillar', label: 'Caterpillar' },
        { value: 'New Holland', label: 'New Holland' },
        { value: 'Scania', label: 'Scania' },
        { value: 'Komatsu', label: 'Komatsu' }
    ];

    const filteredVehicles = vehicles.filter(vehicle => {
        return (
            (filter.type === '' || vehicle.type === filter.type) &&
            (filter.brand === '' || vehicle.brand === filter.brand)
        );
    });

    const vehicleInsights = [
        { id: 1, label: 'Average delivery', value: '30 days', detail: 'Door-to-site handover with onboarding' },
        { id: 2, label: 'Warranty coverage', value: '36 mo', detail: 'Factory backed with onsite diagnostics' },
        { id: 3, label: 'Utilisation uplift', value: '+18%', detail: 'Measured vs. legacy fleets after retrofit' },
    ];

    return (
        <div className="page-shell vehicles-page">
            <div className="container">
                <section className="page-hero hero-compact" data-reveal>
                    <div>
                        <p className="section-eyebrow">{t('nav.vehicles')}</p>
                        <h1>{t('vehicles.title')}</h1>
                        <p className="page-subtitle">{t('vehicles.subtitle')}</p>
                    </div>
                    <div className="chip-list">
                        <span className="chip">Agriculture</span>
                        <span className="chip">Construction</span>
                        <span className="chip">Logistics</span>
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="filter-header">
                        <h2 className="filter-title">{t('vehicles.title')}</h2>
                        <p className="filter-description">Refine your search with our smart filtering options</p>
                    </div>
                    <div className="glass-panel filter-container">
                        <div className="filter-controls">
                            <div className="filter-group">
                                <label htmlFor="type-filter" className="filter-label">{t('vehicles.filter_by_type')}</label>
                                <select
                                    id="type-filter"
                                    value={filter.type}
                                    onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                                    className="filter-select"
                                >
                                    {vehicleTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-group">
                                <label htmlFor="brand-filter" className="filter-label">{t('vehicles.filter_by_brand')}</label>
                                <select
                                    id="brand-filter"
                                    value={filter.brand}
                                    onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
                                    className="filter-select"
                                >
                                    {brands.map(brand => (
                                        <option key={brand.value} value={brand.value}>{brand.label}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="filter-actions">
                                <button
                                    className="btn btn-outline filter-clear"
                                    onClick={() => setFilter({ type: '', brand: '' })}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                        <div className="filter-info">
                            <div className="filter-badge">
                                <span className="section-eyebrow">Smart filtering</span>
                            </div>
                            <p className="filter-info-text">Choose body type and OEM brand to surface curated units with matching service history.</p>
                        </div>
                    </div>
                </section>

                {submitSuccess && (
                    <div className="success-message" data-reveal>
                        {t('common.success')} Your quote request has been submitted successfully.
                    </div>
                )}

                {submitError && (
                    <div className="error-message" data-reveal>
                        {submitError}
                    </div>
                )}

                <section className="section-block" data-reveal>
                    <div className="section-head">
                        <h2>Modular fleet roster</h2>
                        <p className="section-description">
                            Vehicles are delivered turnkey with commissioning, telemetry enablement, and operator training per site.
                        </p>
                    </div>

                    <div className="product-grid">
                        {filteredVehicles.length > 0 ? (
                            filteredVehicles.map((vehicle, index) => (
                                <div
                                    key={vehicle.id}
                                    className="product-card card-spotlight"
                                    data-reveal
                                    style={{ '--reveal-delay': `${index * 0.08}s` }}
                                >
                                    <div className="product-image placeholder-image">
                                        <div className="placeholder-content">
                                            <span className="placeholder-icon">
                                                {vehicle.type === 'tractor' && '🚜'}
                                                {vehicle.type === 'lorry' && '🚚'}
                                                {vehicle.type === 'bulldozer' && '🏗️'}
                                            </span>
                                            <span className="placeholder-text">{vehicle.name}</span>
                                        </div>
                                    </div>
                                    <div className="product-info">
                                        <div className="card-badges">
                                            <span className="badge-neutral">{vehicle.brand}</span>
                                            <span className="badge-neutral">{vehicle.year}</span>
                                        </div>
                                        <h3>{vehicle.name}</h3>
                                        <p className="vehicle-description">{vehicle.description}</p>
                                        <div className="vehicle-specs">
                                            <p><strong>Type:</strong> {vehicle.type}</p>
                                            <p><strong>Brand:</strong> {vehicle.brand}</p>
                                            <p><strong>Year:</strong> {vehicle.year}</p>
                                            <p><strong>Price:</strong> {vehicle.price}</p>
                                        </div>
                                        <div className="chip-list">
                                            <span className="chip">Service plan included</span>
                                            <span className="chip">Telemetry ready</span>
                                            <span className="chip">Flexible financing</span>
                                        </div>
                                        <div className="card-actions">
                                            <button
                                                className="btn btn-secondary"
                                                onClick={(e) => {
                                                    console.log('View Details clicked for vehicle:', vehicle.id);
                                                    navigate(`/vehicles/${vehicle.id}`);
                                                }}
                                            >
                                                {t('vehicles.view_details')}
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e) => {
                                                    console.log('Request Quote clicked for vehicle:', vehicle.name);
                                                    navigate(`/contact?vehicle=${encodeURIComponent(vehicle.name)}&vehicleId=${vehicle.id}`);
                                                }}
                                            >
                                                {t('vehicles.request_quote')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="no-results glass-panel">
                                <p>No vehicles match your filters.</p>
                                <button
                                    className="btn btn-outline"
                                    onClick={() => setFilter({ type: '', brand: '' })}
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </section>

                <section className="section-block alt" data-reveal>
                    <div className="insight-grid">
                        {vehicleInsights.map((insight, index) => (
                            <article
                                key={insight.id}
                                className="glass-panel insight-card"
                                data-reveal
                                style={{ '--reveal-delay': `${index * 0.1}s` }}
                            >
                                <p className="stat-value">{insight.value}</p>
                                <p className="stat-label">{insight.label}</p>
                                <p className="stat-detail">{insight.detail}</p>
                            </article>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Vehicles;