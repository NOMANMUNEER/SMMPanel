import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const AddFunds = () => {
  const { currentUser } = useContext(AuthContext);
  const [method, setMethod] = useState("JazzCash");
  const [amount, setAmount] = useState("500");
  const [txn, setTxn] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const methods = [
    { name: "JazzCash", icon: "📱", color: "#e63946" },
    { name: "Easypaisa", icon: "💚", color: "#06d6a0" },
    { name: "Bank Transfer", icon: "🏦", color: "#4361ee" },
  ];
  
  const accounts = { 
    JazzCash: "0301-1234567", 
    Easypaisa: "0333-9876543", 
    "Bank Transfer": "MCB — PK00MCB0000001234567890" 
  };

  const submit = async () => {
    if (!amount || !txn) return;
    setError("");
    
    try {
      await api.post('/orders/funds', {
        amount: parseFloat(amount),
        method,
        proof: txn
      });
      setSubmitted(true); 
      setTxn(""); 
      setAmount("500");
      setTimeout(() => setSubmitted(false), 4000);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to submit payment");
    }
  };

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">💳 Add Funds</span>
        <span className="balance-chip">${Number(currentUser?.balance || 0).toFixed(2)}</span>
      </div>
      <div className="panel-body">
        {submitted && <div className="alert alert-success">✓ Payment submitted! Admin will verify within 1-2 hours.</div>}
        {error && <div className="alert alert-error">{error}</div>}
        <div className="alert alert-info" style={{marginBottom:20}}>⚠ Send payment first, then submit proof below. Admin will manually approve.</div>
        
        <div style={{marginBottom:20}}>
          <div className="form-label" style={{marginBottom:12}}>Select Payment Method</div>
          <div className="fund-methods">
            {methods.map(m => (
              <div key={m.name} className={`fund-method ${method===m.name?"selected":""}`} onClick={()=>setMethod(m.name)}>
                <div className="fund-method-icon">{m.icon}</div>
                <div className="fund-method-name">{m.name}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="price-calc" style={{marginBottom:20}}>
          <div className="price-row"><span className="text-muted">Send Payment To</span></div>
          <div style={{marginTop:8,fontFamily:"monospace",fontSize:15,color:"var(--accent3)",fontWeight:700}}>{accounts[method]}</div>
          <div style={{fontSize:12,color:"var(--text3)",marginTop:4}}>Account Name: SMMPanel PK</div>
        </div>
        
        <div className="grid2">
          <div className="form-group">
            <label className="form-label">Amount (PKR)</label>
            <input className="form-input" type="number" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="Enter amount"/>
            <div style={{fontSize:11,color:"var(--text3)",marginTop:4}}>Min: PKR 200 | Rate: 1 USD = 280 PKR</div>
          </div>
          <div className="form-group">
            <label className="form-label">Transaction ID / Proof</label>
            <input className="form-input" value={txn} onChange={e=>setTxn(e.target.value)} placeholder="e.g. TXN123456789"/>
          </div>
        </div>
        
        <button className="btn-primary" onClick={submit}>Submit Payment Request →</button>
      </div>
    </div>
  );
};

export default AddFunds;
