import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AuthLayout = () => {
  const { currentUser, role, loading } = useContext(AuthContext);

  if (loading) return <div style={{padding: 40, color: 'white'}}>Loading...</div>;

  if (currentUser) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} />;
  }

  return (
    <div className="auth-bg">
      <div className="auth-card">
        <div className="auth-logo">
          <h1>SMM<span>Panel</span>.pk</h1>
          <p>Pakistan's #1 Social Media Marketing Panel</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
