import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img
          src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png"
          alt="AiTutor Logo"
          className="loader-image"
        />
      </div>
    </div>
  );
};

export default Loader;
