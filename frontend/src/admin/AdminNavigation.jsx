import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavigation = () => {
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path);
    };

    return (
        <nav className="admin-navigation">
            <ul>
                <li>
                    <Link
                        to="/admin/crm"
                        className={isActive('/admin/crm') ? 'active' : ''}
                    >
                        CRM Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/cms"
                        className={isActive('/admin/cms') ? 'active' : ''}
                    >
                        CMS
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/products/vehicles"
                        className={isActive('/admin/products/vehicles') ? 'active' : ''}
                    >
                        Vehicle Management
                    </Link>
                </li>
                <li>
                    <Link
                        to="/admin/products/spare-parts"
                        className={isActive('/admin/products/spare-parts') ? 'active' : ''}
                    >
                        Spare Part Management
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default AdminNavigation;