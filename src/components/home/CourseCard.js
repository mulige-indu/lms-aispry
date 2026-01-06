import React from 'react';
import './CourseCard.css';

/**
 * Course Card Component - Slider variant for Home page
 */
const CourseCard = ({
  course,
  onAction,
  actionText
}) => {
  return (
    <article className="course-card course-card--slider slider-card">
      <div className="slider-card__image-area">
        {course.image && (
          <img
            src={course.image}
            alt={course.name}
            className="slider-card__image"
          />
        )}
      </div>
      <div className="slider-card__title-wrapper">
        <h3 className="course-card__title slider-card__title-clickable">
          {course.name}
        </h3>
        <div className="slider-card__details">
          {course.features && (
            <div className="course-card__features">
              {course.features.map((feature, idx) => (
                <span key={idx} className="feature-tag">{feature}</span>
              ))}
            </div>
          )}
          <button className="course-card__btn" onClick={onAction}>
            {actionText || 'Continue Learning'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
