import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
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

  const validateForm = () => {
    const formErrors = {};

    if (!formData.email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      formErrors.password = 'Password is required';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      console.log('Attempting login with:', { email: formData.email });
      console.log('Fetching URL:', '/api/auth/login');

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response:', text);
        throw new Error('Server returned invalid response. Please ensure the backend server is running on port 8080.');
      }

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        // Store token and student data in localStorage
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('student', JSON.stringify({
          id: data.data.studentId,
          firstName: data.data.firstName,
          lastName: data.data.lastName,
          email: data.data.email
        }));

        // Redirect to courses page
        navigate('/courses');
      } else {
        setErrors({ general: data.message || 'Login failed. Please try again.' });
      }
    } catch (error) {
      console.error('Login error details:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);

      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        setErrors({ general: 'Cannot connect to server. Please ensure the backend server is running on port 8080.' });
      } else {
        setErrors({ general: error.message || 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
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
              src="https://aispry.com/pluginfile.php/1/theme_university/logo/1760548222/AiTutor-Logo-w.png"
              alt="AiTutor Logo"
              className="signup-logo-image"
            />
          </div>
        </div>

        <div className="signup-content">
          <div className="signup-form-container">
            <h2 className="signup-title">Welcome Back</h2>
            <p className="signup-subtitle">Login to continue your learning journey</p>

            <form onSubmit={handleSubmit} className="signup-form">
              {errors.general && (
                <div className="error-message general-error">
                  {errors.general}
                </div>
              )}

              <div className="form-step">
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

                <div className="form-group">
                  <label>Password *</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={errors.password ? 'error' : ''}
                    placeholder="Enter your password"
                  />
                  {errors.password && <span className="error-text">{errors.password}</span>}
                </div>

                <div className="form-actions">
                  <button type="submit" disabled={isLoading} className="signup-btn">
                    {isLoading ? 'Logging in...' : 'Login'}
                  </button>
                </div>
              </div>
            </form>

            <div className="signup-footer">
              <p>
                Don't have an account?{' '}
                <button onClick={handleSignupRedirect} className="login-link">
                  Sign up here
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
                  <span className="benefit-icon"><img src="https://img.icons8.com/fluency/32/bullseye.png" alt="target" /></span>
                  <span>Industry-relevant curriculum</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon"><img src="https://img.icons8.com/fluency/32/teacher.png" alt="mentor" /></span>
                  <span>Expert mentors and instructors</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon"><img src="https://img.icons8.com/fluency/32/briefcase.png" alt="placement" /></span>
                  <span>100% placement assistance</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon"><img src="https://img.icons8.com/fluency/32/trophy.png" alt="certification" /></span>
                  <span>Industry certifications</span>
                </div>
                <div className="benefit-item">
                  <span className="benefit-icon"><img src="https://img.icons8.com/fluency/32/rocket.png" alt="projects" /></span>
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

export default Login;