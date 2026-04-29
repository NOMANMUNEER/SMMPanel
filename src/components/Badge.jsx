import React from 'react';

const Badge = ({ status }) => {
  const map = { 
    completed: ["green","✓"], 
    processing: ["blue","↻"], 
    pending: ["yellow","◷"], 
    cancelled: ["red","✕"], 
    approved: ["green","✓"], 
    rejected: ["red","✕"], 
    active: ["green","●"], 
    suspended: ["red","●"], 
    open: ["blue","○"], 
    closed: ["green","✓"] 
  };
  const [cl, ic] = map[status?.toLowerCase()] || ["purple", "?"];
  return <span className={`badge badge-${cl}`}>{ic} {status}</span>;
};

export default Badge;
