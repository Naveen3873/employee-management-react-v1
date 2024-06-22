// src/components/Auth/RegisterForm.js

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../../styles/form.css'; // Import your custom CSS for form styling
import axios from '../../config/axiosInstance';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  phone: '',
  salary: 0,
  email: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone number must be exactly 10 digits').required('Phone number is required'),
  salary: Yup.number().required('Salary is required').positive('Salary must be positive'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Example: Make API request to register user
            const response = await axios.post('/api/auth/register', values);
            console.log('Registration successful:', response.data);
            resetForm();
            Swal.fire({
                icon: 'success',
                title: 'Registration Successful!',
                text: response.data.message,
            });
            navigate('/')
        } catch (error) {
            console.error('Registration error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.data.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container"> {/* Use a container for responsive styling */}
            <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            >
            {({ isSubmitting }) => (
                <Form>
                    <h2>Register</h2>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <Field type="text" id="name" name="name" />
                        <ErrorMessage name="name" component="div" className="error" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number:</label>
                        <Field type="text" id="phone" name="phone" />
                        <ErrorMessage name="phone" component="div" className="error" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary">Salary:</label>
                        <Field type="number" id="salary" name="salary" />
                        <ErrorMessage name="salary" component="div" className="error" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <Field type="email" id="email" name="email" />
                        <ErrorMessage name="email" component="div" className="error" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <Field type="password" id="password" name="password" />
                        <ErrorMessage name="password" component="div" className="error" />
                    </div>
                    <Link to="/" className="redirect-link">Already have an account</Link>
                    <div className="button-group">
                        <button type="submit" className="primary-button" disabled={isSubmitting}>
                            Register
                        </button>
                    </div>
                </Form>
            )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
