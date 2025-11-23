import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

const Gallery = () => {
    const { t } = useTranslation();
    useScrollReveal();

    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'vehicles', name: t('gallery.vehicles') },
        { id: 'workshop', name: t('gallery.workshop') },
        { id: 'projects', name: t('gallery.projects') }
    ];

    const galleryItems = [
        { id: 1, category: 'vehicles', title: 'Tractor Delivery', description: 'New tractor delivered to a farm in Khatlon region' },
        { id: 2, category: 'vehicles', title: 'Fleet Overview', description: 'Our latest vehicle inventory at the warehouse' },
        { id: 3, category: 'workshop', title: 'Service Bay', description: 'Technicians working on a bulldozer maintenance' },
        { id: 4, category: 'workshop', title: 'Parts Storage', description: 'Organized spare parts warehouse' },
        { id: 5, category: 'projects', title: 'Construction Site', description: 'Our bulldozers at work on a major infrastructure project' },
        { id: 6, category: 'projects', title: 'Agricultural Project', description: 'Tractors in operation at a large farming cooperative' },
        { id: 7, category: 'projects', title: 'Road Construction', description: 'Lorries and equipment at a highway construction site' },
        { id: 8, category: 'workshop', title: 'Quality Control', description: 'Inspecting newly arrived spare parts' }
    ];

    const galleryStats = [
        { id: 1, label: 'Deployments captured', value: '140+', note: 'Across Tajikistan' },
        { id: 2, label: 'Workshop bays', value: '12', note: 'ISO-rated facilities' },
        { id: 3, label: 'Projects documented', value: '45', note: 'Infrastructure & agro' },
    ];

    const filteredItems = activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter(item => item.category === activeCategory);

    return (
        <div className="page-shell gallery-page">
            <div className="container">
                <section className="page-hero hero-compact" data-reveal>
                    <div>
                        <p className="section-eyebrow">{t('gallery.title')}</p>
                        <h1>Field execution in focus</h1>
                        <p className="page-subtitle">A visual log of deployments, workshops, and partner projects across the region.</p>
                    </div>
                    <div className="chip-list">
                        <span className="chip">Operations</span>
                        <span className="chip">Workshops</span>
                        <span className="chip">Projects</span>
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="section-head text-center">
                        <p className="section-eyebrow">Live operations pulse</p>
                        <h2>Curated highlights by category</h2>
                    </div>
                    <div className="category-filter pill-cloud">
                        {categories.map(category => (
                            <button
                                key={category.id}
                                className={`pill-btn ${activeCategory === category.id ? 'active' : ''}`}
                                onClick={() => setActiveCategory(category.id)}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </section>

                <section className="section-block alt" data-reveal>
                    <div className="insight-grid">
                        {galleryStats.map((stat, index) => (
                            <article
                                key={stat.id}
                                className="glass-panel insight-card"
                                data-reveal
                                style={{ '--reveal-delay': `${index * 0.1}s` }}
                            >
                                <p className="stat-value">{stat.value}</p>
                                <p className="stat-label">{stat.label}</p>
                                <p className="stat-detail">{stat.note}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="section-block" data-reveal>
                    <div className="gallery-grid">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                className="gallery-item card-spotlight"
                                data-reveal
                                style={{ '--reveal-delay': `${index * 0.05}s` }}
                            >
                                <div className="gallery-image placeholder-image">
                                    <span>Image {item.id}</span>
                                </div>
                                <div className="gallery-info">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <span className="badge-neutral">{item.category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Gallery;