import React, { useState } from 'react';

const NewsBody = ({ news = [], loading, error }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  if (loading && news.length === 0) return <div style={{ textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '100px', color: 'red' }}>{error}</div>;

  const share = {
    copy: (u) => { navigator.clipboard.writeText(u); alert("Link Copied!"); },
    wa: (t, u) => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(t + " " + u)}`),
    tw: (t, u) => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(u)}`),
    tg: (t, u) => window.open(`https://t.me/share/url?url=${u}`)
  };

  return (
    <main className="container">
      <div className="news-grid">
        {news.map((article, index) => (
          <div key={index} className="news-card">
            <img src={article.image_url || 'https://via.placeholder.com/400x200?text=VibeRead'} alt="" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888', marginBottom: '10px' }}>
                <span style={{ fontWeight: 'bold', color: '#007bff' }}>{article.category?.[0]}</span>
                <span>{new Date(article.pubDate).toLocaleDateString()}</span>
              </div>
              <h3 style={{ fontSize: '18px', margin: '0 0 15px 0', lineHeight: '1.4' }}>{article.title}</h3>
              
              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #eee' }}>
                <a href={article.link} target="_blank" rel="noreferrer" style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}>Read Story →</a>
                
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setActiveMenu(activeMenu === index ? null : index)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  </button>

                  {activeMenu === index && (
                    <div style={{ position: 'absolute', bottom: '40px', right: 0, background: '#fff', width: '170px', borderRadius: '10px', boxShadow: '0 5px 20px rgba(0,0,0,0.2)', zIndex: 100, padding: '10px 0', border: '1px solid #eee' }}>
                      <div style={{ padding: '5px 15px', fontSize: '11px', fontWeight: 'bold', color: '#aaa' }}>SHARE LINK</div>
                      <button onClick={() => share.copy(article.link)} style={styles.menuItem}>📋 Copy Link</button>
                      <button onClick={() => share.wa(article.title, article.link)} style={styles.menuItem}>🟢 WhatsApp</button>
                      <button onClick={() => share.tw(article.title, article.link)} style={styles.menuItem}>⚫ X (Twitter)</button>
                      <button onClick={() => share.tg(article.title, article.link)} style={styles.menuItem}>🔵 Telegram</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeMenu !== null && <div onClick={() => setActiveMenu(null)} style={{ position: 'fixed', inset: 0, zIndex: 50 }} />}
    </main>
  );
};

const styles = {
  menuItem: { width: '100%', padding: '10px 15px', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', display: 'flex', gap: '10px' }
};

export default NewsBody;