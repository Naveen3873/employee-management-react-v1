import React from 'react';
import '../styles/userCard.css';

const UserCard = ({ user }) => {
    const calculateTax = (salary) => {
        if (salary < 10) return salary * 0.1;
        if (salary <= 20) return salary * 0.2;
        return salary * 0.3;
    };

    const calculateBasicSalary = (salary) => {
        if (salary < 10) return salary * 0.25;
        if (salary <= 20) return salary * 0.5;
        return salary * 0.75;
    };

    const calculatePF = (basicSalary) => basicSalary * 0.12;

    const tax = calculateTax(user.salary);
    const basicSalary = calculateBasicSalary(user.salary);
    const pfAmount = calculatePF(basicSalary);

    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Salary: ₹ {user.salary} LPA</p>
            <p>Tax: ₹ {tax}</p>
            <p>Basic Salary: ₹ {basicSalary}</p>
            <p>PF Amount: ₹ {pfAmount}</p>
        </div>
    );
};

export default UserCard;
