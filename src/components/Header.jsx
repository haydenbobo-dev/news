import React, { useState } from 'react';

const Header = ({ category, setCategory, language, setLanguage, searchQuery, setSearchQuery, onSearchSubmit, onRefresh, news }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const categories = ['top', 'technology', 'sports', 'business', 'entertainment'];

  const suggestions = news.filter(a => a.title.toLowerCase().includes(searchQuery.toLowerCase()) && searchQuery.length > 2).slice(0, 5);

  return (
    <header className="header-container">
      <div style={{ fontSize: '26px',
                   fontWeight: '800', 
                   color: '#007bff' 
                  }}>VibeRead</div>
      
      <nav className="nav-scroll">
        {categories.map(cat => (
          <button 
            key={cat} 
            onClick={() => { setSearchQuery(''); setCategory(cat); }}
            style={{
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              fontWeight: '600',
              color: category === cat && !searchQuery ? '#007bff' : '#555',
              textTransform: 'capitalize',
              whiteSpace: 'nowrap'
            }}
          >
            {cat}
          </button>
        ))}
      </nav>

      <div style={{ display: 'flex',
                   gap: '10px',
                   alignItems: 'center',
                   width: '100%',
                   justifyContent: 'flex-end' }}>
        <div style={{ position: 'relative', flexGrow: 1, maxWidth: '300px' }}>
          <form onSubmit={onSearchSubmit} style={{ display: 'flex', background: '#f1f3f4', borderRadius: '20px', padding: '5px 15px' }}>
            <input 
              type="text" placeholder="Search..." value={searchQuery}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }}
            />
            <button type="submit" style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>🔍</button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '40px', left: 0, right: 0, background: '#fff', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', zIndex: 100 }}>
              {suggestions.map((s, i) => (
                <div key={i} onClick={() => { setSearchQuery(s.title); onSearchSubmit(); }} style={{ padding: '10px', fontSize: '13px', cursor: 'pointer', borderBottom: '1px solid #eee' }}>
                  {s.title.substring(0, 45)}...
                </div>
              ))}
            </div>
          )}
        </div>

        <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ padding: '5px', borderRadius: '8px' }}>
          <option value="en">ENGLISH</option>
          <option value="hi">HINDI</option>
          <option value="ta">TAMIL</option>
        </select>
        <button onClick={onRefresh} style={{ background: '#007bff', color: '#fff', border: 'none', borderRadius: '50%', width: '35px', height: '35px', cursor: 'pointer' }}>🔄</button>
      </div>
    </header>
  );
};

export default Header;
