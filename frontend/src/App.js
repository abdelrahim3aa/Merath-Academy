
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';

// Pages
import HomePage from './pages/HomePage.js';
import ShuyukhPage from './pages/ShuyukhPage.js';
import SheikhProfile from './pages/SheikhProfile.js';
import CoursesPage from './pages/CoursesPage.js';
import CourseDetails from './pages/CourseDetails.js';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage.js';
import AdminDashboard from './pages/admin/Dashboard.js';

// Components
import Navbar from './components/Navbar.js';
import Footer from './components/Footer.js';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shuyukh" element={<ShuyukhPage />} />
            <Route path="/shuyukh/:id" element={<SheikhProfile />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
