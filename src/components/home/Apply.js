import React, { useState } from 'react';
import MainNavbar from './MainNavbar';
import './Apply.css';
import {
  FaGraduationCap, FaBolt, FaBullseye, FaMoneyBillWave,
  FaPhone, FaComments, FaEnvelope, FaRocket, FaHandshake,
  FaBook, FaGlobe
} from 'react-icons/fa';

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

      <div className="apply-hero">
        <div className="hero-content">
          <div className="hero-announcement">
            <span className="announcement-icon"><FaGraduationCap size={24} /></span>
            <span>Limited Time: Early Bird Discount Available!</span>
          </div>

          <h1 className="hero-title">
            Start Your <span className="gradient-text">Transformation Journey</span>
          </h1>
          <p className="hero-subtitle">
            Take the first step towards your dream career with our comprehensive application process
          </p>

          <div className="hero-features">
            <div className="feature-highlight">
              <div className="feature-icon"><FaBolt size={32} /></div>
              <span>5-minute application</span>
            </div>
            <div className="feature-highlight">
              <div className="feature-icon"><FaBullseye size={32} /></div>
              <span>Instant feedback</span>
            </div>
            <div className="feature-highlight">
              <div className="feature-icon"><FaMoneyBillWave size={32} /></div>
              <span>Scholarship available</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="application-preview">
            <div className="preview-screen">
              <div className="screen-header">
                <div className="screen-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="screen-content">
                <div className="form-preview">
                  <div className="input-line"></div>
                  <div className="input-line short"></div>
                  <div className="input-line"></div>
                  <div className="input-line medium"></div>
                </div>
              </div>
            </div>
            <div className="preview-stats">
              <div className="stat-circle">
                <span>95%</span>
                <label>Success Rate</label>
              </div>
              <div className="stat-circle">
                <span>2.5k</span>
                <label>This Month</label>
              </div>
            </div>
          </div>
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
              <li><FaBullseye size={24} style={{marginRight: '8px', color: '#d5842e'}} /> Industry-expert instructors</li>
              <li><FaRocket size={24} style={{marginRight: '8px', color: '#d5842e'}} /> 95% job placement rate</li>
              <li><FaBriefcase size={24} style={{marginRight: '8px', color: '#d5842e'}} /> Career support & mentorship</li>
              <li><FaGlobe size={24} style={{marginRight: '8px', color: '#d5842e'}} /> Global certification</li>
              <li><FaHandshake size={24} style={{marginRight: '8px', color: '#d5842e'}} /> Lifetime alumni network</li>
              <li><FaBook size={24} style={{marginRight: '8px', color: '#d5842e'}} /> Comprehensive curriculum</li>
            </ul>
          </div>

          <div className="support-card">
            <h3>Need Help?</h3>
            <p>Our admissions team is here to assist you throughout the application process.</p>
            <div className="support-options">
              <button className="support-btn"><FaPhone size={20} style={{marginRight: '8px'}} /> Schedule Call</button>
              <button className="support-btn"><FaComments size={20} style={{marginRight: '8px'}} /> Live Chat</button>
              <button className="support-btn"><FaEnvelope size={20} style={{marginRight: '8px'}} /> Email Support</button>
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