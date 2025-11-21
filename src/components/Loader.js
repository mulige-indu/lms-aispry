import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img
          src="https://aispry.com/theme/university/assets/img/a-chatic.png"
          alt="Loading..."
          className="loader-image"
        />
      </div>
    </div>
  );
};

export default Loader;
