import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import Badge from '../../components/Badge';
import PlatformIcon from '../../components/PlatformIcon';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/admin/orders').then(res => setOrders(res.data)).catch(err => console.error(err));
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">📦 Order Management</span></div>
      <div className="panel-body" style={{padding:0}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>User</th><th>Service</th><th>Link</th><th>Qty</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id}>
                  <td style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{o.id}</td>
                  <td>{o.username}</td>
                  <td><div className="flex gap8"><PlatformIcon platform={o.platform}/><span style={{fontSize:12}}>{o.service_name}</span></div></td>
                  <td><a href={o.link} target="_blank" rel="noreferrer" style={{color:"var(--blue)",fontSize:11,maxWidth:100,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.link}</a></td>
                  <td>{o.quantity.toLocaleString()}</td>
                  <td className="text-green">${Number(o.price).toFixed(2)}</td>
                  <td><Badge status={o.status}/></td>
                  <td>
                    <div className="flex gap8">
                      {o.status!=="completed" && <button className="btn btn-green btn-sm" onClick={()=>updateStatus(o.id,"completed")}>Complete</button>}
                      {o.status==="pending" && <button className="btn btn-blue btn-sm" style={{background:"#3b82f620",color:"var(--blue)",borderColor:"#3b82f630"}} onClick={()=>updateStatus(o.id,"processing")}>Process</button>}
                    </div>
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

export default AdminOrders;
