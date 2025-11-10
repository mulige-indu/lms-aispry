import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqlM-yC-LgqF3V_GabuCorzMsvxHUY6ifABA&s"
          alt="Loading..."
          className="loader-image"
        />
      </div>
    </div>
  );
};

export default Loader;
