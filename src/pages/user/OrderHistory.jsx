import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PlatformIcon from '../../components/PlatformIcon';
import Badge from '../../components/Badge';

const OrderHistory = () => {
  const [filter, setFilter] = useState("all");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(res => {
      setOrders(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">📋 Order History</span>
        <span className="text-muted" style={{fontSize:12}}>{orders.length} total</span>
      </div>
      <div className="panel-body">
        <div className="tabs">
          {["all","completed","processing","pending"].map(s => (
            <button key={s} className={`tab ${filter===s?"active":""}`} onClick={()=>setFilter(s)}>
              {s.charAt(0).toUpperCase()+s.slice(1)}
            </button>
          ))}
        </div>
        <div className="table-wrap">
          {loading ? (
             <div style={{textAlign:"center", padding:"32px"}}>Loading orders...</div>
          ) : (
            <table>
              <thead><tr><th>Order ID</th><th>Service</th><th>Link</th><th>Qty</th><th>Price</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} style={{textAlign:"center",color:"var(--text3)",padding:"32px"}}>No orders found</td></tr>
                ) : filtered.map(o => (
                  <tr key={o.id}>
                    <td><span style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{o.id}</span></td>
                    <td><div className="flex gap8"><PlatformIcon platform={o.platform}/><span>{o.service_name}</span></div></td>
                    <td><a href={o.link} target="_blank" rel="noreferrer" style={{color:"var(--blue)",fontSize:12,maxWidth:120,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.link}</a></td>
                    <td>{o.quantity.toLocaleString()}</td>
                    <td className="text-green">${Number(o.price).toFixed(2)}</td>
                    <td><Badge status={o.status}/></td>
                    <td style={{fontSize:12}}>{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
