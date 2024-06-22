import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../config/axiosInstance';
import '../styles/userDashboard.css';
import Swal from 'sweetalert2';
import LogoutButton from './Auth/LogoutButton';

const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [tax, setTax] = useState(0);
    const [basicSalary, setBasicSalary] = useState(0);
    const [pfAmount, setPfAmount] = useState(0);

    useEffect(() => {
        getUserData();
    }, []);

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/api/user/profile');
            setUser(response.data);
            updateCalculations(response.data.salary);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const updateCalculations = (salary) => {
        setTax(calculateTax(salary));
        setBasicSalary(calculateBasicSalary(salary));
        setPfAmount(calculatePF(salary));
    };

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        phone: Yup.string()
            .matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits')
            .required('Phone number is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        salary: Yup.number().required('Salary is required').positive('Salary must be positive'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            await axiosInstance.put('/api/user/profile', values);
            Swal.fire({
                icon: 'success',
                title: 'Update Successful!',
                text: 'Your profile has been updated.',
            });
            setIsEditMode(false);
            getUserData();
        } catch (error) {
            console.error('Error updating user data:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.response?.data?.message || 'An error occurred',
            });
        } finally {
            setSubmitting(false);
        }
    };

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
            return salary * 0.25;
        } else if (salary >= 1000000 && salary <= 2000000) {
            return salary * 0.5;
        } else if (salary > 2000000 && salary <= 3000000) {
            return salary * 0.75;
        } else {
            return 0;
        }
    };

    const calculatePF = (salary) => {
        const basicSalary = calculateBasicSalary(salary);
        return basicSalary * 0.12;
    };

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <LogoutButton className="logout-button" />
            {isEditMode ? (
                <Formik
                    initialValues={user}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                >
                    {({ isSubmitting, setFieldValue }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <Field type="text" id="name" name="name" />
                                <ErrorMessage name="name" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone:</label>
                                <Field type="text" id="phone" name="phone" />
                                <ErrorMessage name="phone" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="salary">Salary:</label>
                                <Field
                                    type="number"
                                    id="salary"
                                    name="salary"
                                    onChange={(e) => {
                                        const newSalary = parseFloat(e.target.value);
                                        setFieldValue('salary', newSalary);
                                        updateCalculations(newSalary);
                                    }}
                                />
                                <ErrorMessage name="salary" component="div" className="error" />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <p>{user.email}</p>
                            </div>
                            <div className="form-group">
                                <label>Tax:</label>
                                <p>{tax}</p>
                            </div>
                            <div className="form-group">
                                <label>Basic Salary:</label>
                                <p>{basicSalary}</p>
                            </div>
                            <div className="form-group">
                                <label>PF Amount:</label>
                                <p>{pfAmount}</p>
                            </div>
                            <div className="button-group">
                                <button type="submit" className="primary-button" disabled={isSubmitting}>
                                    Update
                                </button>
                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => setIsEditMode(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className="profile-details">
                    <div className="detail">
                        <span className="label">Name:</span>
                        <span className="value">{user.name}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Phone:</span>
                        <span className="value">{user.phone}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Email:</span>
                        <span className="value">{user.email}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Salary:</span>
                        <span className="value">{user.salary}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Tax:</span>
                        <span className="value">{tax}</span>
                    </div>
                    <div className="detail">
                        <span className="label">Basic Salary:</span>
                        <span className="value">{basicSalary}</span>
                    </div>
                    <div className="detail">
                        <span className="label">PF Amount:</span>
                        <span className="value">{pfAmount}</span>
                    </div>
                    <div className="button-group">
                        <button className="primary-button" onClick={() => setIsEditMode(true)}>
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboard;