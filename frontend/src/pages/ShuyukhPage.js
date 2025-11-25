
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/ShuyukhPage.css';

const ShuyukhPage = () => {
  const [shuyukh, setShuyukh] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchShuyukh();
  }, []);

  const fetchShuyukh = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/shuyukh');
      setShuyukh(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const filteredShuyukh = shuyukh.filter(sheikh =>
    sheikh.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sheikh.specialization.some(spec => spec.includes(searchTerm))
  );

  if (loading) return <div className="loading">جاري التحميل...</div>;

  return (
    <div className="shuyukh-page">
      <div className="container">
        <div className="page-header">
          <h1>المشايخ</h1>
          <input
            type="text"
            placeholder="ابحث عن شيخ..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="shuyukh-grid">
          {filteredShuyukh.map(sheikh => (
            <div key={sheikh._id} className="sheikh-card">
              <img src={sheikh.image} alt={sheikh.name} />
              <div className="card-content">
                <h3>{sheikh.name}</h3>
                <p className="specialization">
                  {sheikh.specialization.join(' • ')}
                </p>
                <p className="bio">
                  {sheikh.bio.substring(0, 120)}...
                </p>
                <Link to={`/shuyukh/${sheikh._id}`} className="btn btn-primary">
                  عرض الملف الشخصي
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredShuyukh.length === 0 && (
          <p className="no-results">لا توجد نتائج للبحث</p>
        )}
      </div>
    </div>
  );
};

export default ShuyukhPage;