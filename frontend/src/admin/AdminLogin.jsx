import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const AdminLogin = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Simple authentication check (in a real app, this would be server-side)
        // For demo purposes, we'll use a simple check
        setTimeout(() => {
            if (credentials.username === 'admin' && credentials.password === 'password') {
                // Successful login - redirect to CRM
                navigate('/admin/crm');
            } else {
                setError('Invalid credentials. Please try again.');
            }
            setLoading(false);
        }, 500);
    };

    return (
        <div className="admin-login-page">
            <div className="container">
                <div className="auth-container glass-panel">
                    <div className="auth-header">
                        <h1>Admin Login</h1>
                        <p>Access the CRM dashboard and administrative tools</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={credentials.username}
                                onChange={handleInputChange}
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={credentials.password}
                                onChange={handleInputChange}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Authenticating...' : 'Login'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            <Link to="/">← Back to Home</Link>
                        </p>
                        <p className="helper-text">
                            Hint: Use username "admin" and password "password" for demo access
                        </p>
                        <p>
                            <Link to="/admin/cms">Go to CMS</Link> | <Link to="/admin/crm">Go to CRM</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;