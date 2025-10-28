import React from 'react';
import { PiStarFourFill } from 'react-icons/pi';
import './ScrollingNavbar.css';

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
              <PiStarFourFill className="star-separator" />
            </React.Fragment>
          ))}
          {navItems.map((item, index) => (
            <React.Fragment key={`second-${index}`}>
              <span className="nav-item">
                {item}
              </span>
              <PiStarFourFill className="star-separator" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default ScrollingNavbar;