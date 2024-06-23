import React from 'react';
// import { useDispatch } from 'react-redux'; // If using Redux for state management
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../config/axiosInstance'; // Adjust path as per your project structure

const LogoutButton = () => {
    // const dispatch = useDispatch(); // If using Redux for state management
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout actions here
        // Example: Clear localStorage, clear Redux state, etc.

        // For demonstration purposes, clear localStorage token
        localStorage.removeItem('token'); // Clear token from localStorage
        localStorage.removeItem('role'); // Clear role from localStorage
        axiosInstance.defaults.headers.common['Authorization'] = null;
        // Redirect to login page
        navigate('/');
    };

    return (
        <button className="btn btn-danger" onClick={handleLogout}>
            Logout
        </button>
    );
};

export default LogoutButton;
