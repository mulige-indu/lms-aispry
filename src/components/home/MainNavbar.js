import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainNavbar.css';

// Custom SVG Icons
const GraduationCapIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
  </svg>
);

const UserCircleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
  </svg>
);

const SignOutIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
  </svg>
);

const SignInIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
  </svg>
);

// Clean navbar without Programs, Masterclass, Forum, Alumni, Resources
const MainNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const studentData = localStorage.getItem('student');

    if (token && studentData) {
      setIsLoggedIn(true);
      setStudent(JSON.parse(studentData));
    }
  }, []);


  const handleLoginClick = () => {
    // Always go directly to courses page
    navigate('/courses');
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    setIsLoggedIn(false);
    setStudent(null);
    alert('Logged out successfully');
  };


  const handleApplyClick = () => {
    navigate('/apply');
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png"
            alt="AiTutor Logo"
            className="logo-image"
          />
        </div>



        <div className="navbar-actions">

          <div className="auth-buttons">
            {isLoggedIn ? (
              <div className="user-menu">
                <span className="welcome-text"><span className="user-icon"><UserCircleIcon /></span> Hi, {student?.firstName}!</span>
                <button className="dashboard-btn" onClick={handleLoginClick}>
                  <GraduationCapIcon /> My Courses
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  <SignOutIcon /> Logout
                </button>
              </div>
            ) : (
              <>
                <button className="login-btn" onClick={handleLoginClick}>
                  <SignInIcon /> Login
                </button>
                <button className="apply-btn" onClick={handleApplyClick}>
                  <SendIcon /> Apply Now
                </button>
              </>
            )}
          </div>
        </div>
      </div>

    </nav>
  );
};

export default MainNavbar;