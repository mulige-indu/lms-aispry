import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainNavbar.css';

const MainNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    if (isLoggedIn) {
      // If logged in, go to courses
      navigate('/courses');
    } else {
      // Go to React login page
      navigate('/login');
    }
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    setIsLoggedIn(false);
    setStudent(null);
    alert('Logged out successfully');
  };


  const handleProgramsClick = () => {
    navigate('/programs');
  };

  const handleMasterclassClick = () => {
    navigate('/masterclass');
  };

  const handleAlumniClick = () => {
    navigate('/alumni');
  };

  const handleResourcesClick = () => {
    navigate('/resources');
  };


  const handleApplyClick = () => {
    navigate('/apply');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img
            src="https://aispry.com/pluginfile.php/1/theme_university/logo/1760548222/AiTutor-Logo-w.png"
            alt="AiTutor Logo"
            className="logo-image"
          />
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`navbar-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <ul className="menu-list">
            <li className="menu-item">
              <button onClick={() => { handleProgramsClick(); closeMobileMenu(); }} className="menu-link">Programs</button>
            </li>
            <li className="menu-item">
              <button onClick={() => { handleMasterclassClick(); closeMobileMenu(); }} className="menu-link">Masterclass</button>
            </li>
            <li className="menu-item">
              <button onClick={() => { handleAlumniClick(); closeMobileMenu(); }} className="menu-link">Alumni</button>
            </li>
            <li className="menu-item">
              <button onClick={() => { handleResourcesClick(); closeMobileMenu(); }} className="menu-link">Resources</button>
            </li>
          </ul>
        </div>

        <div className="navbar-actions">

          <div className="auth-buttons">
            {isLoggedIn ? (
              <div className="user-menu">
                <span className="welcome-text">Hi, {student?.firstName}!</span>
                <button className="dashboard-btn" onClick={handleLoginClick}>
                  My Courses
                </button>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <>
                <button className="login-btn" onClick={handleLoginClick}>
                  Login
                </button>
                <button className="apply-btn" onClick={handleApplyClick}>
                  Apply Now
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