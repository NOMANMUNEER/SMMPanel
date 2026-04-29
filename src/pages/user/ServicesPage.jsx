import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PlatformIcon from '../../components/PlatformIcon';

const ServicesPage = () => {
  const [platform, setPlatform] = useState("all");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/services').then(res => {
      setServices(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const filtered = platform === "all" ? services : services.filter(s => s.platform === platform);

  return (
    <div className="panel" style={{marginBottom:20}}>
      <div className="panel-body">
        <div className="tabs">
          {["all","instagram","facebook","tiktok","youtube"].map(p => (
            <button key={p} className={`tab ${platform===p?"active":""}`} onClick={()=>setPlatform(p)}>
              {p==="all"?"All Platforms":p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
        {loading ? (
          <div style={{padding: 20, textAlign: 'center'}}>Loading services...</div>
        ) : (
          <div className="service-grid">
            {filtered.map(s => (
              <div key={s.id} className="service-card">
                <div className="service-card-head">
                  <PlatformIcon platform={s.platform}/>
                  <div>
                    <div style={{fontSize:14,fontWeight:600}}>{s.name}</div>
                    <div style={{fontSize:11,color:"var(--text3)"}}>{s.category}</div>
                  </div>
                  <div style={{marginLeft:"auto",fontSize:15,fontWeight:800,color:"var(--accent3)"}}>
                    ${Number(s.price).toFixed(2)}<span style={{fontSize:10,fontWeight:400,color:"var(--text3)"}}>/1K</span>
                  </div>
                </div>
                <div className="service-card-body">
                  <div><div className="service-meta">Min Order</div><div className="service-meta-val">{s.min_order.toLocaleString()}</div></div>
                  <div><div className="service-meta">Max Order</div><div className="service-meta-val">{s.max_order.toLocaleString()}</div></div>
                  <div><div className="service-meta">Delivery</div><div className="service-meta-val">{s.delivery_time}</div></div>
                  <div><div className="service-meta">Quality</div><div className="service-meta-val">{s.quality}</div></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
