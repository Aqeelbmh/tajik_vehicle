import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { leadService } from '../services/api';
import useScrollReveal from '../hooks/useScrollReveal';

const Contact = () => {
  const { t } = useTranslation();
  useScrollReveal();
  const location = useLocation();

  const [contactForm, setContactForm] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [prefillApplied, setPrefillApplied] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setSubmitError('');

      await leadService.createLead(contactForm);

      setContactForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setSubmitSuccess(true);

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setSubmitError(t('common.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const touchpoints = [
    {
      id: 1,
      title: t('contact.address'),
      value: '123 Industrial Street, Dushanbe, 734001',
      meta: 'HQ & logistics hub',
    },
    {
      id: 2,
      title: t('contact.phone'),
      value: '+992 37 222 2222',
      meta: 'Ops centre (24/7)',
    },
    {
      id: 3,
      title: t('contact.email'),
      value: 'info@hvsp.tj',
      meta: 'General inquiries',
    },
  ];

  const hours = [
    { id: 1, day: 'Monday - Friday', time: '08:00 - 18:00' },
    { id: 2, day: 'Saturday', time: '09:00 - 14:00' },
    { id: 3, day: 'Sunday', time: 'Closed' },
  ];

  useEffect(() => {
    if (prefillApplied) return;
    const params = new URLSearchParams(location.search);
    const vehicle = params.get('vehicle');
    const vehicleId = params.get('vehicleId');
    if (vehicle) {
      setContactForm((prev) => ({
        ...prev,
        subject: `Quote request for ${vehicle}`,
        message: prev.message || `Hello, I would like to request a quote for ${vehicle}${vehicleId ? ` (ID: ${vehicleId})` : ''}.`,
      }));
      setPrefillApplied(true);
    }
  }, [location.search, prefillApplied]);

  return (
    <div className="page-shell contact-page">
      <div className="container">
        <section className="page-hero hero-compact" data-reveal>
          <div>
            <p className="section-eyebrow">{t('contact.title')}</p>
            <h1>Let’s plan your next deployment</h1>
            <p className="page-subtitle">Reach our specialists for fleet procurement, parts orchestration, or technical support across Tajikistan.</p>
          </div>
          <div className="chip-list">
            <span className="chip">Procurement</span>
            <span className="chip">Service desk</span>
            <span className="chip">Emergency</span>
          </div>
        </section>

        <section className="section-block contact-grid" data-reveal>
          <div className="contact-info-grid">
            {touchpoints.map((item, index) => (
              <div
                key={item.id}
                className="glass-panel contact-card"
                data-reveal
                style={{ '--reveal-delay': `${index * 0.1}s` }}
              >
                <p className="section-eyebrow">{item.title}</p>
                <h3>{item.value}</h3>
                <p className="stat-detail">{item.meta}</p>
              </div>
            ))}

            <div className="glass-panel contact-card" data-reveal style={{ '--reveal-delay': '0.3s' }}>
              <p className="section-eyebrow">{t('contact.hours')}</p>
              <ul className="hours-list">
                {hours.map((slot) => (
                  <li key={slot.id}>
                    <span>{slot.day}</span>
                    <span>{slot.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel contact-card map-card" data-reveal style={{ '--reveal-delay': '0.35s' }}>
              <div className="placeholder-map">Google Map Integration</div>
            </div>
          </div>

          <div className="contact-form glass-panel" data-reveal>
            <h2>{t('contact.form_title')}</h2>

            {submitSuccess && (
              <div className="success-message">
                {t('common.success')} Your message has been sent successfully.
              </div>
            )}

            {submitError && (
              <div className="error-message">
                {submitError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="form-stack">
              <div className="form-field-grid">
                <div className="form-group">
                  <label htmlFor="name">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={contactForm.name}
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
                    value={contactForm.company}
                    onChange={handleInputChange}
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
                    value={contactForm.email}
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
                    value={contactForm.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">{t('contact.message')}</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={contactForm.message}
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;