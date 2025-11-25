
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/HomePage.css';
const API_URL = process.env.REACT_APP_API_URL;

const HomePage = () => {
  const [courses, setCourses] = useState([]);
  const [shuyukh, setShuyukh] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, shuyukhRes] = await Promise.all([
        axios.get(`${API_URL}/api/courses`),
        axios.get(`${API_URL}/api/shuyukh`)
      ]);
      setCourses(coursesRes.data.slice(0, 6));
      setShuyukh(shuyukhRes.data.slice(0, 4));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>مرحباً بكم في الأكاديمية الإسلامية</h1>
          <p>تعلم العلوم الشرعية من خلال دورات متخصصة مع نخبة من المشايخ</p>
          <Link to="/courses" className="btn btn-primary">استكشف الدورات</Link>
        </div>
      </section>

      {/* Latest Courses */}
      <section className="section">
        <div className="container">
          <h2>أحدث الدورات</h2>
          <div className="courses-grid">
            {courses.map(course => (
              <div key={course._id} className="course-card">
                <img src={course.image} alt={course.title} />
                <div className="card-content">
                  <h3>{course.title}</h3>
                  <p>{course.description.substring(0, 100)}...</p>
                  <Link to={`/courses/${course._id}`} className="btn">عرض التفاصيل</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Shuyukh */}
      <section className="section bg-light">
        <div className="container">
          <h2>المشايخ المميزون</h2>
          <div className="shuyukh-grid">
            {shuyukh.map(sheikh => (
              <div key={sheikh._id} className="sheikh-card">
                <img src={sheikh.image} alt={sheikh.name} />
                <h3>{sheikh.name}</h3>
                <p>{sheikh.specialization.join(', ')}</p>
                <Link to={`/shuyukh/${sheikh._id}`} className="btn">عرض الملف</Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;