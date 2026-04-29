import React, { useState } from 'react';
import Badge from '../../components/Badge';

const SupportPage = () => {
  const [tickets] = useState([
    { id: "TKT-001", subject: "Payment not credited", status: "open", date: "2025-01-16", messages: 3 },
    { id: "TKT-002", subject: "Order stuck on processing", status: "closed", date: "2025-01-14", messages: 5 },
  ]);
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="grid2">
      <div className="panel">
        <div className="panel-head"><span className="panel-title">🎫 My Tickets</span></div>
        <div className="panel-body">
          <div className="tickets-list">
            {tickets.map(t => (
              <div key={t.id} className="ticket-item">
                <div className="ticket-info">
                  <h4>{t.subject}</h4>
                  <p>{t.id} · {t.date} · {t.messages} messages</p>
                </div>
                <Badge status={t.status}/>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="panel">
        <div className="panel-head"><span className="panel-title">➕ New Ticket</span></div>
        <div className="panel-body">
          {sent && <div className="alert alert-success">✓ Ticket submitted! We'll reply within 24h.</div>}
          <div className="form-group">
            <label className="form-label">Subject</label>
            <input className="form-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Describe your issue briefly"/>
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea className="form-input" rows={4} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Explain your issue in detail..." style={{resize:"vertical"}}/>
          </div>
          <button className="btn-primary" onClick={()=>{if(subject&&msg){setSent(true);setSubject("");setMsg("");setTimeout(()=>setSent(false),3000);}}} >
            Submit Ticket →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
