
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/CourseDetails.css';
const API_URL = process.env.REACT_APP_API_URL;

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [courseRes, lessonsRes] = await Promise.all([
        axios.get(`${API_URL}/api/courses/${id}`),
        axios.get(`${API_URL}/api/lessons/course/${id}`)
      ]);

      setCourse(courseRes.data);
      setLessons(lessonsRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">جاري التحميل...</div>;
  if (!course) return <div className="loading">الدورة غير موجودة</div>;

  return (
    <div className="course-details">
      <div className="course-header">
        <img src={course.image} alt={course.title} />
        <div className="header-content">
          <h1>{course.title}</h1>
          <p className="sheikh-name">الشيخ: {course.sheikh?.name}</p>
          <div className="course-meta">
            <span>المستوى: {course.level}</span>
            <span>التصنيف: {course.category}</span>
            <span>عدد الدروس: {lessons.length}</span>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="description-section">
          <h2>وصف الدورة</h2>
          <p>{course.description}</p>
        </section>

        <section className="lessons-section">
          <h2>محتوى الدورة</h2>
          {lessons.length > 0 ? (
            <div className="lessons-list">
              {lessons.map((lesson, index) => (
                <div key={lesson._id} className="lesson-item">
                  <span className="lesson-number">{index + 1}</span>
                  <div className="lesson-info">
                    <h3>{lesson.title}</h3>
                    {lesson.description && <p>{lesson.description}</p>}
                  </div>
                  {lesson.duration && (
                    <span className="lesson-duration">{lesson.duration}</span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-lessons">لم يتم إضافة دروس بعد</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default CourseDetails;