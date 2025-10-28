import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <div className="loader-logo">
          <img
            src="/images/logo-06.png"
            alt="Loading..."
            className="loader-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
