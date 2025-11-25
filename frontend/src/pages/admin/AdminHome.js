
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminHome = () => {
  const [stats, setStats] = useState({
    usersCount: 0,
    shuyukhCount: 0,
    coursesCount: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [users, shuyukh, courses] = await Promise.all([
        axios.get('http://localhost:8000/api/admin/users'),
        axios.get('http://localhost:8000/api/shuyukh'),
        axios.get('http://localhost:8000/api/courses')
      ]);

      setStats({
        usersCount: users.data.length || 0,
        shuyukhCount: shuyukh.data.length,
        coursesCount: courses.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="admin-home">
      <h1>مرحباً بك في لوحة التحكم</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>عدد المستخدمين</h3>
          <p className="stat-number">{stats.usersCount}</p>
        </div>

        <div className="stat-card">
          <h3>عدد المشايخ</h3>
          <p className="stat-number">{stats.shuyukhCount}</p>
        </div>

        <div className="stat-card">
          <h3>عدد الدورات</h3>
          <p className="stat-number">{stats.coursesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;