import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import vehicles from '../data/vehicles';
import { vehicleService } from '../services/api';
import useScrollReveal from '../hooks/useScrollReveal';
import '../components/ProductCard.css'; // Import the ProductCard styles for placeholder images

const VehicleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useScrollReveal();

  const vehicle = vehicles.find((item) => item.id === Number(id));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleQuoteRequest = async () => {
    if (!vehicle) return;
    try {
      setIsSubmitting(true);
      setSubmitError('');

      // Use the vehicle service to request a quote
      const response = await vehicleService.requestQuote({
        name: 'Vehicle Detail Visitor',
        vehicleId: vehicle.id,
        vehicleName: vehicle.name,
        message: `Requesting quote for ${vehicle.name}`,
      });

      if (response && !response.fallback) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        // If we get a fallback response, navigate to the contact page
        window.location.href = `/contact?vehicle=${encodeURIComponent(vehicle.name)}&vehicleId=${vehicle.id}&subject=Quote%20request%20for%20${encodeURIComponent(vehicle.name)}`;
      }
    } catch (error) {
      // On error, also navigate to the contact page as fallback
      window.location.href = `/contact?vehicle=${encodeURIComponent(vehicle.name)}&vehicleId=${vehicle.id}&subject=Quote%20request%20for%20${encodeURIComponent(vehicle.name)}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!vehicle) {
    return (
      <div className="page-shell">
        <div className="container">
          <section className="section-block" data-reveal>
            <div className="glass-panel">
              <p className="section-eyebrow">Vehicle catalog</p>
              <h1>Vehicle not found</h1>
              <p className="section-description">
                The record you are looking for is no longer available. Explore the full catalog to find a similar unit.
              </p>
              <div className="cta-panel">
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/vehicles')}>
                  Back to catalog
                </button>
                <Link to="/contact" className="btn btn-primary">
                  Contact team
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell vehicle-details-page">
      <div className="container">
        <section className="page-hero hero-compact" data-reveal>
          <div>
            <p className="section-eyebrow">Vehicle profile</p>
            <h1>{vehicle.name}</h1>
            <p className="page-subtitle">{vehicle.description}</p>
          </div>
          <div className="chip-list">
            <span className="chip">{vehicle.brand}</span>
            <span className="chip">{vehicle.type}</span>
            <span className="chip">Model year {vehicle.year}</span>
          </div>
        </section>

        {submitSuccess && (
          <div className="success-message" data-reveal>
            {t('common.success')} Your quote request was captured.
          </div>
        )}

        {submitError && (
          <div className="error-message" data-reveal>
            {submitError}
          </div>
        )}

        <section className="section-block" data-reveal>
          <div className="glass-panel">
            {/* Vehicle Image */}
            <div className="vehicle-image-container">
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
            </div>

            <div className="vehicle-specs">
              <p><strong>Type:</strong> {vehicle.type}</p>
              <p><strong>Brand:</strong> {vehicle.brand}</p>
              <p><strong>Year:</strong> {vehicle.year}</p>
              <p><strong>Price:</strong> {vehicle.price}</p>
            </div>

            <div className="vehicle-description">
              <h3>Description</h3>
              <p>{vehicle.description}</p>
            </div>

            <div className="chip-list" style={{ marginTop: 'var(--spacing-lg)' }}>
              <span className="chip">Service plan included</span>
              <span className="chip">Telemetry ready</span>
              <span className="chip">Flexible financing</span>
            </div>

            <div className="cta-panel" style={{ marginTop: 'var(--spacing-xl)' }}>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/vehicles')}>
                Back to vehicles
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleQuoteRequest}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('common.submitting') : t('vehicles.request_quote')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VehicleDetails;