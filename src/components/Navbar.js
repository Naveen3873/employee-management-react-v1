import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap's JavaScript
import { Link, useLocation } from 'react-router-dom';
import LogoutButton from './Auth/LogoutButton';


const Navbar = () => {
    const location = useLocation();

    const isAdmin = () => {
        // Check if role is stored in localStorage and is ADMIN
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    };

    // Determine if the current path is "/" or "/signup"
    const isHomePage = location.pathname === '/' || location.pathname === '/signup';

    // Render only the navbar brand if on "/" or "/signup"
    if (isHomePage) {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Employee Management</Link>
                </div>
            </nav>
        );
    }

    return (
        <>
           <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Employee Management</Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarTogglerDemo02">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/user-dashboard" className="nav-link" aria-current="page">User Profile</Link>
                        </li>
                        {isAdmin() && (
                            <li className="nav-item">
                                <Link to="/admin-dashboard" className="nav-link">Admin Dashboard</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <LogoutButton />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar