import React, { useState } from 'react';
import authService from '../services/authService';
import './SignupForm.css';

const SignupForm = ({ onClose, onSwitchToLogin }) => {
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
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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

  const validateStep2 = () => {
    const stepErrors = {};

    if (!formData.dateOfBirth.trim()) {
      stepErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender.trim()) {
      stepErrors.gender = 'Gender is required';
    }

    if (!formData.address.trim()) {
      stepErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      stepErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      stepErrors.state = 'State is required';
    }

    if (!formData.country.trim()) {
      stepErrors.country = 'Country is required';
    }

    if (!formData.pincode.trim()) {
      stepErrors.pincode = 'Pincode is required';
    }

    if (!formData.educationLevel.trim()) {
      stepErrors.educationLevel = 'Education level is required';
    }

    if (!formData.currentRole.trim()) {
      stepErrors.currentRole = 'Current role is required';
    }

    if (!formData.preferredCourse.trim()) {
      stepErrors.preferredCourse = 'Preferred course is required';
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

    // Only submit from step 2 and validate both steps
    if (currentStep !== 2 || !validateStep1() || !validateStep2()) return;

    setIsLoading(true);

    try {
      // Create user object with ALL form data for Spring Boot backend
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        country: formData.country,
        pincode: formData.pincode,
        educationLevel: formData.educationLevel,
        currentRole: formData.currentRole,
        experienceYears: formData.experienceYears || 0,
        preferredCourse: formData.preferredCourse
      };

      console.log('Creating user with complete data:', userData);

      const result = await authService.signup(userData);

      if (result.success) {
        console.log('User created successfully:', result);

        // Show success popup
        setShowSuccessPopup(true);

        // Auto close popup and redirect after 3 seconds
        setTimeout(() => {
          setShowSuccessPopup(false);
          onClose();
          authService.redirectToCourses();
        }, 3000);
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Something went wrong. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-modal-overlay" onClick={onClose}>
      <div className="signup-modal" onClick={(e) => e.stopPropagation()}>
        <div className="signup-header">
          <h2>Join Scaler Academy</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="signup-progress">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
          <div className="step-connector"></div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
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
                  />
                  {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? 'error' : ''}
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
              <h3>Additional Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Date of Birth *</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={errors.dateOfBirth ? 'error' : ''}
                  />
                  {errors.dateOfBirth && <span className="error-text">{errors.dateOfBirth}</span>}
                </div>

                <div className="form-group">
                  <label>Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={errors.gender ? 'error' : ''}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <span className="error-text">{errors.gender}</span>}
                </div>
              </div>

              <div className="form-group">
                <label>Address *</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows="2"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-text">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label>State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-text">{errors.state}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Country *</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={errors.country ? 'error' : ''}
                  />
                  {errors.country && <span className="error-text">{errors.country}</span>}
                </div>

                <div className="form-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className={errors.pincode ? 'error' : ''}
                  />
                  {errors.pincode && <span className="error-text">{errors.pincode}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Education Level *</label>
                  <select
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleInputChange}
                    className={errors.educationLevel ? 'error' : ''}
                  >
                    <option value="">Select Education</option>
                    <option value="High School">High School</option>
                    <option value="Bachelor's Degree">Bachelor's Degree</option>
                    <option value="Master's Degree">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.educationLevel && <span className="error-text">{errors.educationLevel}</span>}
                </div>

                <div className="form-group">
                  <label>Current Role *</label>
                  <input
                    type="text"
                    name="currentRole"
                    value={formData.currentRole}
                    onChange={handleInputChange}
                    placeholder="e.g., Software Engineer"
                    className={errors.currentRole ? 'error' : ''}
                  />
                  {errors.currentRole && <span className="error-text">{errors.currentRole}</span>}
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
                  <label>Preferred Course *</label>
                  <select
                    name="preferredCourse"
                    value={formData.preferredCourse}
                    onChange={handleInputChange}
                    className={errors.preferredCourse ? 'error' : ''}
                  >
                    <option value="">Select Course</option>
                    <option value="Data Science Fundamentals">Data Science Fundamentals</option>
                    <option value="Machine Learning Mastery">Machine Learning Mastery</option>
                    <option value="AI & Deep Learning">AI & Deep Learning</option>
                    <option value="Business Analytics">Business Analytics</option>
                    <option value="Big Data Engineering">Big Data Engineering</option>
                  </select>
                  {errors.preferredCourse && <span className="error-text">{errors.preferredCourse}</span>}
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
            <button onClick={onSwitchToLogin} className="switch-btn">
              Login here
            </button>
          </p>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="success-popup-overlay">
          <div className="success-popup">
            <div className="success-icon">✓</div>
            <h3>Account Created Successfully!</h3>
            <p>Welcome to Scaler Academy! Redirecting to courses...</p>
            <div className="success-loader"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignupForm;