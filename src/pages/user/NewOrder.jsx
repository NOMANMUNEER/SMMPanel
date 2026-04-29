import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const NewOrder = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [platform, setPlatform] = useState("instagram");
  const [serviceId, setServiceId] = useState("");
  const [link, setLink] = useState("");
  const [qty, setQty] = useState(1000);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const platforms = ["instagram","facebook","tiktok","youtube"];

  useEffect(() => {
    api.get('/orders/services').then(res => {
      setServices(res.data);
    }).catch(err => console.error(err));
  }, []);

  const filtered = services.filter(s => s.platform === platform);
  const selected = services.find(s => s.id === parseInt(serviceId));
  const total = selected ? ((qty / 1000) * parseFloat(selected.price)).toFixed(2) : "0.00";
  const canAfford = selected && parseFloat(currentUser.balance || 0) >= parseFloat(total);

  const placeOrder = async () => {
    if (!selected || !link || !canAfford) return;
    setError("");
    
    try {
      const res = await api.post('/orders', {
        serviceId: selected.id,
        link,
        quantity: qty
      });
      
      setCurrentUser(u => ({...u, balance: parseFloat((u.balance - parseFloat(total)).toFixed(2))}));
      setSuccess(true); 
      setLink(""); 
      setQty(1000); 
      setServiceId("");
      
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to place order");
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">🛒 New Order</span>
        <span className="balance-chip">${Number(currentUser.balance).toFixed(2)}</span>
      </div>
      <div className="panel-body">
        {success && <div className="alert alert-success">✓ Order placed successfully! Check order history for status.</div>}
        {error && <div className="alert alert-error">{error}</div>}
        
        <div className="tabs">
          {platforms.map(p => (
            <button key={p} className={`tab ${platform===p?"active":""}`} onClick={()=>{setPlatform(p);setServiceId("");}}>
              {p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="order-form">
          <div className="form-group">
            <label className="form-label">Select Service</label>
            <select className="form-select" value={serviceId} onChange={e=>setServiceId(e.target.value)}>
              <option value="">-- Choose a service --</option>
              {filtered.map(s => <option key={s.id} value={s.id}>{s.name} — ${s.price}/1K</option>)}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Profile / Post URL</label>
            <input className="form-input" placeholder={`https://${platform}.com/...`} value={link} onChange={e=>setLink(e.target.value)}/>
          </div>
          <div className="form-group">
            <label className="form-label">Quantity {selected && <span className="text-muted">({selected.min_order.toLocaleString()} – {selected.max_order.toLocaleString()})</span>}</label>
            <input className="form-input" type="number" value={qty} min={selected?.min_order||100} max={selected?.max_order||100000} onChange={e=>setQty(parseInt(e.target.value)||0)}/>
          </div>
          {selected && (
            <div>
              <label className="form-label">Service Info</label>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span className="badge badge-blue">⚡ {selected.delivery_time}</span>
                <span className="badge badge-green">✓ {selected.quality} Quality</span>
              </div>
            </div>
          )}
        </div>
        
        {selected && (
          <div className="price-calc">
            <div className="price-row"><span className="text-muted">Rate</span><span>${selected.price} / 1,000</span></div>
            <div className="price-row"><span className="text-muted">Quantity</span><span>{qty.toLocaleString()}</span></div>
            <div className="price-row"><span>Total Cost</span><span className="text-accent">${total}</span></div>
          </div>
        )}
        
        <button className="btn-primary" style={{marginTop:16}} onClick={placeOrder} disabled={!selected||!link||!canAfford}>
          {!canAfford && selected ? "⚠ Insufficient Balance" : "Place Order →"}
        </button>
      </div>
    </div>
  );
};

export default NewOrder;
