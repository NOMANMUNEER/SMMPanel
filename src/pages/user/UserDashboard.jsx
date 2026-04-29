import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import StatCard from '../../components/StatCard';
import PlatformIcon from '../../components/PlatformIcon';
import Badge from '../../components/Badge';

const UserDashboard = () => {
  const { currentUser } = useContext(AuthContext);
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

  if (loading) return <div style={{padding: 24}}>Loading dashboard...</div>;

  const totalSpent = currentUser?.spent || 0;
  const weekly = [12, 19, 8, 24, 14, 31, 22]; // Dummy chart data

  return (
    <>
      <div className="stats-grid">
        <StatCard label="Account Balance" value={Number(currentUser?.balance || 0).toFixed(2)} prefix="$" sub="Available funds" icon="wallet" color="1" />
        <StatCard label="Total Orders" value={orders.length} sub="All time" icon="orders" color="2" />
        <StatCard label="Total Spent" value={Number(totalSpent).toFixed(2)} prefix="$" sub="This account" icon="chart" color="3" />
        <StatCard label="Referral Bonus" value="12.50" prefix="$" sub="From 3 referrals" icon="referral" color="4" />
      </div>
      
      <div className="grid2">
        <div className="panel">
          <div className="panel-head">
            <span className="panel-title">Weekly Orders</span>
            <span className="text-muted" style={{fontSize:12}}>Last 7 days</span>
          </div>
          <div className="panel-body">
            <div className="chart-bars">
              {weekly.map((v,i) => (
                <div key={i} className="bar-wrap">
                  <div className="bar" style={{height:`${(v/31)*100}%`}}/>
                  <span className="bar-label">{["M","T","W","T","F","S","S"][i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="panel">
          <div className="panel-head"><span className="panel-title">Recent Orders</span></div>
          <div className="panel-body" style={{padding:0}}>
            <div className="table-wrap">
              <table>
                <thead><tr><th>Service</th><th>Qty</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.slice(0,4).map(o => (
                    <tr key={o.id}>
                      <td>
                        <div className="flex gap8">
                          <PlatformIcon platform={o.platform}/>
                          <span>{o.service_name?.replace(/Instagram |Facebook |TikTok |YouTube /,"")}</span>
                        </div>
                      </td>
                      <td>{o.quantity.toLocaleString()}</td>
                      <td><Badge status={o.status}/></td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan="3" style={{textAlign: 'center', padding: 20}}>No orders yet</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <div className="panel">
        <div className="panel-head"><span className="panel-title">🔗 API Access</span></div>
        <div className="panel-body">
          <p style={{fontSize:13,color:"var(--text2)",marginBottom:14}}>Use our API to automate orders from your own platform. Your API key:</p>
          <div className="api-box">
            <span className="api-key-text">sk_live_xxxxxxxxxxxx{currentUser?.username}xxxx</span>
            <button className="btn btn-ghost btn-sm">Copy</button>
          </div>
          <p style={{fontSize:12,color:"var(--text3)",marginTop:10}}>Endpoint: <code style={{color:"var(--accent3)"}}>http://localhost:5000/api</code></p>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
