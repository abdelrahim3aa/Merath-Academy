import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/SheikhProfile.css';
const API_URL = process.env.REACT_APP_API_URL;

const SheikhProfile = () => {
  const { id } = useParams();
  const [sheikh, setSheikh] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [sheikhRes, coursesRes] = await Promise.all([
        axios.get(`${API_URL}/api/shuyukh/${id}`),
        axios.get(`${API_URL}/api/courses`)
      ]);

      setSheikh(sheikhRes.data);

      const sheikhCourses = coursesRes.data.filter(
        course => course.sheikh?._id === id
      );
      setCourses(sheikhCourses);

      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (!sheikh) return <div className="loading">الشيخ غير موجود</div>;

  return (
    <div className="sheikh-profile-page">

      {/* HEADER SECTION */}
      <div className="profile-header">
        <div className="profile-image">
          <img src={sheikh.image} alt={sheikh.name} />
        </div>

        <div className="profile-info">
          <h1>{sheikh.name}</h1>

          {sheikh.specialization?.length > 0 && (
            <p className="profile-specialization">
              {sheikh.specialization.join(' • ')}
            </p>
          )}

          {sheikh.social && (
            <div className="social-links">
              {sheikh.social.youtube && (
                <a href={sheikh.social.youtube} target="_blank" rel="noopener noreferrer">
                  <i className="fas fa-youtube"></i>
                </a>
              )}

              {sheikh.social.twitter && (
                <a href={sheikh.social.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              )}

              {sheikh.social.facebook && (
                <a href={sheikh.social.facebook} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook"></i>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="profile-bio">
        <h2 className="section-title">السيرة الذاتية</h2>
        <p>{sheikh.bio}</p>
      </div>

      {/* COURSES SECTION */}
      <section className="courses-section">
        <h2 className="section-title">دورات الشيخ ({courses.length})</h2>

        {courses.length > 0 ? (
          <div className="sheikh-courses-grid">
            {courses.map(course => (
              <div key={course._id} className="course-card">
                <img src={course.image} alt={course.title} />

                <div className="course-card-content">
                  <h3 className="course-card-title">{course.title}</h3>

                  <p className="course-card-desc">
                    {course.description.substring(0, 120)}...
                  </p>

                  <a href={`/courses/${course._id}`} className="btn btn-primary">
                    عرض الدورة
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-courses">لا توجد دورات حالياً</p>
        )}
      </section>

    </div>
  );
};

export default SheikhProfile;
