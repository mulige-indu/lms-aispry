import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    educationLevel: '',
    currentRole: '',
    experienceYears: 0,
    preferredCourse: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateStep1 = () => {
    const stepErrors = {};

    if (!formData.firstName.trim()) {
      stepErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      stepErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      stepErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      stepErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      stepErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      stepErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      stepErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.phone.trim()) {
      stepErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      stepErrors.phone = 'Phone number must be 10 digits';
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep1()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('student', JSON.stringify({
          id: data.data.studentId,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        }));

        alert('Registration successful! Welcome to 360DigiTMG!');
        // Redirect to courses page
        navigate('/courses');
      } else {
        // Show detailed validation errors if available
        if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map(err => err.msg).join('\n');
          setErrors({ general: errorMessages });
        } else {
          setErrors({ general: data.message });
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-header">
          <button className="back-btn" onClick={handleBackToHome}>
            ← Back to Home
          </button>
          <div className="signup-logo">
            <img
              src="/images/logo-06.png"
              alt="AiTutor Logo"
              className="signup-logo-image"
            />
          </div>
        </div>

        <div className="signup-content">
          <div className="signup-form-container">
            <h2 className="signup-title">Join 360DigiTMG</h2>
            <p className="signup-subtitle">Start your tech career journey with us</p>

            <div className="signup-progress">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <label>Basic Info</label>
              </div>
              <div className="step-connector"></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <label>Additional Info</label>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="signup-form">
              {errors.general && (
                <div className="error-message general-error">
                  {errors.general}
                </div>
              )}

              {currentStep === 1 && (
                <div className="form-step">
                  <h3>Basic Information</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className={errors.firstName ? 'error' : ''}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>

                    <div className="form-group">
                      <label>Last Name *</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={errors.lastName ? 'error' : ''}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? 'error' : ''}
                      placeholder="Enter your email"
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Password *</label>
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={errors.password ? 'error' : ''}
                        placeholder="Create a password"
                      />
                      {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>

                    <div className="form-group">
                      <label>Confirm Password *</label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={errors.confirmPassword ? 'error' : ''}
                        placeholder="Confirm your password"
                      />
                      {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={errors.phone ? 'error' : ''}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handleNextStep} className="next-btn">
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="form-step">
                  <h3>Additional Information (Optional)</h3>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Date of Birth</label>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Gender</label>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows="2"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                      />
                    </div>

                    <div className="form-group">
                      <label>State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        placeholder="Enter your state"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Country</label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        placeholder="Enter your country"
                      />
                    </div>

                    <div className="form-group">
                      <label>Pincode</label>
                      <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        placeholder="Enter your pincode"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Education Level</label>
                      <select
                        name="educationLevel"
                        value={formData.educationLevel}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Education</option>
                        <option value="High School">High School</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Current Role</label>
                      <input
                        type="text"
                        name="currentRole"
                        value={formData.currentRole}
                        onChange={handleInputChange}
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Experience (Years)</label>
                      <input
                        type="number"
                        name="experienceYears"
                        value={formData.experienceYears}
                        onChange={handleInputChange}
                        min="0"
                        max="50"
                      />
                    </div>

                    <div className="form-group">
                      <label>Preferred Course</label>
                      <select
                        name="preferredCourse"
                        value={formData.preferredCourse}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Course</option>
                        <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                        <option value="Machine Learning Mastery">Machine Learning Mastery</option>
                        <option value="AI & Deep Learning">AI & Deep Learning</option>
                        <option value="Business Analytics">Business Analytics</option>
                        <option value="Big Data Engineering">Big Data Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button type="button" onClick={handlePrevStep} className="prev-btn">
                      Previous
                    </button>
                    <button type="submit" disabled={isLoading} className="signup-btn">
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                  </div>
                </div>
              )}
            </form>

            <div className="signup-footer">
              <p>
                Already have an account?{' '}
                <button onClick={handleLoginRedirect} className="login-link">
                  Login here
                </button>
              </p>
            </div>
          </div>

          <div className="signup-side-panel">
            <div className="panel-content">
              <h3>Why Choose 360DigiTMG?</h3>
              <p>Join thousands of students who have transformed their careers with our industry-leading courses.</p>

              <div className="benefits">
                <div className="benefit-item">
                  <span className="benefit-icon">🎯</span>
                  <span>Industry-relevant curriculum</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">👨‍🏫</span>
                  <span>Expert mentors and instructors</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">💼</span>
                  <span>100% placement assistance</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🏆</span>
                  <span>Industry certifications</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon">🚀</span>
                  <span>Hands-on projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;