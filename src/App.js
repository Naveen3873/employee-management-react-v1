import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm';
import RegisterForm from './components/Auth/RegisterForm';
import PrivateRoute from './components/Auth/PrivateRoute';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<RegisterForm />} />
          <Route path="/user-dashboard"element={<PrivateRoute> <UserDashboard /> </PrivateRoute>} />
          <Route path="/admin-dashboard"element={<PrivateRoute> <AdminDashboard /> </PrivateRoute>} />
      </Routes>
  </Router>
);
};

export default App;