import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PlatformIcon from '../../components/PlatformIcon';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({
    name:"", platform:"instagram", price:"", min_order:"", max_order:"", 
    category:"", delivery_time:"Instant", quality:"High", smm_provider_id: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get('/orders/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const add = async () => {
    if (!form.name || !form.price) return;
    try {
      await api.post('/admin/services', {
        ...form,
        price: parseFloat(form.price),
        min_order: parseInt(form.min_order) || 100,
        max_order: parseInt(form.max_order) || 10000
      });
      setShowAdd(false);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">⚙️ Service Management</span>
          <button className="btn btn-accent" onClick={()=>setShowAdd(true)}>Add Service</button>
        </div>
        <div className="panel-body" style={{padding:0}}>
          <div className="table-wrap">
            <table>
              <thead><tr><th>#</th><th>Service Name</th><th>Platform</th><th>Price/1K</th><th>Min</th><th>Max</th><th>Quality</th><th>Actions</th></tr></thead>
              <tbody>
                {services.map(s=>(
                  <tr key={s.id}>
                    <td style={{fontFamily:"monospace",fontSize:12,color:"var(--text3)"}}>{s.id}</td>
                    <td style={{fontWeight:500}}>{s.name}</td>
                    <td><div className="flex gap8"><PlatformIcon platform={s.platform}/>{s.platform}</div></td>
                    <td className="text-accent">${Number(s.price).toFixed(2)}</td>
                    <td>{s.min_order.toLocaleString()}</td>
                    <td>{s.max_order.toLocaleString()}</td>
                    <td><span className="badge badge-green">{s.quality}</span></td>
                    <td>
                      <div className="flex gap8">
                        <button className="btn btn-ghost btn-sm">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showAdd && (
        <div className="modal-bg" onClick={()=>setShowAdd(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-title">Add New Service</div>
            <div className="form-group"><label className="form-label">Service Name</label><input className="form-input" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="e.g. Instagram Followers"/></div>
            <div className="grid2">
              <div className="form-group"><label className="form-label">Platform</label><select className="form-select" value={form.platform} onChange={e=>setForm(f=>({...f,platform:e.target.value}))}><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="tiktok">TikTok</option><option value="youtube">YouTube</option></select></div>
              <div className="form-group"><label className="form-label">Category</label><input className="form-input" value={form.category} onChange={e=>setForm(f=>({...f,category:e.target.value}))} placeholder="e.g. Followers"/></div>
              <div className="form-group"><label className="form-label">Price per 1000</label><input className="form-input" type="number" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))} placeholder="0.00"/></div>
              <div className="form-group"><label className="form-label">Min Order</label><input className="form-input" type="number" value={form.min_order} onChange={e=>setForm(f=>({...f,min_order:e.target.value}))} placeholder="100"/></div>
              <div className="form-group"><label className="form-label">Max Order</label><input className="form-input" type="number" value={form.max_order} onChange={e=>setForm(f=>({...f,max_order:e.target.value}))} placeholder="10000"/></div>
              <div className="form-group"><label className="form-label">Delivery Time</label><input className="form-input" value={form.delivery_time} onChange={e=>setForm(f=>({...f,delivery_time:e.target.value}))} placeholder="e.g. Instant"/></div>
              <div className="form-group"><label className="form-label">Provider Service ID</label><input className="form-input" value={form.smm_provider_id} onChange={e=>setForm(f=>({...f,smm_provider_id:e.target.value}))} placeholder="123"/></div>
            </div>
            <div className="flex gap8" style={{marginTop:8}}>
              <button className="btn-primary" style={{flex:1}} onClick={add}>Add Service</button>
              <button className="btn btn-ghost" style={{flex:1}} onClick={()=>setShowAdd(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminServices;
