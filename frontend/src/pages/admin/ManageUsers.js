
import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/admin/users`);
      setUsers(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleChangeRole = async (userId, newRole) => {
    if (window.confirm(`هل أنت متأكد من تغيير الصلاحية إلى ${newRole}؟`)) {
      try {
        await axios.put(`${API_URL}/api/admin/users/${userId}/role`, {
          role: newRole
        });
        alert('تم تحديث الصلاحية بنجاح');
        fetchUsers();
      } catch (error) {
        alert('حدث خطأ في التحديث');
      }
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        await axios.delete(`${API_URL}/api/admin/users/${userId}`);
        alert('تم الحذف بنجاح');
        fetchUsers();
      } catch (error) {
        alert('حدث خطأ في الحذف');
      }
    }
  };

  if (loading) return <div>جاري التحميل...</div>;

  return (
    <div className="manage-page">
      <div className="page-header">
        <h1>إدارة المستخدمين</h1>
        <span>عدد المستخدمين: {users.length}</span>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>الاسم</th>
              <th>البريد الإلكتروني</th>
              <th>الصلاحية</th>
              <th>تاريخ التسجيل</th>
              <th>الإجراءات</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleChangeRole(user._id, e.target.value)}
                    style={{
                      padding: '5px 10px',
                      borderRadius: '5px',
                      border: '1px solid #ddd'
                    }}
                  >
                    <option value="user">مستخدم</option>
                    <option value="admin">مسؤول</option>
                  </select>
                </td>
                <td>
                  {new Date(user.createdAt).toLocaleDateString('ar-EG')}
                </td>
                <td>
                  <button 
                    className="btn-delete" 
                    onClick={() => handleDelete(user._id)}
                  >
                    حذف
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <p style={{textAlign: 'center', padding: '40px', color: '#999'}}>
          لا يوجد مستخدمين
        </p>
      )}
    </div>
  );
};

export default ManageUsers;