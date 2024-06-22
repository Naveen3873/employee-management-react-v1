import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../config/axiosInstance'; // Adjust path as per your project structure
import { Link,useNavigate } from 'react-router-dom';
import '../../styles/form.css'; // Import your custom CSS for form styling
import RedirectBasedOnRole from '../RedirectBasedOnRole'; // Import the new component
import Swal from 'sweetalert2';

const LoginForm = () => {
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await axiosInstance.post('/api/auth/login', values);
            const { isAdmin, token } = response.data;

            if (isAdmin) {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
            localStorage.setItem('token', token);
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (error) {
            console.error('Login error:', error.response.data);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: error.response.data.message,
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="form-container">
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({ isSubmitting }) => (
                    <Form>
                        <h2>Login</h2>
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
                        <Link to="/signup" className="redirect-link">Create an account</Link>
                        <div className="button-group">
                            <button type="submit" className="primary-button" disabled={isSubmitting}>
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/* Render the RedirectBasedOnRole component */}
            <RedirectBasedOnRole />
        </div>
    );
};

export default LoginForm;