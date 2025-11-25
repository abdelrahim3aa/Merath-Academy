
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/CoursesPage.css';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/courses');
      setCourses(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;

  return (
    <div className="courses-page">
      <div className="container">
        <h1>جميع الدورات</h1>
        
        <div className="courses-grid">
          {courses.map(course => (
            <div key={course._id} className="course-card">
              <img src={course.image} alt={course.title} />
              <div className="card-content">
                <h3>{course.title}</h3>
                <p className="sheikh-name">
                  {course.sheikh?.name}
                </p>
                <p className="description">
                  {course.description.substring(0, 120)}...
                </p>
                <div className="card-footer">
                  <span className="level">{course.level}</span>
                  <span className="lessons">{course.lessonsCount} درس</span>
                </div>
                <Link to={`/courses/${course._id}`} className="btn btn-primary">
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;