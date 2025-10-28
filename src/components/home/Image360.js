import React, { useState, useRef } from 'react';
import './Image360.css';

const Image360 = ({ images = [], fallbackImage, alt = "360 view", className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);
  const dragThreshold = 15;

  // If only one image or no images array, show static image
  const isStatic = !images || images.length === 0;
  const displayImages = isStatic ? [fallbackImage] : images;

  const handleStart = (clientX) => {
    if (isStatic) return;
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging || isStatic || displayImages.length === 0) return;

    const deltaX = clientX - startX;
    const steps = Math.floor(Math.abs(deltaX) / dragThreshold);

    if (steps > 0) {
      const direction = deltaX > 0 ? -1 : 1;
      const newIndex = (currentIndex + direction * steps + displayImages.length) % displayImages.length;
      setCurrentIndex(newIndex);
      setStartX(clientX);
    }
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`image-360-container ${isDragging ? 'dragging' : ''} ${className}`}
      onMouseDown={(e) => {
        e.preventDefault();
        handleStart(e.clientX);
      }}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      {displayImages.map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`${alt} - angle ${index + 1}`}
          className={`image-360 ${index === currentIndex ? 'active' : 'hidden'}`}
          draggable="false"
        />
      ))}

      {!isStatic && displayImages.length > 1 && (
        <>
          <div className="rotation-hint">
            <span className="hint-icon">⟷</span>
            <span className="hint-text">Drag to rotate</span>
          </div>
          <div className="rotation-indicator">
            {currentIndex + 1}/{displayImages.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Image360;
