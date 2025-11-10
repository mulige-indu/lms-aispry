import React, { useState } from 'react';
import MainNavbar from './MainNavbar';
import './Apply.css';

// ✅ SVG ICONS (self-contained, reusable)
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#667eea"/>
  </svg>
);

const CommentIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" fill="#667eea"/>
  </svg>
);

const SendIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="#667eea"/>
  </svg>
);

// Other SVG ICONS (self-contained, reusable)
const InstructorIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
  </svg>
);

const HeadsetIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 1c-4.97 0-9 4.03-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7c0-4.97-4.03-9-9-9z"/>
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M12 2L9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24l-7.19-.61L12 2zm0 4.25l1.45 3.45 3.75.33-2.84 2.46.85 3.67L12 14.4l-3.21 1.76.85-3.67-2.84-2.46 3.75-.33L12 6.25z"/>
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
  </svg>
);

const LaptopIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
    <path d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"/>
  </svg>
);

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    education: '',
    experience: '',
    program: '',
    motivation: '',
    goals: '',
    availability: '',
    budget: ''
  });

  const totalSteps = 4;

  const programs = [
    { id: 'ai-ml', name: 'AI & Machine Learning Mastery', price: '$2,999', duration: '12 months' },
    { id: 'data-science', name: 'Full Stack Data Science', price: '$2,499', duration: '10 months' },
    { id: 'cloud-devops', name: 'Cloud DevOps Engineering', price: '$2,199', duration: '8 months' },
    { id: 'cybersecurity', name: 'Cybersecurity Specialist', price: '$2,799', duration: '9 months' },
    { id: 'blockchain', name: 'Blockchain & Web3 Development', price: '$1,999', duration: '6 months' },
    { id: 'ui-ux', name: 'UI/UX Design with AI Tools', price: '$1,599', duration: '5 months' }
  ];

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany',
    'France', 'Netherlands', 'Singapore', 'India', 'Japan', 'Other'
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application submitted:', formData);
    // Handle form submission here
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label>First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Country *</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your country</option>
                {countries.map((country, index) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2>Background & Experience</h2>
            <div className="form-group">
              <label>Highest Education Level *</label>
              <select
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                required
              >
                <option value="">Select education level</option>
                <option value="high-school">High School</option>
                <option value="bachelors">Bachelor's Degree</option>
                <option value="masters">Master's Degree</option>
                <option value="phd">PhD</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Professional Experience *</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              >
                <option value="">Select experience level</option>
                <option value="0-1">0-1 years</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5-10">5-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>
            <div className="form-group">
              <label>Why do you want to join this program? *</label>
              <textarea
                name="motivation"
                value={formData.motivation}
                onChange={handleInputChange}
                rows="4"
                placeholder="Tell us about your motivation and what you hope to achieve..."
                required
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h2>Program Selection</h2>
            <div className="programs-grid">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className={`program-card ${formData.program === program.id ? 'selected' : ''}`}
                  onClick={() => setFormData({...formData, program: program.id})}
                >
                  <div className="program-header">
                    <h3>{program.name}</h3>
                    <div className="program-details">
                      <span className="program-price">{program.price}</span>
                      <span className="program-duration">{program.duration}</span>
                    </div>
                  </div>
                  <div className="program-selector">
                    <input
                      type="radio"
                      name="program"
                      value={program.id}
                      checked={formData.program === program.id}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="form-group">
              <label>Career Goals *</label>
              <textarea
                name="goals"
                value={formData.goals}
                onChange={handleInputChange}
                rows="3"
                placeholder="What are your specific career goals after completing this program?"
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>Additional Details</h2>
            <div className="form-group">
              <label>Time Availability *</label>
              <select
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                required
              >
                <option value="">Select your availability</option>
                <option value="full-time">Full-time (40+ hours/week)</option>
                <option value="part-time">Part-time (20-40 hours/week)</option>
                <option value="weekend">Weekend only (10-20 hours/week)</option>
                <option value="flexible">Flexible schedule</option>
              </select>
            </div>
            <div className="form-group">
              <label>Budget Confirmation *</label>
              <select
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                required
              >
                <option value="">Confirm your budget</option>
                <option value="pay-full">Pay in full (5% discount)</option>
                <option value="installments">Monthly installments</option>
                <option value="scholarship">Need scholarship assistance</option>
                <option value="employer">Employer sponsored</option>
              </select>
            </div>

            <div className="application-summary">
              <h3>Application Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <span className="summary-label">Name:</span>
                  <span className="summary-value">{formData.firstName} {formData.lastName}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Email:</span>
                  <span className="summary-value">{formData.email}</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Program:</span>
                  <span className="summary-value">
                    {programs.find(p => p.id === formData.program)?.name || 'Not selected'}
                  </span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Experience:</span>
                  <span className="summary-value">{formData.experience} years</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <MainNavbar />
      <div className="apply-container">
      <div className="apply-bg-effects">
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>
        <div className="geometric-shapes">
          <div className="triangle triangle-1"></div>
          <div className="triangle triangle-2"></div>
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>
      </div>

      <div className="application-container">
        <div className="application-wrapper">
          <div className="progress-section">
            <div className="progress-bar">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`progress-step ${currentStep >= step ? 'active' : ''} ${currentStep === step ? 'current' : ''}`}
                >
                  <div className="step-circle">
                    {currentStep > step ? '✓' : step}
                  </div>
                  <span className="step-label">
                    {step === 1 && 'Personal Info'}
                    {step === 2 && 'Background'}
                    {step === 3 && 'Program'}
                    {step === 4 && 'Review'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <form className="application-form" onSubmit={handleSubmit}>
            {renderStep()}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="nav-btn prev-btn" onClick={prevStep}>
                  ← Previous
                </button>
              )}
              <div className="step-info">
                Step {currentStep} of {totalSteps}
              </div>
              {currentStep < totalSteps ? (
                <button type="button" className="nav-btn next-btn" onClick={nextStep}>
                  Next →
                </button>
              ) : (
                <button type="submit" className="nav-btn submit-btn">
                  Submit Application
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="application-sidebar">
          <div className="benefits-card">
            <h3>Why Choose 360DigiTMG?</h3>
            <ul className="benefits-list">
              <li><span style={{marginRight: '8px', color: '#667eea', display: 'inline-flex', alignItems: 'center'}}><InstructorIcon /></span> Industry-expert instructors</li>
              <li><span style={{marginRight: '8px', color: '#667eea', display: 'inline-flex', alignItems: 'center'}}><ChartIcon /></span> 95% job placement rate</li>
              <li><span style={{marginRight: '8px', color: '#667eea', display: 'inline-flex', alignItems: 'center'}}><HeadsetIcon /></span> Career support & mentorship</li>
              <li><span style={{marginRight: '8px', color: '#667eea', display: 'inline-flex', alignItems: 'center'}}><AwardIcon /></span> Global certification</li>
              <li><span style={{marginRight: '8px', color: '#667eea', display: 'inline-flex', alignItems: 'center'}}><UsersIcon /></span> Lifetime alumni network</li>
              <li><span style={{marginRight: '8px', color: '#667eea', display: 'inline-flex', alignItems: 'center'}}><LaptopIcon /></span> Comprehensive curriculum</li>
            </ul>
          </div>

          <div className="support-card">
            <h3>Need Help?</h3>
            <p>Our admissions team is here to assist you throughout the application process.</p>
            <div className="support-options">
              <button className="support-btn"><span style={{marginRight: '8px', display: 'inline-flex'}}><PhoneIcon /></span> Schedule Call</button>
              <button className="support-btn"><span style={{marginRight: '8px', display: 'inline-flex'}}><CommentIcon /></span> Live Chat</button>
              <button className="support-btn"><span style={{marginRight: '8px', display: 'inline-flex'}}><SendIcon /></span> Email Support</button>
            </div>
          </div>

          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The application process was smooth and the support team helped me every step of the way. Best decision I ever made!"</p>
              <div className="testimonial-author">
                
                <div>
                  <strong>Sarah Johnson</strong>
                  <span>AI Engineer at Google</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Apply;