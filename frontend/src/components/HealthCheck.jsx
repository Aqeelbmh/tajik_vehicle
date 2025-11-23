import React, { useState, useEffect } from 'react';
import { healthService } from '../services/api';

const HealthCheck = () => {
    const [status, setStatus] = useState('Checking...');
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const checkHealth = async () => {
            try {
                const data = await healthService.checkHealth();
                setStatus('Connected');
                setDetails(data);
            } catch (err) {
                console.error('Health check failed:', err);
                setStatus('Disconnected');
                setDetails(null);
            }
        };

        checkHealth();

        // Check health every 30 seconds
        const interval = setInterval(checkHealth, 30000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="health-check">
            <span className={`status-indicator ${status.toLowerCase()}`}></span>
            <span className="status-text">{status}</span>
            {details && (
                <span className="status-time">
                    Last check: {new Date(details.timestamp).toLocaleTimeString()}
                </span>
            )}
        </div>
    );
};

export default HealthCheck;