import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import StatCard from '../../components/StatCard';
import Badge from '../../components/Badge';
import PlatformIcon from '../../components/PlatformIcon';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [u, o, p] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/orders'),
          api.get('/admin/payments')
        ]);
        setUsers(u.data);
        setOrders(o.data);
        setPayments(p.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div style={{padding: 24}}>Loading...</div>;

  const revenue = orders.filter(o=>o.status==="completed").reduce((s,o)=>s+Number(o.price),0);
  const pending = payments.filter(p=>p.status==="pending").length;
  const monthly = [45,62,38,81,59,94,73,48,67,89,55,78];

  return (
    <>
      <div className="stats-grid">
        <StatCard label="Total Revenue" value={revenue.toFixed(2)} prefix="$" sub="+12% this month" icon="wallet" color="1"/>
        <StatCard label="Total Users" value={users.length} sub="3 active today" icon="users" color="2"/>
        <StatCard label="Total Orders" value={orders.length} sub="2 processing" icon="orders" color="3"/>
        <StatCard label="Pending Deposits" value={pending} sub="Awaiting approval" icon="payment" color="4"/>
      </div>
      <div className="grid2">
        <div className="panel">
          <div className="panel-head"><span className="panel-title">Monthly Revenue</span></div>
          <div className="panel-body">
            <div className="chart-bars">
              {monthly.map((v,i) => (
                <div key={i} className="bar-wrap">
                  <div className="bar" style={{height:`${(v/94)*100}%`,background:"linear-gradient(180deg,var(--green),#059669)"}}/>
                  <span className="bar-label">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="panel">
          <div className="panel-head"><span className="panel-title">Platform Breakdown</span></div>
          <div className="panel-body">
            {[["Instagram","65%","var(--insta)"],["TikTok","18%","#69c9d0"],["YouTube","10%","var(--yt)"],["Facebook","7%","var(--fb)"]].map(([p,pct,c])=>(
              <div key={p} style={{marginBottom:14}}>
                <div className="flex-between mb8" style={{marginBottom:6}}>
                  <span style={{fontSize:13}}>{p}</span>
                  <span style={{fontSize:13,fontWeight:700,color:c}}>{pct}</span>
                </div>
                <div style={{height:6,background:"var(--bg2)",borderRadius:3,overflow:"hidden"}}>
                  <div style={{height:"100%",width:pct,background:c,borderRadius:3}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="panel">
        <div className="panel-head"><span className="panel-title">Recent Orders (All Users)</span></div>
        <div className="panel-body" style={{padding:0}}>
          <div className="table-wrap">
            <table>
              <thead><tr><th>Order ID</th><th>User</th><th>Service</th><th>Qty</th><th>Price</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {orders.slice(0,6).map(o=>(
                  <tr key={o.id}>
                    <td><span style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{o.id}</span></td>
                    <td><div className="flex gap8"><div className="avatar-sm">{o.username?.[0]?.toUpperCase()}</div>{o.username}</div></td>
                    <td><div className="flex gap8"><PlatformIcon platform={o.platform}/>{o.service_name}</div></td>
                    <td>{o.quantity.toLocaleString()}</td>
                    <td className="text-green">${Number(o.price).toFixed(2)}</td>
                    <td><Badge status={o.status}/></td>
                    <td style={{fontSize:12}}>{new Date(o.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
