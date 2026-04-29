import React from 'react';

const AdminSettings = () => (
  <div className="panel">
    <div className="panel-head"><span className="panel-title">⚙️ Panel Settings</span></div>
    <div className="panel-body">
      {[["Panel Name","SMMPanel PK"],["Support Email","support@smmpanel.pk"],["PKR to USD Rate","280"],["Min Deposit (PKR)","200"],["Referral Bonus (%)","5"]].map(([l,v])=>(
        <div className="form-group" key={l}>
          <label className="form-label">{l}</label>
          <input className="form-input" defaultValue={v}/>
        </div>
      ))}
      <button className="btn-primary" style={{maxWidth:200}}>Save Settings →</button>
    </div>
  </div>
);

export default AdminSettings;
