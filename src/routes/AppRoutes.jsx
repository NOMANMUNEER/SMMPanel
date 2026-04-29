import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from '../layouts/AuthLayout';
import MainLayout from '../layouts/MainLayout';

// Pages
import Auth from '../pages/Auth';
import UserDashboard from '../pages/user/UserDashboard';
import NewOrder from '../pages/user/NewOrder';
import OrderHistory from '../pages/user/OrderHistory';
import AddFunds from '../pages/user/AddFunds';
import ServicesPage from '../pages/user/ServicesPage';
import SupportPage from '../pages/user/SupportPage';

// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminUsers from '../pages/admin/AdminUsers';
import AdminOrders from '../pages/admin/AdminOrders';
import AdminServices from '../pages/admin/AdminServices';
import AdminPayments from '../pages/admin/AdminPayments';
import AdminAPI from '../pages/admin/AdminAPI';
import AdminSettings from '../pages/admin/AdminSettings';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth" />} />
      
      <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Auth />} />
      </Route>

      <Route path="/user" element={<MainLayout allowedRole="user" />}>
        <Route path="dashboard" element={<UserDashboard />} />
        <Route path="new-order" element={<NewOrder />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="add-funds" element={<AddFunds />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="api" element={
          <div className="panel"><div className="panel-head"><span className="panel-title">🔌 API Access</span></div><div className="panel-body">
            <p style={{color:"var(--text2)",fontSize:13,marginBottom:16}}>Integrate our SMM panel into your own platform using our REST API.</p>
            <div className="alert alert-info" style={{marginTop:16}}>Base URL: <code style={{color:"var(--accent3)"}}>http://localhost:5000/api</code><br/>Docs: <a href="#" style={{color:"var(--blue)"}}>View Documentation →</a></div>
          </div></div>
        } />
      </Route>

      <Route path="/admin" element={<MainLayout allowedRole="admin" />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="services" element={<AdminServices />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="api-providers" element={<AdminAPI />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

export default AppRoutes;
