
import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>🕌 الأكاديمية الإسلامية</h3>
            <p>منصة تعليمية متخصصة في العلوم الشرعية</p>
          </div>

          <div className="footer-section">
            <h4>روابط سريعة</h4>
            <ul>
              <li><a href="/">الرئيسية</a></li>
              <li><a href="/shuyukh">المشايخ</a></li>
              <li><a href="/courses">الدورات</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>تواصل معنا</h4>
            <p>البريد الإلكتروني: info@academy.com</p>
            <p>الهاتف: +966 XX XXX XXXX</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 الأكاديمية الإسلامية. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;