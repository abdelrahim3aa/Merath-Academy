import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./css/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar shadow-nav">
      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="nav-logo">
          🕌  أكاديمية ميراث
        </Link>

        {/* Links */}
        <ul className="nav-links">

          <li>
            <NavLink to="/" end>
              الرئيسية
            </NavLink>
          </li>

          <li>
            <NavLink to="/shuyukh">المشايخ</NavLink>
          </li>

          <li>
            <NavLink to="/courses">الدورات</NavLink>
          </li>

          {user ? (
            <>
              {user.role === "admin" && (
                <li>
                  <NavLink to="/admin">لوحة التحكم</NavLink>
                </li>
              )}

              <li className="welcome">
                مرحباً، {user.name}
              </li>

              <li>
                <button className="btn-logout" onClick={logout}>
                  تسجيل خروج
                </button>
              </li>
            </>
          ) : (
            <>
              <li><NavLink to="/login">تسجيل دخول</NavLink></li>
              <li><NavLink to="/register">إنشاء حساب</NavLink></li>
            </>
          )}
        </ul>

      </div>
    </nav>
  );
};

export default Navbar;
