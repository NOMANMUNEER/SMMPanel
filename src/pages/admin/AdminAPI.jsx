import React from 'react';

const AdminAPI = () => (
  <div className="panel">
    <div className="panel-head"><span className="panel-title">🔌 API Provider Integration</span></div>
    <div className="panel-body">
      <div className="alert alert-info">Connect third-party SMM providers to auto-fulfill orders.</div>
      {[{name:"Provider 1 (e.g. JustAnotherPanel)",url:"https://justanotherpanel.com/api/v2",key:""},
        {name:"Provider 2 (e.g. SMMKings)",url:"https://smmkings.com/api/v2",key:""},
      ].map((p,i)=>(
        <div key={i} style={{background:"var(--bg2)",border:"1px solid var(--border)",borderRadius:12,padding:20,marginBottom:14}}>
          <div style={{fontWeight:600,marginBottom:12}}>{p.name}</div>
          <div className="grid2">
            <div className="form-group"><label className="form-label">API URL</label><input className="form-input" defaultValue={p.url}/></div>
            <div className="form-group"><label className="form-label">API Key</label><input className="form-input" type="password" placeholder="Enter API key..."/></div>
          </div>
          <div className="flex gap8">
            <button className="btn btn-accent btn-sm">Save & Test</button>
            <button className="btn btn-ghost btn-sm">Sync Services</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AdminAPI;
