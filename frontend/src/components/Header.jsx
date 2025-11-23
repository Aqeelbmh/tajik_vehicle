import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import HealthCheck from './HealthCheck';

const Header = ({ changeLanguage, currentLanguage }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showAdminLink, setShowAdminLink] = useState(false);

  // Listen for key combination to show admin link (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminLink(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">HVSP</Link>
          </div>

          <nav className="main-navigation">
            <ul>
              <li><Link to="/">{t('nav.home')}</Link></li>
              <li><Link to="/vehicles">{t('nav.vehicles')}</Link></li>
              <li><Link to="/parts">{t('nav.parts')}</Link></li>
              <li><Link to="/services">{t('nav.services')}</Link></li>
              <li><Link to="/about">{t('nav.about')}</Link></li>
              <li><Link to="/partners">{t('nav.partners')}</Link></li>
              <li><Link to="/gallery">{t('nav.gallery')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </nav>

          <div className="header-controls">
            <HealthCheck />
            {showAdminLink && (
              <>
                <Link to="/admin/crm" className="tw-btn-outline tw-btn-sm" style={{ marginRight: '10px' }}>
                  Admin CRM
                </Link>
                <Link to="/admin/cms" className="tw-btn-outline tw-btn-sm" style={{ marginRight: '10px' }}>
                  CMS
                </Link>
              </>
            )}
            <div className="language-selector">
              <select
                value={currentLanguage}
                onChange={(e) => changeLanguage(e.target.value)}
                aria-label={t('common.language')}
              >
                <option value="en">{t('common.english')}</option>
                <option value="ru">{t('common.russian')}</option>
                <option value="tg">{t('common.tajik')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;