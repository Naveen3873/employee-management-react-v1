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
          {/* Private routes */}
          <Route path="/user-dashboard"element={<PrivateRoute> <UserDashboard /> </PrivateRoute>} />
          <Route path="/admin-dashboard"element={<PrivateRoute> <AdminDashboard /> </PrivateRoute>} />
          {/* <PrivateRoute path="/admin-dashboard" element={<AdminDashboard />} />
          <PrivateRoute path="/user-dashboard" element={<UserDashboard />} /> */}
          {/* Other routes */}
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
  </Router>
);
};

export default App;