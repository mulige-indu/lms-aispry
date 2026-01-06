import React, { useState } from 'react';
import Loader from '../Loader';
import './MainNavbar.css';

// Custom SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
  </svg>
);

const GlobeIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
  </svg>
);

const MainNavbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = () => {
    setIsLoading(true);
    window.location.href = 'https://aispry.com/login/';
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <nav className="main-navbar">
      <div className="navbar-container">
        {/* Left Side - Logo and Search */}
        <div className="navbar-left">
          <div className="navbar-logo">
            <img
              src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png"
              alt="AiTutor Logo"
              className="logo-image"
            />
          </div>
          <div className="navbar-search">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
            />
          </div>
        </div>

        {/* Right Side - Navigation Links */}
        <div className="navbar-right">
          <button className="pricing-btn">Plans & Pricing</button>
          <div className="auth-links">
            <button className="login-btn" onClick={handleLoginClick}>Log in</button>
            <span className="auth-divider">|</span>
            <button className="signup-btn" onClick={handleLoginClick}>Sign Up</button>
          </div>
          <button className="contact-btn"><GlobeIcon /> Contact</button>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;