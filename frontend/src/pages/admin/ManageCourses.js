
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [shuyukh, setShuyukh] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    sheikh: '',
    level: 'beginner',
    category: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, shuyukhRes] = await Promise.all([
        axios.get('http://localhost:8000/api/courses'),
        axios.get('http://localhost:8000/api/shuyukh')
      ]);
      setCourses(coursesRes.data);
      setShuyukh(shuyukhRes.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/courses/${editId}`, formData);
        alert('تم التحديث بنجاح');
      } else {
        await axios.post('http://localhost:8000/api/courses', formData);
        alert('تم الإضافة بنجاح');
      }
      
      setFormData({ title: '', description: '', image: '', sheikh: '', level: 'beginner', category: '' });
      setEditId(null);
      setShowForm(false);
      fetchData();
    } catch (error) {
      alert('حدث خطأ: ' + error.response?.data?.error);
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title,
      description: course.description,
      image: course.image,
      sheikh: course.sheikh._id,
      level: course.level,
      category: course.category
    });
    setEditId(course._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      try {
        await axios.delete(`http://localhost:8000/api/courses/${id}`);
        alert('تم الحذف بنجاح');
        fetchData();
      } catch (error) {
        alert('حدث خطأ في الحذف');
      }
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header">
        <h1>إدارة الدورات</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ title: '', description: '', image: '', sheikh: '', level: 'beginner', category: '' });
          }}
        >
          {showForm ? 'إلغاء' : '+ إضافة دورة جديدة'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editId ? 'تعديل الدورة' : 'إضافة دورة جديدة'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>عنوان الدورة</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>الوصف</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>رابط الصورة</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>الشيخ</label>
              <select
                value={formData.sheikh}
                onChange={(e) => setFormData({...formData, sheikh: e.target.value})}
                required
              >
                <option value="">اختر الشيخ</option>
                {shuyukh.map(sheikh => (
                  <option key={sheikh._id} value={sheikh._id}>
                    {sheikh.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>المستوى</label>
              <select
                value={formData.level}
                onChange={(e) => setFormData({...formData, level: e.target.value})}
              >
                <option value="beginner">مبتدئ</option>
                <option value="intermediate">متوسط</option>
                <option value="advanced">متقدم</option>
              </select>
            </div>

            <div className="form-group">
              <label>التصنيف</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                placeholder="فقه، عقيدة، تفسير..."
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {editId ? 'تحديث' : 'إضافة'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>الصورة</th>
              <th>العنوان</th>
              <th>الشيخ</th>
              <th>المستوى</th>
              <th>التصنيف</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course._id}>
                <td>
                  <img src={course.image} alt={course.title} width="80" height="50" style={{objectFit: 'cover'}} />
                </td>
                <td>{course.title}</td>
                <td>{course.sheikh?.name}</td>
                <td>{course.level}</td>
                <td>{course.category}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(course)}>
                    تعديل
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(course._id)}>
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCourses;