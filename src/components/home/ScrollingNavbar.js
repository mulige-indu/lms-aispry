import React from 'react';
import './ScrollingNavbar.css';

// Custom SVG Star Icon
const StarFourFill = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M12 2l2.4 7.2H22l-6 4.8 2.4 7.2L12 16l-6.4 5.2L8 14 2 9.2h7.6z"/>
  </svg>
);

const ScrollingNavbar = () => {
  const navItems = [
    'Data Science & Deep Learning',
    'Data Analytics & Business Intelligence',
    'MLOps',
    'Data Engineering',
    'Gen AI',
    'Domain Analytics'
  ];

  return (
    <nav className="scrolling-navbar">
      <div className="scrolling-content">
        <div className="scroll-track">
          {navItems.map((item, index) => (
            <React.Fragment key={`first-${index}`}>
              <span className="nav-item">
                {item}
              </span>
              <span className="star-separator"><StarFourFill /></span>
            </React.Fragment>
          ))}
          {navItems.map((item, index) => (
            <React.Fragment key={`second-${index}`}>
              <span className="nav-item">
                {item}
              </span>
              <span className="star-separator"><StarFourFill /></span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ScrollingNavbar;