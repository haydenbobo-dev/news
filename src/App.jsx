import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import NewsBody from './components/NewsBody';
import './App.css'; 

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('top');
  const [language, setLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  const [nextPage, setNextPage] = useState(null);

  const API_KEY = "pub_b563adac40c34c9fba59bc06093361ab";

  const fetchNews = async (isLoadMore = false) => {
    if (!isLoadMore) setLoading(true);
    try {
      let url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&country=in&language=${language}`;
      if (searchQuery.trim()) url += `&q=${encodeURIComponent(searchQuery)}`;
      else url += `&category=${category}`;
      if (isLoadMore && nextPage) url += `&page=${nextPage}`;

      const res = await axios.get(url);
      setNews(prev => isLoadMore ? [...prev, ...res.data.results] : res.data.results);
      setNextPage(res.data.nextPage || null);
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  useEffect(() => { fetchNews(); }, [category, language]);

  return (
    <div>
      <Header 
        category={category} setCategory={setCategory} 
        language={language} setLanguage={setLanguage}
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        onSearchSubmit={(e) => { e?.preventDefault(); fetchNews(); }}
        onRefresh={() => fetchNews()}
        news={news}
      />
      <NewsBody news={news} loading={loading} />
      {nextPage && (
        <div style={{ textAlign: 'center',
                     padding: '40px' }}>
          <button onClick={() => fetchNews(true)}
            style={{ padding: '12px 40px', 
                     borderRadius: '30px',
                     border: 'none', 
                     background: '#007bff',
                     color: '#fff',
                     fontWeight: 'bold', 
                     cursor: 'pointer' 
                   }}>
            Load More News
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
