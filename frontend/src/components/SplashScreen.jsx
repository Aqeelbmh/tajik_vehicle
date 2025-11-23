import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

const SplashScreen = ({ onComplete }) => {
    const [isAnimating, setIsAnimating] = useState(true);

    useEffect(() => {
        // Animation duration: 3 seconds
        const timer = setTimeout(() => {
            setIsAnimating(false);
            // Wait for fade out, then call onComplete
            setTimeout(() => {
                onComplete();
            }, 500);
        }, 3000);

        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!isAnimating) {
        return null;
    }

    return (
        <div className={`splash-screen ${!isAnimating ? 'fade-out' : ''}`}>
            <div className="splash-content">
                {/* Tractor Animation */}
                <div className="tractor-container">
                    <div className="tractor">
                        🚜
                    </div>
                </div>

                {/* Brand Name */}
                <div className="splash-text">
                    <h1 className="splash-title">HVSP</h1>
                    <p className="splash-subtitle">Heavy Vehicle & Spare Parts</p>
                </div>

                {/* Loading indicator */}
                <div className="loading-bar">
                    <div className="loading-progress"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
