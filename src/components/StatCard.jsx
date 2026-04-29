import React from 'react';
import Icon from './Icon';

const StatCard = ({ label, value, sub, icon, color, prefix = "" }) => (
  <div className={`stat-card c${color}`}>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{prefix}{value}</div>
    {sub && <div className="stat-sub">{sub}</div>}
    <div className="stat-icon"><Icon name={icon} size={48} /></div>
  </div>
);

export default StatCard;
