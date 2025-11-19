import React from 'react';
import CourseIcon from './CourseIcon';
import './CourseCard.css';

/**
 * Unified Course Card Component
 * Supports 3 variants: slider (home), browse (courses), enrolled (my-courses)
 */
const CourseCard = ({
  course,
  variant = 'browse', // 'slider', 'browse', 'enrolled'
  onAction,
  actionText
}) => {

  // Slider variant - Used in Home page with hover expand effect
  if (variant === 'slider') {
    return (
      <article className="course-card course-card--slider slider-card">
        <div className="course-icon-container">
          <div className="course-card__icon-wrapper">
            {course.icon}
          </div>
        </div>
        <section className="course-content">
          <div className="course-content-top">
            <h3 className="course-card__title">{course.name}</h3>
            <p className="course-card__description">{course.description}</p>
          </div>
          <div className="course-content-bottom">
            {course.features && (
              <div className="course-card__features">
                {course.features.map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>
            )}
            <button className="course-card__btn" onClick={onAction}>
              {actionText || 'Learn More'}
            </button>
          </div>
        </section>
      </article>
    );
  }

  // Browse variant - Used in Courses page (browse all)
  if (variant === 'browse') {
    return (
      <article className="course-card course-card--browse">
        <div className="course-card__icon-wrapper">
          {typeof course.icon === 'string' ? (
            <CourseIcon iconName={course.icon} size={28} color="#ffffff" />
          ) : (
            course.icon
          )}
        </div>

        <div className="course-card__header">
          <h3 className="course-card__title">{course.courseName || course.name}</h3>
          <span className={`course-card__level level-${course.level?.toLowerCase()}`}>
            {course.level || 'Beginner'}
          </span>
        </div>

        <p className="course-card__description">{course.description}</p>

        <div className="course-card__details">
          <div className="detail-item">
            <span className="detail-icon">📚</span>
            <span className="detail-text">{course.category}</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon">⏱️</span>
            <span className="detail-text">{course.duration || `${course.durationMonths} months`}</span>
          </div>
          {course.price && (
            <div className="detail-item">
              <span className="detail-icon">💰</span>
              <span className="detail-text">₹{parseFloat(course.price).toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        <button className="course-card__btn course-card__btn--primary" onClick={onAction}>
          {actionText || 'Enroll Now'}
        </button>
      </article>
    );
  }

  // Enrolled variant - Used in My Courses page
  if (variant === 'enrolled') {
    return (
      <article className="course-card course-card--enrolled">
        <div className="course-card__accent-bar"></div>

        <section className="course-card__content">
          <div className="course-card__header-enrolled">
            <div className="course-card__icon-box">
              {typeof course.icon === 'string' ? (
                <CourseIcon iconName={course.icon} size={28} color="#ffffff" />
              ) : (
                course.icon
              )}
            </div>
            <div className="course-card__info">
              <h3 className="course-card__title">{course.courseName || course.name}</h3>
              <div className="course-card__meta">
                <span className={`course-card__level level-${course.level?.toLowerCase()}`}>
                  {course.level || 'Beginner'}
                </span>
                <span className="course-card__duration">{course.durationMonths || course.duration} mo</span>
              </div>
            </div>
          </div>

          <p className="course-card__description course-card__description--clamp">
            {course.description}
          </p>

          <div className="course-card__progress-section">
            <div className="progress-header">
              <span className="progress-label">PROGRESS</span>
              <span className="progress-value">{course.progress || 0}%</span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{width: `${course.progress || 0}%`}}
              ></div>
            </div>
          </div>

          <div className="course-card__info-grid">
            <div className="info-card">
              <span className="info-icon">📚</span>
              <div className="info-content">
                <div className="info-label">Modules</div>
                <div className="info-value">{course.modules || 12}</div>
              </div>
            </div>
            <div className="info-card">
              <span className="info-icon">💼</span>
              <div className="info-content">
                <div className="info-label">Projects</div>
                <div className="info-value">{course.projects || 5}</div>
              </div>
            </div>
          </div>

          {course.enrollmentDate && (
            <div className="course-card__enrollment-date">
              <span className="enrollment-icon">📅</span>
              <span>Enrolled {new Date(course.enrollmentDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}</span>
            </div>
          )}
        </section>

        <footer className="course-card__actions">
          <button className="course-card__btn course-card__btn--continue" onClick={onAction}>
            <span className="btn-icon">▶️</span>
            <span className="btn-text">{actionText || 'Continue'}</span>
          </button>
          <button className="course-card__btn course-card__btn--secondary">
            📄
          </button>
        </footer>
      </article>
    );
  }

  // Fallback
  return null;
};

export default CourseCard;
