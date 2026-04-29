import React, { useState, useContext, useEffect } from 'react';
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const MainLayout = ({ allowedRole }) => {
  const { currentUser, role, loading, logout } = useContext(AuthContext);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (role === 'admin') {
      // Fetch pending payments count
      api.get('/admin/payments').then(res => {
        setPaymentsCount(res.data.filter(p => p.status === 'pending').length);
      }).catch(err => console.error(err));
    }
  }, [role, location.pathname]);

  if (loading) return <div style={{padding: 40, color: 'white'}}>Loading...</div>;

  if (!currentUser) {
    return <Navigate to="/auth" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} />;
  }

  const getPageTitle = (path) => {
    const parts = path.split('/');
    const last = parts[parts.length - 1];
    return last.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <div className="layout">
      {!sidebarOpen && <div className="floating-overlay" onClick={()=>setSidebarOpen(false)}/>}
      <Sidebar 
        role={role} 
        currentUser={currentUser} 
        sidebarOpen={sidebarOpen} 
        logout={handleLogout}
        paymentsCount={paymentsCount}
      />
      <div className={`main ${sidebarOpen?"":"full"}`}>
        <Topbar 
          role={role} 
          currentUser={currentUser} 
          pageTitle={getPageTitle(location.pathname)} 
          setSidebarOpen={setSidebarOpen} 
        />
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
