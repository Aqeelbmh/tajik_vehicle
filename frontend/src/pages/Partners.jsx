import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { partnerService } from '../services/api';
import useScrollReveal from '../hooks/useScrollReveal';

const Partners = () => {
  const { t } = useTranslation();
  useScrollReveal();

  const [partnerForm, setPartnerForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartnerForm({
      ...partnerForm,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitError('');

      await partnerService.createPartnerInquiry(partnerForm);

      setPartnerForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting partner form:', err);
      setSubmitError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const partners = [
    { id: 1, name: 'John Deere', description: 'Leading manufacturer of agricultural machinery' },
    { id: 2, name: 'Caterpillar', description: 'Global leader in construction and mining equipment' },
    { id: 3, name: 'Volvo', description: 'Premium trucks, buses and construction equipment' },
    { id: 4, name: 'Komatsu', description: 'Japanese multinational manufacturer of construction equipment' },
    { id: 5, name: 'Scania', description: 'Swedish manufacturer of commercial vehicles' },
    { id: 6, name: 'New Holland', description: 'Agricultural and construction equipment manufacturer' }
  ];

  const partnershipBenefits = [
    { id: 1, title: 'Unified go-to-market', detail: 'Co-branded programs with integrated enablement and reporting.' },
    { id: 2, title: 'Predictable logistics', detail: 'Shared inventory visibility and priority import lanes.' },
    { id: 3, title: 'Field intelligence', detail: 'Localised data on utilisation, retrofits, and service patterns.' },
  ];

  return (
    <div className="page-shell partners-page">
      <div className="container">
        <section className="page-hero hero-compact" data-reveal>
          <div>
            <p className="section-eyebrow">{t('partners.title')}</p>
            <h1>Build resilient distribution networks with us</h1>
            <p className="page-subtitle">OEMs, component manufacturers, and regional logistics partners plug into a single orchestration layer.</p>
          </div>
          <div className="chip-list">
            <span className="chip">OEM Programs</span>
            <span className="chip">Joint Marketing</span>
            <span className="chip">Shared Intelligence</span>
          </div>
        </section>

        <section className="section-block" data-reveal>
          <div className="section-head text-center">
            <p className="section-eyebrow">Trusted by global OEMs</p>
            <h2>Strategic alliances powering procurement</h2>
          </div>
          <div className="logo-cloud">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="logo-card glass-panel"
                data-reveal
                style={{ '--reveal-delay': `${index * 0.08}s` }}
              >
                <span>{partner.name}</span>
                <p>{partner.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-block alt" data-reveal>
          <div className="section-head">
            <p className="section-eyebrow">Partner advantages</p>
            <h2>Programs engineered for measurable outcomes</h2>
          </div>
          <div className="insight-grid">
            {partnershipBenefits.map((benefit, index) => (
              <article
                key={benefit.id}
                className="glass-panel insight-card"
                data-reveal
                style={{ '--reveal-delay': `${index * 0.1}s` }}
              >
                <span className="signal-badge">0{benefit.id}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block" data-reveal>
          <div className="section-head">
            <h2>{t('partners.become_partner')}</h2>
            <p className="section-description">Share a brief on your distribution objectives and we will orchestrate the onboarding workflow.</p>
          </div>

          {submitSuccess && (
            <div className="success-message" data-reveal>
              {t('common.success')} Thank you for your partnership inquiry. We will contact you soon.
            </div>
          )}

          {submitError && (
            <div className="error-message" data-reveal>
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="partner-form glass-panel" data-reveal>
            <div className="form-field-grid">
              <div className="form-group">
                <label htmlFor="name">{t('contact.name')}</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={partnerForm.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">{t('contact.company')}</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={partnerForm.company}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-field-grid">
              <div className="form-group">
                <label htmlFor="email">{t('contact.email')}</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={partnerForm.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">{t('contact.phone')}</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={partnerForm.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={partnerForm.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('common.submitting') : t('contact.send')}
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Partners;