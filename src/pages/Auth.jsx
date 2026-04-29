import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const Auth = () => {
  const [authTab, setAuthTab] = useState("login");
  const { login } = useContext(AuthContext);
  
  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  
  // Register State
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState("");

  const handleLogin = async (e, demoRole = null) => {
    if (e) e.preventDefault();
    setLoginError("");
    
    let identifier = loginEmail;
    let password = loginPass;

    if (demoRole === 'user') {
      identifier = 'ali@email.com';
      password = 'demo';
    } else if (demoRole === 'admin') {
      identifier = 'admin';
      password = 'admin'; // Based on dummy data
    }

    if (!identifier || !password) {
      setLoginError("Please enter credentials");
      return;
    }

    try {
      const res = await api.post('/auth/login', { identifier, password });
      login(res.data.user, res.data.token);
    } catch (error) {
      setLoginError(error.response?.data?.error || "Login failed");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setRegError("");
    if (!regUsername || !regEmail || !regPass) {
      setRegError("Please fill all fields");
      return;
    }

    try {
      await api.post('/auth/register', { 
        username: regUsername, 
        email: regEmail, 
        password: regPass 
      });
      setRegSuccess(true);
      setTimeout(() => {
        setAuthTab("login");
        setLoginEmail(regEmail);
        setLoginPass("");
        setRegSuccess(false);
      }, 2000);
    } catch (error) {
      setRegError(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <>
      <div className="auth-tabs">
        <button className={`auth-tab ${authTab==="login"?"active":""}`} onClick={()=>{setAuthTab("login"); setRegError(""); setLoginError("")}}>Login</button>
        <button className={`auth-tab ${authTab==="register"?"active":""}`} onClick={()=>{setAuthTab("register"); setRegError(""); setLoginError("")}}>Register</button>
      </div>
      
      {authTab === "login" ? (
        <form onSubmit={handleLogin}>
          {loginError && <div className="alert alert-error">{loginError}</div>}
          <div className="form-group">
            <label className="form-label">Email or Username</label>
            <input className="form-input" value={loginEmail} onChange={e=>{setLoginEmail(e.target.value);setLoginError("");}} placeholder="Enter email or username"/>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={loginPass} onChange={e=>{setLoginPass(e.target.value);setLoginError("");}} placeholder="Enter password"/>
          </div>
          <button type="submit" className="btn-primary">Login →</button>
          <div className="demo-btns">
            <button type="button" className="btn-demo" onClick={()=>handleLogin(null, 'user')}>👤 Demo User</button>
            <button type="button" className="btn-demo" onClick={()=>handleLogin(null, 'admin')}>🔧 Demo Admin</button>
          </div>
          <p style={{textAlign:"center",fontSize:12,color:"var(--text3)",marginTop:16}}>Demo: ali@email.com or click buttons above</p>
        </form>
      ) : (
        <form onSubmit={handleRegister}>
          {regSuccess && <div className="alert alert-success">✓ Account created! Redirecting to login...</div>}
          {regError && <div className="alert alert-error">{regError}</div>}
          <div className="form-group">
            <label className="form-label">Username</label>
            <input className="form-input" value={regUsername} onChange={e=>{setRegUsername(e.target.value); setRegError("");}} placeholder="Choose a username"/>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" type="email" value={regEmail} onChange={e=>{setRegEmail(e.target.value); setRegError("");}} placeholder="Your email address"/>
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className="form-input" type="password" value={regPass} onChange={e=>{setRegPass(e.target.value); setRegError("");}} placeholder="Create a password"/>
          </div>
          <button type="submit" className="btn-primary">Create Account →</button>
        </form>
      )}
    </>
  );
};

export default Auth;
