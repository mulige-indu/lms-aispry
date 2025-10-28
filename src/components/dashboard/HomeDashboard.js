import React from 'react';

const HomeDashboard = () => {
  const allFreeOfferings = [
    { icon: '💻', text: 'Free Live Class', bgColor: '#f0f7ff', description: 'Join live coding sessions' },
    { icon: '📹', text: 'Live Masterclass', bgColor: '#faf5ff', description: 'Learn from industry experts' },
    { icon: '🤖', text: 'AI Mock Interview', new: true, bgColor: '#f0f7ff', description: 'Practice with AI interviewer' },
    { icon: '🎯', text: 'Career Roadmap', bgColor: '#fffbeb', description: 'Get personalized career path' },
    { icon: '📚', text: 'Curriculum', bgColor: '#faf5ff', description: 'Explore course structure' },
    { icon: '👨‍🏫', text: 'Instructors', bgColor: '#fffbeb', description: 'Meet your mentors' },
    { icon: '🚀', text: 'Scaler Benefits', bgColor: '#f0fdf4', description: 'Discover all perks' },
    { icon: '🤝', text: '1:1 Expert Connect', bgColor: '#f0f7ff', description: 'Talk to industry leaders' },
    { icon: '📊', text: 'Placement Report', bgColor: '#fef2f2', description: 'View placement stats' },
    { icon: '🎓', text: 'Scaler Eligibility Test', bgColor: '#f0f7ff', description: 'Take assessment test' },
    { icon: '🏆', text: 'IIT-R Certification', bgColor: '#f5f3ff', description: 'Get certified' },
    { icon: '📝', text: 'AI Resume Review', bgColor: '#faf5ff', description: 'Optimize your resume' },
    { icon: '🎬', text: 'View Masterclass', bgColor: '#fff7ed', description: 'Watch recorded sessions' },
    { icon: '🤖', text: 'Explore AI', bgColor: '#f0f9ff', description: 'AI-powered features' },
    { icon: '👥', text: 'Alumni Profiles', bgColor: '#faf5ff', description: 'Connect with alumni' },
  ];

  const navigationTabs = [
    'Coding Problems',
    'Guidance Sessions',
    'Premium Classes',
    'Expert Guidance',
    'Success Stories'
  ];

  return (
    <div className="home-dashboard">
      {/* Horizontal Navigation Tabs */}
      <div className="horizontal-tabs">
        {navigationTabs.map((tab, index) => (
          <button key={index} className={index === 0 ? 'tab-btn active' : 'tab-btn'}>
            {tab}
          </button>
        ))}
      </div>

      {/* Main Grid with Right Sidebar */}
      <div className="dashboard-main-layout">
        {/* Left/Main Area */}
        <div className="main-area">
          {/* All Free Offerings Section */}
          <div className="offerings-section">
            <div className="section-title-bar">
              <h2 className="section-title">All Free Offerings</h2>
              <p className="section-subtitle">Explore everything Scaler has to offer</p>
            </div>
            <div className="offerings-grid-scaler">
              {allFreeOfferings.map((item, index) => (
                <div className="offering-card-scaler" key={index} style={{ backgroundColor: item.bgColor }}>
                  <div className="offering-icon-scaler">{item.icon}</div>
                  <div className="offering-content">
                    <h3>{item.text}</h3>
                    {item.description && <p className="offering-desc">{item.description}</p>}
                  </div>
                  {item.new && <span className="offering-badge-scaler">NEW</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Unlock Premium Banner */}
          <div className="unlock-premium-section">
            <div className="unlock-header">
              <h2>🎯 Unlock Premium Experience</h2>
              <p>Complete 3 simple steps to experience Scaler Premium for FREE</p>
            </div>
            <div className="steps-container">
              <div className="step-item">
                <div className="step-circle">1</div>
                <div className="step-content">
                  <h3>Register for Guidance Session</h3>
                  <p>Book a 1:1 session with our Data Science Expert</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-circle">2</div>
                <div className="step-content">
                  <h3>Attend Free Masterclass</h3>
                  <p>Join our live masterclass and learn from industry leaders</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-circle">3</div>
                <div className="step-content">
                  <h3>Get Your Career Roadmap</h3>
                  <p>Receive personalized career guidance and learning path</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HomeDashboard;
