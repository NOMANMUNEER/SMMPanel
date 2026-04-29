import React from 'react';
import Icon from './Icon';

const Topbar = ({ role, currentUser, pageTitle, setSidebarOpen }) => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={()=>setSidebarOpen(s=>!s)}>
          <Icon name="menu" size={20}/>
        </button>
        <span className="topbar-title">{pageTitle}</span>
      </div>
      <div className="topbar-right">
        {role === "user" && <div className="balance-chip">💰 ${Number(currentUser?.balance || 0).toFixed(2)}</div>}
        {role === "admin" && <span className="badge badge-purple">🔧 Admin</span>}
        <button className="btn-notif">
          <Icon name="bell" size={16}/>
          <span className="notif-dot"/>
        </button>
      </div>
    </div>
  );
};

export default Topbar;
