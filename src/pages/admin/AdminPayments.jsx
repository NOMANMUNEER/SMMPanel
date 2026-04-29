import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Badge from '../../components/Badge';

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get('/admin/payments').then(res => setPayments(res.data)).catch(err => console.error(err));
  }, []);

  const updatePayment = async (id, status) => {
    try {
      await api.put(`/admin/payments/${id}/status`, { status });
      setPayments(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">💰 Payment Management</span></div>
      <div className="panel-body" style={{padding:0}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Pay ID</th><th>User</th><th>Method</th><th>Amount (PKR)</th><th>USD Equiv</th><th>Proof/TXN</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {payments.map(p=>(
                <tr key={p.id}>
                  <td style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{p.id}</td>
                  <td>{p.username}</td>
                  <td>{p.method}</td>
                  <td className="text-gold">PKR {Number(p.amount).toFixed(0)}</td>
                  <td className="text-green">${Number(p.usd_amount).toFixed(2)}</td>
                  <td style={{fontFamily:"monospace",fontSize:12}}>{p.proof}</td>
                  <td><Badge status={p.status}/></td>
                  <td style={{fontSize:12}}>{new Date(p.created_at).toLocaleDateString()}</td>
                  <td>
                    {p.status==="pending" && (
                      <div className="flex gap8">
                        <button className="btn btn-green btn-sm" onClick={()=>updatePayment(p.id, "approved")}>✓ Approve</button>
                        <button className="btn btn-red btn-sm" onClick={()=>updatePayment(p.id, "rejected")}>✕ Reject</button>
                      </div>
                    )}
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

export default AdminPayments;
