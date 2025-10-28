import React, { useState, useEffect, useRef } from 'react';
import './MobileSlider.css';

const MobileSlider = ({ children, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const sliderRef = useRef(null);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Convert children to array
  const items = React.Children.toArray(children);
  const totalSlides = items.length;

  // Handle touch start
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < totalSlides - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    if (isRightSwipe && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Next slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  // Previous slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // If not mobile, render children normally (grid layout)
  if (!isMobile) {
    return <div className={className}>{children}</div>;
  }

  // Mobile: render as slider
  return (
    <div className={`mobile-slider-container ${className}`}>
      <div
        className="mobile-slider-wrapper"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="mobile-slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.3s ease-in-out'
          }}
        >
          {items.map((item, index) => (
            <div key={index} className="mobile-slider-slide">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      {currentIndex > 0 && (
        <button
          className="slider-nav slider-nav-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
      )}

      {currentIndex < totalSlides - 1 && (
        <button
          className="slider-nav slider-nav-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      )}

      {/* Dots Indicator */}
      <div className="slider-dots">
        {items.map((_, index) => (
          <button
            key={index}
            className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="slider-counter">
        {currentIndex + 1} / {totalSlides}
      </div>
    </div>
  );
};

export default MobileSlider;
