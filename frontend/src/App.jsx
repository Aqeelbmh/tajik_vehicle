import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './App.css';
import './components/ProductCard.css';
import './components/PartsCard.css';
import './components/Footer.css';
import './components/HeroSection.css';
import './components/ResponsiveDesign.css';
import './components/TailwindComponents.css';

// Import page components
import Header from './components/Header';
import SplashScreen from './components/SplashScreen';
import Home from './pages/Home';
import Vehicles from './pages/Vehicles';
import Parts from './pages/Parts';
import Services from './pages/Services';
import About from './pages/About';
import Partners from './pages/Partners';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import VehicleDetails from './pages/VehicleDetails';
import CRMDashboard from './admin/CRMDashboard';
import AdminLogin from './admin/AdminLogin';
import CMSDashboard from './admin/cms/CMSDashboard';
import ContentForm from './admin/cms/ContentForm';
import VehicleManager from './admin/products/VehicleManager';
import SparePartManager from './admin/products/SparePartManager';
import VehicleForm from './admin/products/VehicleForm';
import SparePartForm from './admin/products/SparePartForm';
import './admin/CRMDashboard.css';
import './admin/cms/CMSDashboard.css';

function App() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [showSplash, setShowSplash] = useState(true);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <Router>
      <div className="App">
        <Header changeLanguage={changeLanguage} currentLanguage={language} />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vehicles" element={<Vehicles />} />
            <Route path="/vehicles/:id" element={<VehicleDetails />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/cms" element={<CMSDashboard />} />
            <Route path="/admin/cms/create" element={<ContentForm />} />
            <Route path="/admin/cms/edit/:id" element={<ContentForm />} />
            <Route path="/admin/crm" element={<CRMDashboard />} />
            <Route path="/admin/products/vehicles" element={<VehicleManager />} />
            <Route path="/admin/products/vehicles/create" element={<VehicleForm />} />
            <Route path="/admin/products/vehicles/edit/:id" element={<VehicleForm />} />
            <Route path="/admin/products/spare-parts" element={<SparePartManager />} />
            <Route path="/admin/products/spare-parts/create" element={<SparePartForm />} />
            <Route path="/admin/products/spare-parts/edit/:id" element={<SparePartForm />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-section">
                <div className="footer-logo">HVSP</div>
                <p>Providing high-quality heavy vehicles and spare parts for industrial and agricultural needs since 2010.</p>
                <div className="social-links">
                  <a href="#" className="social-link">f</a>
                  <a href="#" className="social-link">t</a>
                  <a href="#" className="social-link">in</a>
                </div>
              </div>

              <div className="footer-section">
                <h3>Quick Links</h3>
                <ul className="footer-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/vehicles">Vehicles</a></li>
                  <li><a href="/parts">Parts</a></li>
                  <li><a href="/services">Services</a></li>
                  <li><a href="/about">About Us</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/admin/login">Admin Login</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3>Contact Us</h3>
                <div className="contact-info">
                  <p><i>📍</i> 123 Industrial Avenue, Manufacturing District</p>
                  <p><i>📞</i> +1 (555) 123-4567</p>
                  <p><i>✉️</i> info@hvsp-platform.com</p>
                  <p><i>🕒</i> Mon-Fri: 9AM - 6PM</p>
                </div>
              </div>
            </div>

            <div className="copyright">
              <p>&copy; {new Date().getFullYear()} Heavy Vehicle & Spare Parts Distribution Platform. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;