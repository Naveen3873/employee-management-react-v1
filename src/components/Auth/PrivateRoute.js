import React from 'react';
// import { Route, Navigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// Example of a function to check authentication (replace with your own logic)
const isAuthenticated = () => {
    // Check if user is authenticated (e.g., check localStorage, Redux state, etc.)
    const token = localStorage.getItem('token'); // Assuming you store token in localStorage
    return !!token; // Return true if token exists, otherwise false
};

const PrivateRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
    // return (
    //     <Route
    //         {...rest}
    //         element={isAuthenticated() ? (
    //             element
    //         ) : (
    //             <Navigate to="/" replace /> // Redirect to login if not authenticated
    //         )}
    //     />
    // );
};

export default PrivateRoute;