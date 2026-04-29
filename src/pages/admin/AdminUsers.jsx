import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Badge from '../../components/Badge';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    api.get('/admin/users').then(res => setUsers(res.data)).catch(err => console.error(err));
  }, []);

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "active" ? "suspended" : "active";
    try {
      await api.put(`/admin/users/${id}/status`, { status: newStatus });
      setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus } : u));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">👥 User Management</span>
      </div>
      <div className="panel-body" style={{padding:0}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Balance</th><th>Spent</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td>
                    <div className="flex gap8">
                      <div className="avatar-sm">{u.username?.[0]?.toUpperCase()}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:500}}>{u.username}</div>
                        <div style={{fontSize:11,color:"var(--text3)"}}>{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="text-green">${Number(u.balance).toFixed(2)}</td>
                  <td>${Number(u.spent).toFixed(2)}</td>
                  <td><Badge status={u.status}/></td>
                  <td style={{fontSize:12}}>{new Date(u.joined_at).toLocaleDateString()}</td>
                  <td>
                    <button className={`btn btn-sm ${u.status==="active"?"btn-red":"btn-green"}`} onClick={()=>toggleStatus(u.id, u.status)}>
                      {u.status==="active"?"Suspend":"Activate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
