
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './css/AdminDashboard.css';

// Admin Pages
import AdminHome from './AdminHome';
import ManageShuyukh from './ManageShuyukh';
import ManageCourses from './ManageCourses';
import ManageUsers from './ManageUsers';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <aside className="admin-sidebar">
        <h2>لوحة التحكم</h2>
        <nav>
          <Link to="/admin">الرئيسية</Link>
          <Link to="/admin/shuyukh">إدارة المشايخ</Link>
          <Link to="/admin/courses">إدارة الدورات</Link>
          <Link to="/admin/users">إدارة المستخدمين</Link>
        </nav>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route path="/" element={<AdminHome />} />
          <Route path="/shuyukh" element={<ManageShuyukh />} />
          <Route path="/courses" element={<ManageCourses />} />
          <Route path="/users" element={<ManageUsers />} />
        </Routes>
      </main>
    </div>
  );
};

export default AdminDashboard;