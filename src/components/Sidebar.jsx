import React from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon';

const Sidebar = ({ role, currentUser, sidebarOpen, logout, paymentsCount = 0 }) => {
  const userNav = [
    {id:"dashboard", label:"Dashboard", icon:"dashboard", path: "/user/dashboard"},
    {id:"new-order", label:"New Order", icon:"plus", path: "/user/new-order"},
    {id:"orders", label:"My Orders", icon:"orders", path: "/user/orders"},
    {id:"add-funds", label:"Add Funds", icon:"wallet", path: "/user/add-funds"},
    {id:"services", label:"Services", icon:"services", path: "/user/services"},
    {id:"support", label:"Support", icon:"ticket", path: "/user/support"},
    {id:"api", label:"API Access", icon:"api", path: "/user/api"},
  ];

  const adminNav = [
    {id:"dashboard", label:"Dashboard", icon:"dashboard", path: "/admin/dashboard"},
    {id:"users", label:"Users", icon:"users", path: "/admin/users"},
    {id:"orders", label:"Orders", icon:"orders", path: "/admin/orders"},
    {id:"services", label:"Services", icon:"services", path: "/admin/services"},
    {id:"payments", label:"Payments", icon:"payment", path: "/admin/payments"},
    {id:"api-providers", label:"API Providers", icon:"api", path: "/admin/api-providers"},
    {id:"settings", label:"Settings", icon:"settings", path: "/admin/settings"},
  ];

  const navItems = role === "admin" ? adminNav : userNav;

  return (
    <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
      <div className="sidebar-logo">
        <h2>SMM<span>Panel</span></h2>
        <p>{role === "admin" ? "Admin Control Panel" : "User Dashboard"}</p>
      </div>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-label">{role === "admin" ? "Management" : "Navigation"}</div>
          {navItems.map(item => (
            <NavLink 
              key={item.id} 
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
              style={{textDecoration: 'none'}}
            >
              <Icon name={item.icon} size={16}/>
              {item.label}
              {item.id==="payments" && paymentsCount > 0 && (
                <span style={{marginLeft:"auto",background:"var(--red)",borderRadius:20,fontSize:10,padding:"2px 6px",fontWeight:700, color: 'white'}}>{paymentsCount}</span>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
      <div className="sidebar-user">
        <div className="sidebar-user-info">
          <div className="avatar">{(currentUser?.username||"A")[0].toUpperCase()}</div>
          <div>
            <div className="user-name">{currentUser?.username || "Admin"}</div>
            <div className="user-role">{role === "admin" ? "Administrator" : `$${Number(currentUser?.balance || 0).toFixed(2)}`}</div>
          </div>
          <button style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"var(--text3)",padding:4}} onClick={logout}>
            <Icon name="logout" size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
