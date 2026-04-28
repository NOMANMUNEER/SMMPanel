import { useState, useEffect } from "react";

// ─── ICONS (inline SVG) ───────────────────────────────────────────────────────
const Icon = ({ name, size = 18, color = "currentColor" }) => {
  const icons = {
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    orders: <><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></>,
    wallet: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M16 13a1 1 0 100-2 1 1 0 000 2z"/><path d="M2 10h20"/></>,
    services: <><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></>,
    users: <><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    ticket: <><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 9h20v6H2z"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    instagram: <><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></>,
    facebook: <><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></>,
    youtube: <><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96A29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></>,
    tiktok: <><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></>,
    payment: <><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></>,
    api: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    referral: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></>,
    tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>,
    bell: <><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></>,
    search: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
    menu: <><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></>,
    trending: <><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>,
    copy: <><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  );
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const SERVICES = [
  { id: 1, platform: "instagram", name: "Instagram Followers", price: 0.8, min: 100, max: 50000, category: "Followers", time: "0-1 hour", quality: "High" },
  { id: 2, platform: "instagram", name: "Instagram Likes", price: 0.3, min: 50, max: 100000, category: "Likes", time: "Instant", quality: "Real" },
  { id: 3, platform: "instagram", name: "Instagram Views", price: 0.1, min: 100, max: 1000000, category: "Views", time: "Instant", quality: "High" },
  { id: 4, platform: "facebook", name: "Facebook Page Likes", price: 1.2, min: 100, max: 10000, category: "Likes", time: "1-6 hours", quality: "Real" },
  { id: 5, platform: "facebook", name: "Facebook Post Likes", price: 0.5, min: 50, max: 50000, category: "Likes", time: "Instant", quality: "High" },
  { id: 6, platform: "tiktok", name: "TikTok Followers", price: 0.9, min: 100, max: 50000, category: "Followers", time: "0-2 hours", quality: "Real" },
  { id: 7, platform: "tiktok", name: "TikTok Likes", price: 0.2, min: 100, max: 500000, category: "Likes", time: "Instant", quality: "High" },
  { id: 8, platform: "youtube", name: "YouTube Subscribers", price: 2.5, min: 50, max: 10000, category: "Subscribers", time: "1-12 hours", quality: "Real" },
  { id: 9, platform: "youtube", name: "YouTube Views", price: 0.15, min: 500, max: 5000000, category: "Views", time: "0-30 min", quality: "High" },
  { id: 10, platform: "youtube", name: "YouTube Likes", price: 0.8, min: 50, max: 50000, category: "Likes", time: "Instant", quality: "Real" },
];

const INITIAL_ORDERS = [
  { id: "ORD-001", service: "Instagram Followers", platform: "instagram", link: "https://instagram.com/user1", quantity: 1000, price: 8.00, status: "completed", date: "2025-01-15", user: "ali123" },
  { id: "ORD-002", service: "TikTok Likes", platform: "tiktok", link: "https://tiktok.com/@user2/video/123", quantity: 5000, price: 10.00, status: "processing", date: "2025-01-16", user: "sara_pk" },
  { id: "ORD-003", service: "YouTube Views", platform: "youtube", link: "https://youtube.com/watch?v=abc", quantity: 10000, price: 15.00, status: "pending", date: "2025-01-17", user: "ahmed_m" },
  { id: "ORD-004", service: "Facebook Page Likes", platform: "facebook", link: "https://facebook.com/page1", quantity: 500, price: 6.00, status: "completed", date: "2025-01-14", user: "ali123" },
];

const INITIAL_USERS = [
  { id: 1, username: "ali123", email: "ali@email.com", balance: 45.50, orders: 12, spent: 89.20, status: "active", joined: "2025-01-01", referral: "REF001" },
  { id: 2, username: "sara_pk", email: "sara@email.com", balance: 120.00, orders: 28, spent: 234.50, status: "active", joined: "2025-01-05", referral: "REF002" },
  { id: 3, username: "ahmed_m", email: "ahmed@email.com", balance: 5.00, orders: 3, spent: 15.00, status: "suspended", joined: "2025-01-10", referral: "REF003" },
  { id: 4, username: "zara.official", email: "zara@email.com", balance: 300.00, orders: 45, spent: 678.00, status: "active", joined: "2024-12-20", referral: "REF004" },
];

const PAYMENTS = [
  { id: "PAY-001", user: "ali123", method: "JazzCash", amount: 50.00, status: "pending", date: "2025-01-17", proof: "TXN123456" },
  { id: "PAY-002", user: "sara_pk", method: "Easypaisa", amount: 150.00, status: "approved", date: "2025-01-16", proof: "TXN789012" },
  { id: "PAY-003", user: "ahmed_m", method: "Bank Transfer", amount: 20.00, status: "rejected", date: "2025-01-15", proof: "TXN345678" },
  { id: "PAY-004", user: "zara.official", method: "JazzCash", amount: 300.00, status: "approved", date: "2025-01-14", proof: "TXN901234" },
];

// ─── STYLES ───────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap');
  
  :root {
    --bg: #0a0a0f;
    --bg2: #0f0f1a;
    --bg3: #13131f;
    --card: #161624;
    --card2: #1c1c2e;
    --border: #ffffff0f;
    --border2: #ffffff18;
    --accent: #7c3aed;
    --accent2: #a855f7;
    --accent3: #c084fc;
    --gold: #f59e0b;
    --green: #10b981;
    --red: #ef4444;
    --blue: #3b82f6;
    --pink: #ec4899;
    --orange: #f97316;
    --text: #f1f0ff;
    --text2: #a09ec0;
    --text3: #6b6980;
    --insta: #e1306c;
    --fb: #1877f2;
    --yt: #ff0000;
    --tt: #010101;
    --radius: 14px;
    --shadow: 0 4px 24px rgba(0,0,0,0.4);
  }
  
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: var(--bg); color: var(--text); }
  
  .smm-root { min-height: 100vh; background: var(--bg); }
  
  /* AUTH */
  .auth-bg {
    min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: radial-gradient(ellipse at 20% 50%, #7c3aed18 0%, transparent 60%), 
                radial-gradient(ellipse at 80% 20%, #a855f715 0%, transparent 50%),
                var(--bg);
    padding: 20px;
  }
  .auth-card {
    background: var(--card); border: 1px solid var(--border2); border-radius: 24px;
    padding: 48px 40px; width: 100%; max-width: 440px; box-shadow: var(--shadow);
    position: relative; overflow: hidden;
  }
  .auth-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent), var(--accent2), transparent);
  }
  .auth-logo { text-align: center; margin-bottom: 32px; }
  .auth-logo h1 { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; }
  .auth-logo h1 span { background: linear-gradient(135deg, var(--accent2), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .auth-logo p { color: var(--text2); font-size: 14px; margin-top: 6px; }
  .auth-tabs { display: flex; gap: 4px; background: var(--bg2); border-radius: 12px; padding: 4px; margin-bottom: 28px; }
  .auth-tab { flex: 1; padding: 10px; border: none; background: none; color: var(--text2); cursor: pointer; border-radius: 10px; font-size: 14px; font-family: 'DM Sans', sans-serif; font-weight: 500; transition: all .2s; }
  .auth-tab.active { background: var(--accent); color: white; }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 500; color: var(--text2); margin-bottom: 8px; }
  .form-input { width: 100%; padding: 12px 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; transition: border .2s; }
  .form-input:focus { border-color: var(--accent); }
  .form-select { width: 100%; padding: 12px 16px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; color: var(--text); font-size: 14px; font-family: 'DM Sans', sans-serif; outline: none; appearance: none; cursor: pointer; }
  .btn-primary { width: 100%; padding: 13px; background: linear-gradient(135deg, var(--accent), var(--accent2)); border: none; border-radius: 10px; color: white; font-size: 15px; font-weight: 600; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: opacity .2s, transform .1s; }
  .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
  .demo-btns { display: flex; gap: 8px; margin-top: 16px; }
  .btn-demo { flex: 1; padding: 10px; background: var(--bg2); border: 1px solid var(--border2); border-radius: 10px; color: var(--text2); font-size: 12px; font-family: 'DM Sans', sans-serif; cursor: pointer; transition: all .2s; }
  .btn-demo:hover { border-color: var(--accent); color: var(--accent3); }
  
  /* LAYOUT */
  .layout { display: flex; min-height: 100vh; }
  .sidebar { width: 260px; background: var(--card); border-right: 1px solid var(--border); display: flex; flex-direction: column; position: fixed; height: 100vh; left: 0; top: 0; z-index: 100; overflow-y: auto; transition: transform .3s; }
  .sidebar.closed { transform: translateX(-260px); }
  .sidebar-logo { padding: 24px 20px; border-bottom: 1px solid var(--border); }
  .sidebar-logo h2 { font-family: 'Syne', sans-serif; font-size: 22px; font-weight: 800; }
  .sidebar-logo h2 span { background: linear-gradient(135deg, var(--accent2), var(--accent3)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .sidebar-logo p { font-size: 11px; color: var(--text3); margin-top: 2px; text-transform: uppercase; letter-spacing: 1px; }
  .sidebar-nav { flex: 1; padding: 16px 12px; }
  .nav-section { margin-bottom: 8px; }
  .nav-label { font-size: 10px; color: var(--text3); text-transform: uppercase; letter-spacing: 1.5px; padding: 8px 12px 6px; font-weight: 600; }
  .nav-item { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 10px; cursor: pointer; transition: all .2s; color: var(--text2); font-size: 14px; font-weight: 500; border: 1px solid transparent; margin-bottom: 2px; }
  .nav-item:hover { background: var(--bg2); color: var(--text); }
  .nav-item.active { background: linear-gradient(135deg, #7c3aed20, #a855f718); color: var(--accent3); border-color: #7c3aed30; }
  .nav-item.active svg { stroke: var(--accent3); }
  .sidebar-user { padding: 16px; border-top: 1px solid var(--border); }
  .sidebar-user-info { display: flex; align-items: center; gap: 10px; padding: 10px; background: var(--bg2); border-radius: 10px; }
  .avatar { width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px; flex-shrink: 0; }
  .avatar-sm { width: 32px; height: 32px; border-radius: 50%; background: linear-gradient(135deg, var(--accent), var(--accent2)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px; }
  .user-name { font-size: 13px; font-weight: 600; }
  .user-role { font-size: 11px; color: var(--text3); }
  
  /* MAIN */
  .main { flex: 1; margin-left: 260px; min-height: 100vh; transition: margin .3s; }
  .main.full { margin-left: 0; }
  .topbar { height: 64px; background: var(--card); border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; padding: 0 24px; position: sticky; top: 0; z-index: 50; }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .hamburger { background: none; border: none; color: var(--text2); cursor: pointer; padding: 8px; border-radius: 8px; display: flex; align-items: center; }
  .topbar-title { font-family: 'Syne', sans-serif; font-size: 20px; font-weight: 700; }
  .topbar-right { display: flex; align-items: center; gap: 12px; }
  .btn-notif { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 9px; cursor: pointer; color: var(--text2); position: relative; transition: all .2s; }
  .btn-notif:hover { border-color: var(--accent); }
  .notif-dot { position: absolute; top: 6px; right: 6px; width: 7px; height: 7px; background: var(--red); border-radius: 50%; border: 2px solid var(--card); }
  .balance-chip { background: linear-gradient(135deg, #7c3aed20, #a855f715); border: 1px solid #7c3aed40; border-radius: 10px; padding: 8px 14px; font-size: 13px; font-weight: 600; color: var(--accent3); }
  .content { padding: 24px; }
  
  /* CARDS */
  .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin-bottom: 24px; }
  .stat-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); padding: 20px 22px; position: relative; overflow: hidden; transition: border .2s; }
  .stat-card:hover { border-color: var(--border2); }
  .stat-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px; }
  .stat-card.c1::after { background: linear-gradient(90deg, var(--accent), var(--accent2)); }
  .stat-card.c2::after { background: linear-gradient(90deg, var(--green), #34d399); }
  .stat-card.c3::after { background: linear-gradient(90deg, var(--blue), #60a5fa); }
  .stat-card.c4::after { background: linear-gradient(90deg, var(--gold), #fbbf24); }
  .stat-label { font-size: 12px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; font-weight: 600; }
  .stat-value { font-family: 'Syne', sans-serif; font-size: 28px; font-weight: 800; line-height: 1; }
  .stat-sub { font-size: 12px; color: var(--text2); margin-top: 6px; }
  .stat-icon { position: absolute; right: 18px; top: 18px; opacity: 0.15; }
  
  /* PANEL */
  .panel { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius); overflow: hidden; margin-bottom: 20px; }
  .panel-head { padding: 18px 22px; border-bottom: 1px solid var(--border); display: flex; align-items: center; justify-content: space-between; }
  .panel-title { font-family: 'Syne', sans-serif; font-size: 16px; font-weight: 700; }
  .panel-body { padding: 20px 22px; }
  
  /* TABLE */
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { padding: 10px 14px; text-align: left; font-size: 11px; color: var(--text3); text-transform: uppercase; letter-spacing: 1px; background: var(--bg2); border-bottom: 1px solid var(--border); font-weight: 600; }
  td { padding: 13px 14px; border-bottom: 1px solid var(--border); font-size: 13px; color: var(--text2); }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: var(--bg2); color: var(--text); }
  
  /* BADGES */
  .badge { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
  .badge-green { background: #10b98120; color: var(--green); }
  .badge-yellow { background: #f59e0b20; color: var(--gold); }
  .badge-red { background: #ef444420; color: var(--red); }
  .badge-blue { background: #3b82f620; color: var(--blue); }
  .badge-purple { background: #7c3aed20; color: var(--accent3); }
  
  /* PLATFORM */
  .platform-icon { width: 28px; height: 28px; border-radius: 8px; display: flex; align-items: center; justify-content: center; }
  .platform-instagram { background: linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); }
  .platform-facebook { background: #1877f2; }
  .platform-youtube { background: #ff0000; }
  .platform-tiktok { background: #010101; border: 1px solid #333; }
  
  /* ORDER FORM */
  .order-form { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 768px) { .order-form { grid-template-columns: 1fr; } }
  .price-calc { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 16px; margin-top: 16px; }
  .price-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; }
  .price-row:last-child { margin-bottom: 0; padding-top: 10px; border-top: 1px solid var(--border); font-weight: 700; font-size: 15px; color: var(--text); }
  
  /* FUND */
  .fund-methods { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 20px; }
  .fund-method { padding: 16px; background: var(--bg2); border: 2px solid var(--border); border-radius: 12px; cursor: pointer; text-align: center; transition: all .2s; }
  .fund-method:hover { border-color: var(--accent); }
  .fund-method.selected { border-color: var(--accent); background: #7c3aed15; }
  .fund-method-name { font-size: 13px; font-weight: 600; margin-top: 8px; }
  .fund-method-icon { font-size: 22px; }
  
  /* ACTIONS */
  .btn { display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: 1px solid transparent; transition: all .2s; font-family: 'DM Sans', sans-serif; }
  .btn-sm { padding: 5px 10px; font-size: 12px; border-radius: 6px; }
  .btn-accent { background: var(--accent); color: white; }
  .btn-accent:hover { background: var(--accent2); }
  .btn-green { background: #10b98120; color: var(--green); border-color: #10b98130; }
  .btn-green:hover { background: #10b98130; }
  .btn-red { background: #ef444420; color: var(--red); border-color: #ef444430; }
  .btn-red:hover { background: #ef444430; }
  .btn-ghost { background: var(--bg2); color: var(--text2); border-color: var(--border2); }
  .btn-ghost:hover { color: var(--text); border-color: var(--accent3); }
  .btn-outline { background: transparent; color: var(--accent3); border-color: #7c3aed50; }
  .btn-outline:hover { background: #7c3aed15; }
  
  /* GRID */
  .grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  @media (max-width: 900px) { .grid2 { grid-template-columns: 1fr; } }
  
  /* SERVICE CARDS */
  .service-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 14px; }
  .service-card { background: var(--card2); border: 1px solid var(--border); border-radius: 12px; padding: 16px; transition: all .2s; cursor: pointer; }
  .service-card:hover { border-color: var(--accent); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(124,58,237,0.15); }
  .service-card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .service-card-body { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .service-meta { font-size: 11px; color: var(--text3); }
  .service-meta-val { font-size: 13px; font-weight: 600; color: var(--text); }
  
  /* TABS */
  .tabs { display: flex; gap: 4px; background: var(--bg2); border-radius: 10px; padding: 4px; margin-bottom: 20px; overflow-x: auto; }
  .tab { padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 13px; font-weight: 500; color: var(--text2); border: none; background: none; font-family: 'DM Sans', sans-serif; white-space: nowrap; transition: all .2s; }
  .tab.active { background: var(--accent); color: white; }
  
  /* MODAL */
  .modal-bg { position: fixed; inset: 0; background: rgba(0,0,0,0.7); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 20px; }
  .modal { background: var(--card); border: 1px solid var(--border2); border-radius: 20px; padding: 28px; width: 100%; max-width: 500px; position: relative; max-height: 90vh; overflow-y: auto; }
  .modal-title { font-family: 'Syne', sans-serif; font-size: 18px; font-weight: 700; margin-bottom: 20px; }
  
  /* API KEY */
  .api-box { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .api-key-text { font-family: monospace; font-size: 13px; color: var(--accent3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  
  /* CHART BARS */
  .chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 120px; padding-top: 10px; }
  .bar-wrap { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
  .bar { width: 100%; border-radius: 4px 4px 0 0; background: linear-gradient(180deg, var(--accent2), var(--accent)); min-height: 4px; transition: height .3s; }
  .bar-label { font-size: 10px; color: var(--text3); }
  
  /* TICKET */
  .ticket-status { display: flex; align-items: center; gap: 8px; }
  .tickets-list { display: flex; flex-direction: column; gap: 10px; }
  .ticket-item { background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
  .ticket-info h4 { font-size: 14px; font-weight: 500; }
  .ticket-info p { font-size: 12px; color: var(--text3); margin-top: 3px; }
  
  /* ALERT */
  .alert { padding: 12px 16px; border-radius: 10px; font-size: 13px; margin-bottom: 16px; }
  .alert-success { background: #10b98115; border: 1px solid #10b98130; color: var(--green); }
  .alert-error { background: #ef444415; border: 1px solid #ef444430; color: var(--red); }
  .alert-info { background: #7c3aed15; border: 1px solid #7c3aed30; color: var(--accent3); }
  
  /* RESPONSIVE */
  @media (max-width: 768px) {
    .sidebar { transform: translateX(-260px); }
    .sidebar.open { transform: translateX(0); }
    .main { margin-left: 0; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); }
    .fund-methods { grid-template-columns: 1fr 1fr; }
    .content { padding: 16px; }
  }
  
  /* SCROLLBAR */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--border2); border-radius: 3px; }
  
  /* MISC */
  .text-accent { color: var(--accent3); }
  .text-green { color: var(--green); }
  .text-red { color: var(--red); }
  .text-gold { color: var(--gold); }
  .text-muted { color: var(--text3); }
  .fw-700 { font-weight: 700; }
  .mt8 { margin-top: 8px; }
  .mb16 { margin-bottom: 16px; }
  .flex { display: flex; align-items: center; }
  .flex-between { display: flex; align-items: center; justify-content: space-between; }
  .gap8 { gap: 8px; }
  .gap12 { gap: 12px; }
  .w100 { width: 100%; }
  .divider { height: 1px; background: var(--border); margin: 16px 0; }
  .search-bar { display: flex; align-items: center; gap: 10px; background: var(--bg2); border: 1px solid var(--border); border-radius: 10px; padding: 9px 14px; }
  .search-bar input { background: none; border: none; outline: none; color: var(--text); font-size: 13px; font-family: 'DM Sans', sans-serif; flex: 1; }
  .input-row { display: flex; gap: 10px; }
  .floating-overlay { position: fixed; inset: 0; z-index: 99; }
`;

// ─── COMPONENTS ───────────────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const map = { completed: ["green","✓"], processing: ["blue","↻"], pending: ["yellow","◷"], cancelled: ["red","✕"], approved: ["green","✓"], rejected: ["red","✕"], active: ["green","●"], suspended: ["red","●"], open: ["blue","○"], closed: ["green","✓"] };
  const [cl, ic] = map[status] || ["purple", "?"];
  return <span className={`badge badge-${cl}`}>{ic} {status}</span>;
};

const PlatformIcon = ({ platform }) => (
  <div className={`platform-icon platform-${platform}`}>
    <Icon name={platform} size={14} color="white" />
  </div>
);

const StatCard = ({ label, value, sub, icon, color, prefix = "" }) => (
  <div className={`stat-card c${color}`}>
    <div className="stat-label">{label}</div>
    <div className="stat-value">{prefix}{value}</div>
    {sub && <div className="stat-sub">{sub}</div>}
    <div className="stat-icon"><Icon name={icon} size={48} /></div>
  </div>
);

// ─── PAGES ────────────────────────────────────────────────────────────────────
const UserDashboard = ({ user, orders }) => {
  const myOrders = orders.filter(o => o.user === user.username);
  const totalSpent = myOrders.reduce((s, o) => s + o.price, 0);
  const weekly = [12, 19, 8, 24, 14, 31, 22];
  return (
    <>
      <div className="stats-grid">
        <StatCard label="Account Balance" value={user.balance.toFixed(2)} prefix="$" sub="Available funds" icon="wallet" color="1" />
        <StatCard label="Total Orders" value={myOrders.length} sub="All time" icon="orders" color="2" />
        <StatCard label="Total Spent" value={totalSpent.toFixed(2)} prefix="$" sub="This account" icon="chart" color="3" />
        <StatCard label="Referral Bonus" value="12.50" prefix="$" sub="From 3 referrals" icon="referral" color="4" />
      </div>
      <div className="grid2">
        <div className="panel">
          <div className="panel-head"><span className="panel-title">Weekly Orders</span><span className="text-muted" style={{fontSize:12}}>Last 7 days</span></div>
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
                  {myOrders.slice(0,4).map(o => (
                    <tr key={o.id}>
                      <td><div className="flex gap8"><PlatformIcon platform={o.platform}/><span>{o.service.replace(/Instagram |Facebook |TikTok |YouTube /,"")}</span></div></td>
                      <td>{o.quantity.toLocaleString()}</td>
                      <td><Badge status={o.status}/></td>
                    </tr>
                  ))}
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
            <span className="api-key-text">sk_live_xxxxxxxxxxxx{user.username}xxxx</span>
            <button className="btn btn-ghost btn-sm"><Icon name="copy" size={13}/>Copy</button>
          </div>
          <p style={{fontSize:12,color:"var(--text3)",marginTop:10}}>Endpoint: <code style={{color:"var(--accent3)"}}>https://api.smmpanel.pk/v1</code></p>
        </div>
      </div>
    </>
  );
};

const NewOrder = ({ user, setUser, services, setOrders }) => {
  const [platform, setPlatform] = useState("instagram");
  const [serviceId, setServiceId] = useState("");
  const [link, setLink] = useState("");
  const [qty, setQty] = useState(1000);
  const [success, setSuccess] = useState(false);
  const platforms = ["instagram","facebook","tiktok","youtube"];
  const filtered = services.filter(s => s.platform === platform);
  const selected = services.find(s => s.id === parseInt(serviceId));
  const total = selected ? ((qty / 1000) * selected.price).toFixed(2) : "0.00";
  const canAfford = selected && user.balance >= parseFloat(total);

  const placeOrder = () => {
    if (!selected || !link || !canAfford) return;
    const newOrder = { id: `ORD-${Date.now()}`, service: selected.name, platform, link, quantity: qty, price: parseFloat(total), status: "pending", date: new Date().toISOString().split("T")[0], user: user.username };
    setOrders(prev => [newOrder, ...prev]);
    setUser(u => ({...u, balance: parseFloat((u.balance - parseFloat(total)).toFixed(2))}));
    setSuccess(true); setLink(""); setQty(1000); setServiceId("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">🛒 New Order</span><span className="balance-chip">${user.balance.toFixed(2)}</span></div>
      <div className="panel-body">
        {success && <div className="alert alert-success">✓ Order placed successfully! Check order history for status.</div>}
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
            <label className="form-label">Quantity {selected && <span className="text-muted">({selected.min.toLocaleString()} – {selected.max.toLocaleString()})</span>}</label>
            <input className="form-input" type="number" value={qty} min={selected?.min||100} max={selected?.max||100000} onChange={e=>setQty(parseInt(e.target.value)||0)}/>
          </div>
          {selected && (
            <div>
              <label className="form-label">Service Info</label>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span className="badge badge-blue">⚡ {selected.time}</span>
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

const OrderHistory = ({ orders, user }) => {
  const [filter, setFilter] = useState("all");
  const myOrders = orders.filter(o => o.user === user.username);
  const filtered = filter === "all" ? myOrders : myOrders.filter(o => o.status === filter);
  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">📋 Order History</span><span className="text-muted" style={{fontSize:12}}>{myOrders.length} total</span></div>
      <div className="panel-body">
        <div className="tabs">
          {["all","completed","processing","pending"].map(s => (
            <button key={s} className={`tab ${filter===s?"active":""}`} onClick={()=>setFilter(s)}>{s.charAt(0).toUpperCase()+s.slice(1)}</button>
          ))}
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>Service</th><th>Link</th><th>Qty</th><th>Price</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{textAlign:"center",color:"var(--text3)",padding:"32px"}}>No orders found</td></tr>
              ) : filtered.map(o => (
                <tr key={o.id}>
                  <td><span style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{o.id}</span></td>
                  <td><div className="flex gap8"><PlatformIcon platform={o.platform}/><span>{o.service}</span></div></td>
                  <td><a href="#" style={{color:"var(--blue)",fontSize:12,maxWidth:120,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.link}</a></td>
                  <td>{o.quantity.toLocaleString()}</td>
                  <td className="text-green">${o.price.toFixed(2)}</td>
                  <td><Badge status={o.status}/></td>
                  <td style={{fontSize:12}}>{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AddFunds = ({ user, setUser, setPayments }) => {
  const [method, setMethod] = useState("JazzCash");
  const [amount, setAmount] = useState("500");
  const [txn, setTxn] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const methods = [
    { name: "JazzCash", icon: "📱", color: "#e63946" },
    { name: "Easypaisa", icon: "💚", color: "#06d6a0" },
    { name: "Bank Transfer", icon: "🏦", color: "#4361ee" },
  ];
  const submit = () => {
    if (!amount || !txn) return;
    setPayments(prev => [{id:`PAY-${Date.now()}`,user:user.username,method,amount:parseFloat(amount),status:"pending",date:new Date().toISOString().split("T")[0],proof:txn},...prev]);
    setSubmitted(true); setTxn(""); setAmount("500");
    setTimeout(() => setSubmitted(false), 4000);
  };
  const accounts = { JazzCash: "0301-1234567", Easypaisa: "0333-9876543", "Bank Transfer": "MCB — PK00MCB0000001234567890" };
  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">💳 Add Funds</span><span className="balance-chip">${user.balance.toFixed(2)}</span></div>
      <div className="panel-body">
        {submitted && <div className="alert alert-success">✓ Payment submitted! Admin will verify within 1-2 hours.</div>}
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

const ServicesPage = ({ services }) => {
  const [platform, setPlatform] = useState("all");
  const filtered = platform === "all" ? services : services.filter(s => s.platform === platform);
  return (
    <>
      <div className="panel" style={{marginBottom:20}}>
        <div className="panel-body">
          <div className="tabs">
            {["all","instagram","facebook","tiktok","youtube"].map(p => (
              <button key={p} className={`tab ${platform===p?"active":""}`} onClick={()=>setPlatform(p)}>
                {p==="all"?"All Platforms":p.charAt(0).toUpperCase()+p.slice(1)}
              </button>
            ))}
          </div>
          <div className="service-grid">
            {filtered.map(s => (
              <div key={s.id} className="service-card">
                <div className="service-card-head">
                  <PlatformIcon platform={s.platform}/>
                  <div>
                    <div style={{fontSize:14,fontWeight:600}}>{s.name}</div>
                    <div style={{fontSize:11,color:"var(--text3)"}}>{s.category}</div>
                  </div>
                  <div style={{marginLeft:"auto",fontSize:15,fontWeight:800,color:"var(--accent3)"}}>${s.price}<span style={{fontSize:10,fontWeight:400,color:"var(--text3)"}}>/1K</span></div>
                </div>
                <div className="service-card-body">
                  <div><div className="service-meta">Min Order</div><div className="service-meta-val">{s.min.toLocaleString()}</div></div>
                  <div><div className="service-meta">Max Order</div><div className="service-meta-val">{s.max.toLocaleString()}</div></div>
                  <div><div className="service-meta">Delivery</div><div className="service-meta-val">{s.time}</div></div>
                  <div><div className="service-meta">Quality</div><div className="service-meta-val">{s.quality}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SupportPage = ({ user }) => {
  const [tickets] = useState([
    { id: "TKT-001", subject: "Payment not credited", status: "open", date: "2025-01-16", messages: 3 },
    { id: "TKT-002", subject: "Order stuck on processing", status: "closed", date: "2025-01-14", messages: 5 },
  ]);
  const [subject, setSubject] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <>
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
            <div className="form-group"><label className="form-label">Subject</label><input className="form-input" value={subject} onChange={e=>setSubject(e.target.value)} placeholder="Describe your issue briefly"/></div>
            <div className="form-group"><label className="form-label">Message</label><textarea className="form-input" rows={4} value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Explain your issue in detail..." style={{resize:"vertical"}}/></div>
            <button className="btn-primary" onClick={()=>{if(subject&&msg){setSent(true);setSubject("");setMsg("");setTimeout(()=>setSent(false),3000);}}} >Submit Ticket →</button>
          </div>
        </div>
      </div>
    </>
  );
};

// ADMIN PAGES
const AdminDashboard = ({ users, orders, payments }) => {
  const revenue = orders.filter(o=>o.status==="completed").reduce((s,o)=>s+o.price,0);
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
                    <td><div className="flex gap8"><div className="avatar-sm">{o.user[0].toUpperCase()}</div>{o.user}</div></td>
                    <td><div className="flex gap8"><PlatformIcon platform={o.platform}/>{o.service}</div></td>
                    <td>{o.quantity.toLocaleString()}</td>
                    <td className="text-green">${o.price.toFixed(2)}</td>
                    <td><Badge status={o.status}/></td>
                    <td style={{fontSize:12}}>{o.date}</td>
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

const AdminUsers = ({ users, setUsers }) => {
  const toggle = (id) => setUsers(prev => prev.map(u => u.id===id ? {...u, status: u.status==="active"?"suspended":"active"} : u));
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">👥 User Management</span>
        <div className="search-bar" style={{width:220}}>
          <Icon name="search" size={14} color="var(--text3)"/>
          <input placeholder="Search users..."/>
        </div>
      </div>
      <div className="panel-body" style={{padding:0}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>User</th><th>Balance</th><th>Orders</th><th>Total Spent</th><th>Status</th><th>Joined</th><th>Actions</th></tr></thead>
            <tbody>
              {users.map(u=>(
                <tr key={u.id}>
                  <td><div className="flex gap8"><div className="avatar-sm">{u.username[0].toUpperCase()}</div><div><div style={{fontSize:13,fontWeight:500}}>{u.username}</div><div style={{fontSize:11,color:"var(--text3)"}}>{u.email}</div></div></div></td>
                  <td className="text-green">${u.balance.toFixed(2)}</td>
                  <td>{u.orders}</td>
                  <td>${u.spent.toFixed(2)}</td>
                  <td><Badge status={u.status}/></td>
                  <td style={{fontSize:12}}>{u.joined}</td>
                  <td>
                    <div className="flex gap8">
                      <button className={`btn btn-sm ${u.status==="active"?"btn-red":"btn-green"}`} onClick={()=>toggle(u.id)}>
                        {u.status==="active"?"Suspend":"Activate"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminServices = ({ services, setServices }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({name:"",platform:"instagram",price:"",min:"",max:"",category:"",time:"Instant",quality:"High"});
  const add = () => {
    if (!form.name||!form.price) return;
    setServices(prev=>[...prev,{...form,id:Date.now(),price:parseFloat(form.price),min:parseInt(form.min)||100,max:parseInt(form.max)||10000}]);
    setShowAdd(false); setForm({name:"",platform:"instagram",price:"",min:"",max:"",category:"",time:"Instant",quality:"High"});
  };
  return (
    <>
      <div className="panel">
        <div className="panel-head">
          <span className="panel-title">⚙️ Service Management</span>
          <button className="btn btn-accent" onClick={()=>setShowAdd(true)}><Icon name="plus" size={14}/>Add Service</button>
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
                    <td className="text-accent">${s.price}</td>
                    <td>{s.min.toLocaleString()}</td>
                    <td>{s.max.toLocaleString()}</td>
                    <td><span className="badge badge-green">{s.quality}</span></td>
                    <td>
                      <div className="flex gap8">
                        <button className="btn btn-ghost btn-sm">Edit</button>
                        <button className="btn btn-red btn-sm" onClick={()=>setServices(prev=>prev.filter(x=>x.id!==s.id))}>Delete</button>
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
              <div className="form-group"><label className="form-label">Min Order</label><input className="form-input" type="number" value={form.min} onChange={e=>setForm(f=>({...f,min:e.target.value}))} placeholder="100"/></div>
              <div className="form-group"><label className="form-label">Max Order</label><input className="form-input" type="number" value={form.max} onChange={e=>setForm(f=>({...f,max:e.target.value}))} placeholder="10000"/></div>
              <div className="form-group"><label className="form-label">Delivery Time</label><input className="form-input" value={form.time} onChange={e=>setForm(f=>({...f,time:e.target.value}))} placeholder="e.g. Instant"/></div>
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

const AdminPayments = ({ payments, setPayments, users, setUsers }) => {
  const approve = (id) => {
    const pay = payments.find(p=>p.id===id);
    if (!pay) return;
    setPayments(prev=>prev.map(p=>p.id===id?{...p,status:"approved"}:p));
    setUsers(prev=>prev.map(u=>u.username===pay.user?{...u,balance:parseFloat((u.balance+(pay.amount/280)).toFixed(2))}:u));
  };
  const reject = (id) => setPayments(prev=>prev.map(p=>p.id===id?{...p,status:"rejected"}:p));
  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">💰 Payment Management</span></div>
      <div className="panel-body" style={{padding:0}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Pay ID</th><th>User</th><th>Method</th><th>Amount (PKR)</th><th>USD Equiv</th><th>Proof/TXN</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
            <tbody>
              {payments.map(p=>(
                <tr key={p.id}>
                  <td style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{p.id}</td>
                  <td>{p.user}</td>
                  <td>{p.method}</td>
                  <td className="text-gold">PKR {p.amount.toFixed(0)}</td>
                  <td className="text-green">${(p.amount/280).toFixed(2)}</td>
                  <td style={{fontFamily:"monospace",fontSize:12}}>{p.proof}</td>
                  <td><Badge status={p.status}/></td>
                  <td style={{fontSize:12}}>{p.date}</td>
                  <td>
                    {p.status==="pending" && (
                      <div className="flex gap8">
                        <button className="btn btn-green btn-sm" onClick={()=>approve(p.id)}>✓ Approve</button>
                        <button className="btn btn-red btn-sm" onClick={()=>reject(p.id)}>✕ Reject</button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const AdminOrders = ({ orders, setOrders }) => {
  const update = (id, status) => setOrders(prev => prev.map(o=>o.id===id?{...o,status}:o));
  return (
    <div className="panel">
      <div className="panel-head"><span className="panel-title">📦 Order Management</span></div>
      <div className="panel-body" style={{padding:0}}>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Order ID</th><th>User</th><th>Service</th><th>Link</th><th>Qty</th><th>Price</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {orders.map(o=>(
                <tr key={o.id}>
                  <td style={{fontFamily:"monospace",fontSize:12,color:"var(--accent3)"}}>{o.id}</td>
                  <td>{o.user}</td>
                  <td><div className="flex gap8"><PlatformIcon platform={o.platform}/><span style={{fontSize:12}}>{o.service}</span></div></td>
                  <td><a href="#" style={{color:"var(--blue)",fontSize:11,maxWidth:100,display:"block",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{o.link}</a></td>
                  <td>{o.quantity.toLocaleString()}</td>
                  <td className="text-green">${o.price.toFixed(2)}</td>
                  <td><Badge status={o.status}/></td>
                  <td>
                    <div className="flex gap8">
                      {o.status!=="completed" && <button className="btn btn-green btn-sm" onClick={()=>update(o.id,"completed")}>Complete</button>}
                      {o.status==="pending" && <button className="btn btn-blue btn-sm" style={{background:"#3b82f620",color:"var(--blue)",borderColor:"#3b82f630"}} onClick={()=>update(o.id,"processing")}>Process</button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

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

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function SMMPanel() {
  const [page, setPage] = useState("auth");
  const [authTab, setAuthTab] = useState("login");
  const [role, setRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState("dashboard");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginError, setLoginError] = useState("");
  const [regUsername, setRegUsername] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPass, setRegPass] = useState("");
  const [regSuccess, setRegSuccess] = useState(false);

  const [users, setUsers] = useState(INITIAL_USERS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [payments, setPayments] = useState(PAYMENTS);
  const [services, setServices] = useState(SERVICES);

  const login = (asAdmin = false) => {
    if (asAdmin) {
      setRole("admin"); setCurrentUser({username:"Admin",email:"admin@smm.pk",balance:0}); setPage("app"); setActiveNav("dashboard"); return;
    }
    const found = users.find(u => u.email === loginEmail || u.username === loginEmail);
    if (!found) { setLoginError("User not found. Try demo credentials below."); return; }
    if (found.status === "suspended") { setLoginError("Account suspended. Contact support."); return; }
    setRole("user"); setCurrentUser(found); setPage("app"); setActiveNav("dashboard");
  };

  const register = () => {
    if (!regUsername || !regEmail || !regPass) return;
    const newUser = {id:Date.now(),username:regUsername,email:regEmail,balance:0,orders:0,spent:0,status:"active",joined:new Date().toISOString().split("T")[0],referral:`REF${Date.now()}`};
    setUsers(prev=>[...prev,newUser]);
    setRegSuccess(true);
    setTimeout(()=>{setAuthTab("login");setLoginEmail(regEmail);setRegSuccess(false);},2000);
  };

  const logout = () => { setPage("auth"); setRole(null); setCurrentUser(null); setLoginEmail(""); setLoginPass(""); setLoginError(""); };

  const userNav = [
    {id:"dashboard",label:"Dashboard",icon:"dashboard"},
    {id:"new-order",label:"New Order",icon:"plus"},
    {id:"orders",label:"My Orders",icon:"orders"},
    {id:"add-funds",label:"Add Funds",icon:"wallet"},
    {id:"services",label:"Services",icon:"services"},
    {id:"support",label:"Support",icon:"ticket"},
    {id:"api",label:"API Access",icon:"api"},
  ];

  const adminNav = [
    {id:"dashboard",label:"Dashboard",icon:"dashboard"},
    {id:"users",label:"Users",icon:"users"},
    {id:"orders",label:"Orders",icon:"orders"},
    {id:"services",label:"Services",icon:"services"},
    {id:"payments",label:"Payments",icon:"payment"},
    {id:"api-providers",label:"API Providers",icon:"api"},
    {id:"settings",label:"Settings",icon:"settings"},
  ];

  const navItems = role === "admin" ? adminNav : userNav;
  const pageTitle = navItems.find(n=>n.id===activeNav)?.label || "Dashboard";

  const renderContent = () => {
    if (role === "user") {
      if (activeNav === "dashboard") return <UserDashboard user={currentUser} orders={orders}/>;
      if (activeNav === "new-order") return <NewOrder user={currentUser} setUser={setCurrentUser} services={services} setOrders={setOrders}/>;
      if (activeNav === "orders") return <OrderHistory orders={orders} user={currentUser}/>;
      if (activeNav === "add-funds") return <AddFunds user={currentUser} setUser={setCurrentUser} setPayments={setPayments}/>;
      if (activeNav === "services") return <ServicesPage services={services}/>;
      if (activeNav === "support") return <SupportPage user={currentUser}/>;
      if (activeNav === "api") return (
        <div className="panel"><div className="panel-head"><span className="panel-title">🔌 API Access</span></div><div className="panel-body">
          <p style={{color:"var(--text2)",fontSize:13,marginBottom:16}}>Integrate our SMM panel into your own platform using our REST API.</p>
          <div className="form-group"><label className="form-label">Your API Key</label><div className="api-box"><span className="api-key-text">sk_live_xxxxxxxxxxxx{currentUser.username}xxxx</span><button className="btn btn-ghost btn-sm"><Icon name="copy" size={13}/>Copy</button></div></div>
          <div className="alert alert-info" style={{marginTop:16}}>Base URL: <code style={{color:"var(--accent3)"}}>https://api.smmpanel.pk/v1</code><br/>Docs: <a href="#" style={{color:"var(--blue)"}}>View Documentation →</a></div>
        </div></div>
      );
    }
    if (role === "admin") {
      if (activeNav === "dashboard") return <AdminDashboard users={users} orders={orders} payments={payments}/>;
      if (activeNav === "users") return <AdminUsers users={users} setUsers={setUsers}/>;
      if (activeNav === "orders") return <AdminOrders orders={orders} setOrders={setOrders}/>;
      if (activeNav === "services") return <AdminServices services={services} setServices={setServices}/>;
      if (activeNav === "payments") return <AdminPayments payments={payments} setPayments={setPayments} users={users} setUsers={setUsers}/>;
      if (activeNav === "api-providers") return <AdminAPI/>;
      if (activeNav === "settings") return (
        <div className="panel"><div className="panel-head"><span className="panel-title">⚙️ Panel Settings</span></div><div className="panel-body">
          {[["Panel Name","SMMPanel PK"],["Support Email","support@smmpanel.pk"],["PKR to USD Rate","280"],["Min Deposit (PKR)","200"],["Referral Bonus (%)","5"]].map(([l,v])=>(
            <div className="form-group" key={l}><label className="form-label">{l}</label><input className="form-input" defaultValue={v}/></div>
          ))}
          <button className="btn-primary" style={{maxWidth:200}}>Save Settings →</button>
        </div></div>
      );
    }
  };

  return (
    <div className="smm-root">
      <style>{styles}</style>

      {page === "auth" && (
        <div className="auth-bg">
          <div className="auth-card">
            <div className="auth-logo">
              <h1>SMM<span>Panel</span>.pk</h1>
              <p>Pakistan's #1 Social Media Marketing Panel</p>
            </div>
            <div className="auth-tabs">
              <button className={`auth-tab ${authTab==="login"?"active":""}`} onClick={()=>setAuthTab("login")}>Login</button>
              <button className={`auth-tab ${authTab==="register"?"active":""}`} onClick={()=>setAuthTab("register")}>Register</button>
            </div>
            {authTab === "login" ? (
              <>
                {loginError && <div className="alert alert-error">{loginError}</div>}
                <div className="form-group"><label className="form-label">Email or Username</label><input className="form-input" value={loginEmail} onChange={e=>{setLoginEmail(e.target.value);setLoginError("");}} placeholder="Enter email or username"/></div>
                <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={loginPass} onChange={e=>setLoginPass(e.target.value)} placeholder="Enter password"/></div>
                <button className="btn-primary" onClick={()=>login(false)}>Login →</button>
                <div className="demo-btns">
                  <button className="btn-demo" onClick={()=>{setLoginEmail("ali@email.com");setLoginPass("demo");login(false);}}>👤 Demo User</button>
                  <button className="btn-demo" onClick={()=>login(true)}>🔧 Demo Admin</button>
                </div>
                <p style={{textAlign:"center",fontSize:12,color:"var(--text3)",marginTop:16}}>Demo: ali@email.com or click buttons above</p>
              </>
            ) : (
              <>
                {regSuccess && <div className="alert alert-success">✓ Account created! Redirecting to login...</div>}
                <div className="form-group"><label className="form-label">Username</label><input className="form-input" value={regUsername} onChange={e=>setRegUsername(e.target.value)} placeholder="Choose a username"/></div>
                <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={regEmail} onChange={e=>setRegEmail(e.target.value)} placeholder="Your email address"/></div>
                <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" value={regPass} onChange={e=>setRegPass(e.target.value)} placeholder="Create a password"/></div>
                <button className="btn-primary" onClick={register}>Create Account →</button>
              </>
            )}
          </div>
        </div>
      )}

      {page === "app" && (
        <div className="layout">
          {/* Sidebar overlay on mobile */}
          {!sidebarOpen && <div className="floating-overlay" onClick={()=>setSidebarOpen(false)}/>}
          
          <div className={`sidebar ${sidebarOpen ? "" : "closed"}`}>
            <div className="sidebar-logo">
              <h2>SMM<span>Panel</span></h2>
              <p>{role === "admin" ? "Admin Control Panel" : "User Dashboard"}</p>
            </div>
            <nav className="sidebar-nav">
              <div className="nav-section">
                <div className="nav-label">{role === "admin" ? "Management" : "Navigation"}</div>
                {navItems.map(item => (
                  <div key={item.id} className={`nav-item ${activeNav===item.id?"active":""}`} onClick={()=>setActiveNav(item.id)}>
                    <Icon name={item.icon} size={16}/>
                    {item.label}
                    {item.id==="payments" && payments.filter(p=>p.status==="pending").length > 0 && (
                      <span style={{marginLeft:"auto",background:"var(--red)",borderRadius:20,fontSize:10,padding:"2px 6px",fontWeight:700}}>{payments.filter(p=>p.status==="pending").length}</span>
                    )}
                  </div>
                ))}
              </div>
            </nav>
            <div className="sidebar-user">
              <div className="sidebar-user-info">
                <div className="avatar">{(currentUser?.username||"A")[0].toUpperCase()}</div>
                <div>
                  <div className="user-name">{currentUser?.username || "Admin"}</div>
                  <div className="user-role">{role === "admin" ? "Administrator" : `$${currentUser?.balance?.toFixed(2)}`}</div>
                </div>
                <button style={{marginLeft:"auto",background:"none",border:"none",cursor:"pointer",color:"var(--text3)",padding:4}} onClick={logout}>
                  <Icon name="logout" size={16}/>
                </button>
              </div>
            </div>
          </div>

          <div className={`main ${sidebarOpen?"":"full"}`}>
            <div className="topbar">
              <div className="topbar-left">
                <button className="hamburger" onClick={()=>setSidebarOpen(s=>!s)}>
                  <Icon name="menu" size={20}/>
                </button>
                <span className="topbar-title">{pageTitle}</span>
              </div>
              <div className="topbar-right">
                {role === "user" && <div className="balance-chip">💰 ${currentUser?.balance?.toFixed(2)}</div>}
                {role === "admin" && <span className="badge badge-purple">🔧 Admin</span>}
                <button className="btn-notif">
                  <Icon name="bell" size={16}/>
                  <span className="notif-dot"/>
                </button>
              </div>
            </div>
            <div className="content">
              {renderContent()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}