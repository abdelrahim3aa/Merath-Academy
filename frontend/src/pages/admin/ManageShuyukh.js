
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const ManageShuyukh = () => {
  const [shuyukh, setShuyukh] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    image: '',
    specialization: ''
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchShuyukh();
  }, []);

  const fetchShuyukh = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/shuyukh`);
      setShuyukh(res.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
      ...formData,
      specialization: formData.specialization.split(',').map(s => s.trim())
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:8000/api/shuyukh/${editId}`, data);
        alert('تم التحديث بنجاح');
      } else {
        await axios.post('http://localhost:8000/api/shuyukh', data);
        alert('تم الإضافة بنجاح');
      }
      
      setFormData({ name: '', bio: '', image: '', specialization: '' });
      setEditId(null);
      setShowForm(false);
      fetchShuyukh();
    } catch (error) {
      alert('حدث خطأ: ' + error.response?.data?.error);
    }
  };

  const handleEdit = (sheikh) => {
    setFormData({
      name: sheikh.name,
      bio: sheikh.bio,
      image: sheikh.image,
      specialization: sheikh.specialization.join(', ')
    });
    setEditId(sheikh._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('هل أنت متأكد من الحذف؟')) {
      try {
        await axios.delete(`http://localhost:8000/api/shuyukh/${id}`);
        alert('تم الحذف بنجاح');
        fetchShuyukh();
      } catch (error) {
        alert('حدث خطأ في الحذف');
      }
    }
  };

  return (
    <div className="manage-page">
      <div className="page-header">
        <h1>إدارة المشايخ</h1>
        <button 
          className="btn btn-primary" 
          onClick={() => {
            setShowForm(!showForm);
            setEditId(null);
            setFormData({ name: '', bio: '', image: '', specialization: '' });
          }}
        >
          {showForm ? 'إلغاء' : '+ إضافة شيخ جديد'}
        </button>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editId ? 'تعديل الشيخ' : 'إضافة شيخ جديد'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>الاسم</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div className="form-group">
              <label>نبذة مختصرة</label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
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
              <label>التخصصات (مفصولة بفاصلة)</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                placeholder="فقه, عقيدة, تفسير"
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
              <th>الاسم</th>
              <th>التخصصات</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {shuyukh.map(sheikh => (
              <tr key={sheikh._id}>
                <td>
                  <img src={sheikh.image} alt={sheikh.name} width="50" height="50" style={{borderRadius: '50%'}} />
                </td>
                <td>{sheikh.name}</td>
                <td>{sheikh.specialization.join(', ')}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(sheikh)}>
                    تعديل
                  </button>
                  <button className="btn-delete" onClick={() => handleDelete(sheikh._id)}>
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

export default ManageShuyukh;
