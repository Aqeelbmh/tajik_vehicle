import React from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

const About = () => {
    const { t } = useTranslation();
    useScrollReveal();

    const values = [
        { id: 1, title: 'Reliability first', detail: 'We engineer every engagement around uptime, transparency, and measurable KPIs.' },
        { id: 2, title: 'Local mastery', detail: 'Nation-wide coverage with multilingual teams anchored in Tajikistan.' },
        { id: 3, title: 'Forward looking', detail: 'We invest heavily in digital infrastructure, analytics, and knowledge sharing.' },
    ];

    const history = [
        { year: '2010', title: 'Company founded', detail: 'Specialised distributor of agricultural machinery opens in Dushanbe.' },
        { year: '2015', title: 'Expanded portfolio', detail: 'Construction and industrial equipment layered onto core offering.' },
        { year: '2020', title: 'National coverage', detail: 'Regional offices activated with dedicated service depots.' },
        { year: '2023', title: 'Digital transformation', detail: 'Online platform launched with CRM, telemetry, and partner APIs.' },
    ];

    return (
        <div className="page-shell about-page">
            <div className="container">
                <section className="page-hero hero-compact" data-reveal>
                    <div>
                        <p className="section-eyebrow">{t('about.title')}</p>
                        <h1>{t('about.mission')}</h1>
                        <p className="page-subtitle">
                            We provide high-quality heavy machinery and spare parts to the industrial sector in Tajikistan,
                            pairing OEM-grade sourcing with local execution.
                        </p>
                    </div>
                    <div className="chip-list">
                        <span className="chip">Established 2010</span>
                        <span className="chip">Nationwide Operations</span>
                        <span className="chip">Digital-first</span>
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="section-head">
                        <p className="section-eyebrow">Operating principles</p>
                        <h2>Values that anchor our teams</h2>
                    </div>
                    <div className="insight-grid">
                        {values.map((value, index) => (
                            <article
                                key={value.id}
                                className="glass-panel insight-card"
                                data-reveal
                                style={{ '--reveal-delay': `${index * 0.12}s` }}
                            >
                                <span className="signal-badge">0{value.id}</span>
                                <h3>{value.title}</h3>
                                <p>{value.detail}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="section-block alt" data-reveal>
                    <div className="section-head">
                        <h2>{t('about.history')}</h2>
                        <p className="section-description">Moments that shaped the Heavy Vehicle & Spare Parts platform.</p>
                    </div>
                    <div className="history-grid">
                        {history.map((event, index) => (
                            <div
                                key={event.year}
                                className="timeline-card glass-panel"
                                data-reveal
                                style={{ '--reveal-delay': `${index * 0.1}s` }}
                            >
                                <span className="timeline-year-chip">{event.year}</span>
                                <h3>{event.title}</h3>
                                <p>{event.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="section-head">
                        <h2>{t('about.team')}</h2>
                        <p className="section-description">A multidisciplinary leadership bench spanning procurement, engineering, and service delivery.</p>
                    </div>
                    <div className="team-grid">
                        {[1, 2, 3].map(member => (
                            <div key={member} className="team-member glass-panel" data-reveal style={{ '--reveal-delay': `${member * 0.1}s` }}>
                                <div className="member-photo">
                                    <div className="placeholder-photo">Photo</div>
                                </div>
                                <h3>Team Member {member}</h3>
                                <p>Position Title</p>
                                <p>Brief biography highlighting experience and expertise.</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
