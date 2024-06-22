// src/components/ProfileCard.js
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/profileCard.css'; // Adjust path as per your project structure

const ProfileCard = ({ user, onAccept, onReject }) => {
    const formatDate = (dateString) => {
        const options = {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return new Date(dateString).toLocaleString('en-IN', options);
    };
    
    return (
        <div className="profile-card">
            <div className="profile-details">
                <h3>{user.name}</h3>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <p>Salary: {user.salary}</p>
                <p>Tax: {calculateTax(user.salary)}</p>
                <p>Basic Salary: {calculateBasicSalary(user.salary)}</p>
                <p>PF Amount: {calculatePF(user.salary)}</p>
                <p>Created At: {formatDate(user.createdAt)}</p>
                {user.isApproved ? <p>Approved At: {formatDate(user.updatedAt)}</p> : ''}
                {!user.isApproved ? 
                <div className="button-group">
                    <button className="accept-button" onClick={() => onAccept(user._id)}>Accept</button>
                    <button className="reject-button" onClick={() => onReject(user._id)}>Reject</button>
                </div>
                : ''
                }
            </div>
        </div>
    );
};

ProfileCard.propTypes = {
    user: PropTypes.object.isRequired,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func.isRequired,
};

export default ProfileCard;

// Helper functions to calculate Tax, Basic Salary, and PF Amount
const calculateTax = (salary) => {
    if (salary < 1000000) {
        return salary * 0.10;
    } else if (salary >= 1000000 && salary <= 2000000) {
        return salary * 0.20;
    } else if (salary > 2000000 && salary <= 3000000) {
        return salary * 0.30;
    } else {
        return 0;
    }
};

const calculateBasicSalary = (salary) => {
    if (salary < 1000000) {
        return `${salary * 0.25}`;
    } else if (salary >= 1000000 && salary <= 2000000) {
        return `${salary * 0.5}`;
    } else if (salary > 2000000 && salary <= 3000000) {
        return `${salary * 0.75}`;
    } else {
        return 'N/A';
    }
};

const calculatePF = (salary) => {
    const basicSalary = calculateBasicSalary(salary);
    return `${basicSalary * 0.12}`;
};