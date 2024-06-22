import React from 'react';
// import { useDispatch } from 'react-redux'; // If using Redux for state management
import { useNavigate } from 'react-router-dom';
import '../../styles/custom.css'

const LogoutButton = () => {
    // const dispatch = useDispatch(); // If using Redux for state management
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions here
        // Example: Clear localStorage, clear Redux state, etc.

        // For demonstration purposes, clear localStorage token
        localStorage.removeItem('token'); // Clear token from localStorage

        // Redirect to login page
        navigate('/');
    };

    return (
        <button className="logout-button" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
