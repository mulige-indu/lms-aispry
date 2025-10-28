import React, { useState } from 'react';
import './DigitmgDashboardContent.css';

const DigitmgDashboardContent = () => {
  const [activeTab, setActiveTab] = useState('Guidance Sessions');

  return (
    <div className="mentee-content__dashboard mentee-content__dashboard--free-product">
      {/* Program Dropdown Selector */}
      <div className="dashboard-program-selector">
        <div className="program-selector-wrapper">
          <span className="program-icon">🎯</span>
          <span className="program-name">Data Science</span>
          <span className="dropdown-chevron">▼</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="dashboard-tabs">
        <div className="tabs-wrapper">
          {['Coding Problems', 'Guidance Sessions', 'Premium Classes', 'Expert Guidance', 'Success Stories'].map((tab) => (
            <button
              key={tab}
              className={`dashboard-tab ${activeTab === tab ? 'dashboard-tab--active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      {/* Feature Cards Section */}
      <div className="dashboard-features">
        <div className="features-grid-container">
          {/* Row 1 */}
          <div className="dashboard-feature-card">
            <span className="feature-card-icon">💻</span>
            <span className="feature-card-title">Free Live Class</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">📅</span>
            <span className="feature-card-title">Live Masterclass</span>
          </div>

          <div className="dashboard-feature-card dashboard-feature-card--highlighted">
            <span className="feature-card-icon">🎯</span>
            <span className="feature-card-title">AI-Mock Interviews</span>
            <span className="feature-card-badge">
              <img src="https://img.icons8.com/fluency/16/star.png" alt="new" style={{verticalAlign: 'middle', marginRight: '4px'}} />
              NEW
            </span>
          </div>

          {/* Row 2 */}
          <div className="dashboard-feature-card">
            <span className="feature-card-icon">🧭</span>
            <span className="feature-card-title">Career Roadmap</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">📚</span>
            <span className="feature-card-title">Curriculum</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">👨‍🏫</span>
            <span className="feature-card-title">Instructors</span>
          </div>

          {/* Row 3 */}
          <div className="dashboard-feature-card">
            <span className="feature-card-icon">⭐</span>
            <span className="feature-card-title">360DigiTMG Benefits</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">🤝</span>
            <span className="feature-card-title">1:1 Expert Connect</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">📊</span>
            <span className="feature-card-title">Placement Report</span>
          </div>

          {/* Row 4 */}
          <div className="dashboard-feature-card">
            <span className="feature-card-icon">🎓</span>
            <span className="feature-card-title">Scholarship Test</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">🏆</span>
            <span className="feature-card-title">IIT-R Certification</span>
          </div>

          <div className="dashboard-feature-card">
            <span className="feature-card-icon">📝</span>
            <span className="feature-card-title">AI Resume Review</span>
          </div>
        </div>
      </div>

      {/* Premium Experience Section */}
      <section className="dashboard-premium-unlock">
        <h2 className="premium-unlock-title">3 steps to unlock Premium Experience</h2>

        {/* Step 1 */}
        <div className="premium-step">
          <div className="premium-step-indicator">
            <span className="step-number">1</span>
          </div>
          <div className="premium-step-content">
            <h3 className="step-heading">Register for guidance session with our Experts</h3>
          </div>
        </div>

        {/* Free Class Registration Card */}
        <div className="free-class-registration">
          <div className="class-video-container">
            <div className="video-thumbnail-wrapper">
              <button className="video-play-button" aria-label="Play video">
                ▶
              </button>
              <div className="video-attendance-badge">
                <span className="attendance-icon">👥</span>
                <span className="attendance-count">2k+ users attending</span>
              </div>
            </div>
          </div>

          <div className="class-registration-details">
            <h3 className="class-registration-title">
              Attend a Free Class to Experience The 360DigiTMG Data Science, AI & ML Program
            </h3>

            <div className="class-registration-meta">
              <div className="meta-info-item">
                <span className="meta-icon">📅</span>
                <span className="meta-text">Wed, 15 Oct</span>
              </div>
              <div className="meta-info-item">
                <span className="meta-icon">🕐</span>
                <span className="meta-text">07:00 PM - 09:00 PM</span>
              </div>
              <div className="meta-info-item meta-info-item--timer">
                <span className="meta-text">Starts in 26h : 06m</span>
              </div>
            </div>

            <button className="class-registration-button">
              Register with 1-Click
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitmgDashboardContent;
