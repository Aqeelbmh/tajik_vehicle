import React from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

const Services = () => {
  const { t } = useTranslation();
  useScrollReveal();

  const services = [
    {
      id: 1,
      title: t('services.maintenance'),
      description: 'Comprehensive maintenance programs to keep your heavy machinery operating at peak performance.'
    },
    {
      id: 2,
      title: t('services.diagnostics'),
      description: 'Advanced diagnostic services using cutting-edge equipment to identify and resolve issues quickly.'
    },
    {
      id: 3,
      title: t('services.delivery'),
      description: 'Fast and reliable delivery of genuine and aftermarket spare parts across Tajikistan.'
    },
    {
      id: 4,
      title: t('services.support'),
      description: 'On-site technical support and emergency repair services for critical equipment downtime.'
    }
  ];

  const deliveryStack = [
    { id: 1, title: 'Discovery', detail: 'Fleet audit, risk scoring, and KPI alignment.' },
    { id: 2, title: 'Deployment', detail: 'Technician dispatch, spare staging, and training.' },
    { id: 3, title: 'Optimization', detail: 'Telemetry dashboards, predictive parts replenishment.' },
  ];

  return (
    <div className="page-shell services-page">
      <div className="container">
        <section className="page-hero hero-compact" data-reveal>
          <div>
            <p className="section-eyebrow">{t('nav.services')}</p>
            <h1>{t('services.title')}</h1>
            <p className="page-subtitle">{t('services.description')}</p>
          </div>
          <div className="chip-list">
            <span className="chip">24/7 Dispatch</span>
            <span className="chip">Field Technicians</span>
            <span className="chip">OEM Certified</span>
          </div>
        </section>

        <section className="section-block" data-reveal>
          <div className="services-grid">
            {services.map((service, index) => (
              <article
                key={service.id}
                className="service-card glass-panel"
                data-reveal
                style={{ '--reveal-delay': `${index * 0.1}s` }}
              >
                <div className="placeholder-icon">+</div>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
                <button
                  className="btn btn-text"
                  onClick={() => {
                    // Redirect to contact page with service information
                    window.location.href = '/contact?service=' + encodeURIComponent(service.title);
                  }}
                >
                  Book consultation →
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section-block alt" data-reveal>
          <div className="section-head">
            <p className="section-eyebrow">Service delivery playbook</p>
            <h2>Structured engagement in three clear phases</h2>
            <p className="section-description">Every engagement is led by a program manager to align procurement, operations, and finance.</p>
          </div>
          <div className="timeline-grid">
            {deliveryStack.map((stage, index) => (
              <div
                key={stage.id}
                className="timeline-card glass-panel"
                data-reveal
                style={{ '--reveal-delay': `${index * 0.12}s` }}
              >
                <span className="signal-badge">0{stage.id}</span>
                <h3>{stage.title}</h3>
                <p>{stage.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Services;
