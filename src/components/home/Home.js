import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from '../../config';
import ScrollingNavbar from './ScrollingNavbar';
import MainNavbar from './MainNavbar';
import CourseCard from '../common/CourseCard';
import '../courses/CourseSlider.css';
import './AboutLeadership.css';
import './TrainingCenters.css';
import './AlumniSection.css';

const Home = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeatureSlide, setCurrentFeatureSlide] = useState(0);
  const [currentCenterSlide, setCurrentCenterSlide] = useState(0);

  // Touch gesture states
  const [featureTouchStart, setFeatureTouchStart] = useState(0);
  const [featureTouchEnd, setFeatureTouchEnd] = useState(0);
  const [centerTouchStart, setCenterTouchStart] = useState(0);
  const [centerTouchEnd, setCenterTouchEnd] = useState(0);

  const navigate = useNavigate();

  // Course data
  const courses = [
    {
      icon: <img src="https://img.icons8.com/fluency/48/bar-chart.png" alt="data science" />,
      name: 'Data Science',
      description: 'Master Python, Machine Learning, and Statistical Analysis',
      features: ['6 Months', 'Live Projects', 'Job Assistance']
    },
    {
      icon: <img src="https://img.icons8.com/fluency/48/robot.png" alt="AI" />,
      name: 'Artificial Intelligence',
      description: 'Deep Learning, Neural Networks, and AI Applications',
      features: ['8 Months', 'Industry Projects', 'Certifications']
    },
    {
      icon: <img src="https://img.icons8.com/fluency/48/up-graph.png" alt="analytics" />,
      name: 'Business Analytics',
      description: 'Excel, Tableau, Power BI, and Business Intelligence',
      features: ['4 Months', 'Case Studies', 'Global Certification']
    },
    {
      icon: <img src="https://img.icons8.com/fluency/48/cloud.png" alt="cloud" />,
      name: 'Cloud Computing',
      description: 'AWS, Azure, Google Cloud Platform and DevOps',
      features: ['5 Months', 'Hands-on Labs', 'Cloud Certifications']
    },
    {
      icon: <img src="https://img.icons8.com/fluency/48/python.png" alt="python" />,
      name: 'Python Programming',
      description: 'Full Stack Python Development and Web Applications',
      features: ['3 Months', 'Portfolio Projects', 'Mentorship']
    },
    {
      icon: <img src="https://img.icons8.com/fluency/48/security-lock.png" alt="security" />,
      name: 'Cyber Security',
      description: 'Ethical Hacking, Network Security, and Digital Forensics',
      features: ['7 Months', 'Lab Simulations', 'Security Certifications']
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendSMS = async (phoneNumber, name) => {
    try {
      // SMS message content
      const message = `Dear ${name},

Thank you for booking a Free Live Class with 360DigiTMG!

What's Next:
- Check your email for class details
- Our team will contact you within 24 hours
- Get ready to transform your career!

About 360DigiTMG:
- 15,000+ successful placements
- Industry-expert trainers
- Global certifications
- 95% job placement rate

Contact: +91-40-23456789
Website: www.360digitmg.com
Email: info@360digitmg.com

We're excited to have you on this journey!

- Team 360DigiTMG`;

      // API endpoint for SMS service
      const response = await fetch('/api/send-sms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: phoneNumber,
          message: message,
          name: name
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send SMS message');
      }

      console.log('SMS message sent successfully to:', phoneNumber);
      return true;
    } catch (error) {
      console.error('Error sending SMS message:', error);
      // Don't fail the form submission if SMS fails
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

    try {
      // Call the reserve-seat API
      const response = await fetch(`${API_BASE_URL}/reserve-seat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });

      const data = await response.json();

      if (data.success) {
        // Send SMS message to the student (optional)
        // Note: SMS is now handled by backend, not frontend
        // try {
        //   await sendSMS(formData.phone, formData.name);
        // } catch (smsError) {
        //   console.log('SMS sending failed:', smsError);
        //   // Continue even if SMS fails
        // }

        setIsSubmitting(false);
        setSubmitSuccess(true);

        // Reset form after a delay
        setTimeout(() => {
          setSubmitSuccess(false);
          setFormData({ name: '', email: '', phone: '' });
        }, 5000);
      } else {
        alert(data.message || 'Failed to reserve seat. Please try again.');
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to reserve seat. Please check your connection and try again.');
      setIsSubmitting(false);
    }
  };

  const handleLearnMore = () => {
    navigate("/courses");
  };

  // Course slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % courses.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + courses.length) % courses.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Features slider navigation
  const nextFeatureSlide = () => {
    setCurrentFeatureSlide((prev) => (prev + 1) % 8); // 8 feature cards
  };

  const prevFeatureSlide = () => {
    setCurrentFeatureSlide((prev) => (prev - 1 + 8) % 8);
  };

  const goToFeatureSlide = (index) => {
    setCurrentFeatureSlide(index);
  };

  // Training centers slider navigation
  const nextCenterSlide = () => {
    setCurrentCenterSlide((prev) => (prev + 1) % 4); // 4 training center cards
  };

  const prevCenterSlide = () => {
    setCurrentCenterSlide((prev) => (prev - 1 + 4) % 4);
  };

  const goToCenterSlide = (index) => {
    setCurrentCenterSlide(index);
  };

  // Touch gesture handlers for features slider
  const handleFeatureTouchStart = (e) => {
    setFeatureTouchStart(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchMove = (e) => {
    setFeatureTouchEnd(e.targetTouches[0].clientX);
  };

  const handleFeatureTouchEnd = () => {
    if (!featureTouchStart || !featureTouchEnd) return;
    const distance = featureTouchStart - featureTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentFeatureSlide < 7) {
      nextFeatureSlide();
    }
    if (isRightSwipe && currentFeatureSlide > 0) {
      prevFeatureSlide();
    }

    setFeatureTouchStart(0);
    setFeatureTouchEnd(0);
  };

  // Touch gesture handlers for centers slider
  const handleCenterTouchStart = (e) => {
    setCenterTouchStart(e.targetTouches[0].clientX);
  };

  const handleCenterTouchMove = (e) => {
    setCenterTouchEnd(e.targetTouches[0].clientX);
  };

  const handleCenterTouchEnd = () => {
    if (!centerTouchStart || !centerTouchEnd) return;
    const distance = centerTouchStart - centerTouchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentCenterSlide < 3) {
      nextCenterSlide();
    }
    if (isRightSwipe && currentCenterSlide > 0) {
      prevCenterSlide();
    }

    setCenterTouchStart(0);
    setCenterTouchEnd(0);
  };

  return (
    <div className="App">
      <ScrollingNavbar />
      <MainNavbar />

      <div className="main-content">
        <div className="hero-heading">
          <h1>Become the Top 1% in Tech</h1>
        </div>

        <section className="video-booking-section">
          <aside className="video-aside">
            <div className="video-container">
              <video id="background-video" controls loading="lazy" className="course-video">
					<source src="https://360digit.b-cdn.net/assets/video/thankyou.mp4" type="video/mp4"/>
					<source src="https://360digit.b-cdn.net/assets/video/thankyou.webm" type="video/webm"/>  
				          </video>
            </div>

            <div className="video-info">
              <h3>Unlock Your Potential with an AI-Driven Curriculum</h3>

              <div className="course-features">
                <ul className="features-list compact">
                  <li>✓ Master cutting-edge AI & ML with a curriculum designed by industry titans.</li>
                  <li>✓ Build a portfolio of real-world projects, from predictive modeling to neural networks.</li>
                  <li>✓ Receive personalized career coaching and land interviews at top-tier tech companies.</li>
                </ul>
              </div>
            </div>
          </aside>

          <aside className="booking-aside">
            <div className="booking-form-container">
              <div className="form-header compact">
                <h2 className="booking-heading">Book Your Free Live Class</h2>
              </div>

              {submitSuccess ? (
                <div className="form-success-message">
                  <h3>✅ Thank You!</h3>
                  <p>Your seat for the free live class has been reserved. We've sent the details to your email.</p>
                </div>
              ) : (
                <form className="student-form" onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`form-input modern ${errors.name ? 'error' : ''}`}
                      required
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`form-input modern ${errors.email ? 'error' : ''}`}
                      required
                    />
                    {errors.email && <span className="error-text">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`form-input modern ${errors.phone ? 'error' : ''}`}
                      required
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <button type="submit" className="submit-btn modern" disabled={isSubmitting}>
                    {isSubmitting ? 'Reserving...' : 'Reserve Your Seat'}
                  </button>

                  <div className="form-footer compact">
                    <p className="guarantee-text">Free Session • No Card Required</p>
                  </div>
                </form>
              )}

              <div className="form-highlights">
                <div className="form-highlight-item">
                  <span className="highlight-icon"><img src="https://img.icons8.com/fluency/24/book.png" alt="book" /></span>
                  <span>Preview our industry-vetted curriculum</span>
                </div>
                <div className="form-highlight-item">
                  <span className="highlight-icon"><img src="https://img.icons8.com/fluency/24/chat.png" alt="chat" /></span>
                  <span>Live Q&A with an industry expert</span>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section className="learner-outcomes">
          <div className="outcomes-container">
            <div className="outcomes-header">
              <h2 className="outcomes-title">Transform Your Career, Multiply Your Income</h2>
              <p className="outcomes-subtitle">Join 20,000+ professionals who transformed their careers and achieved 3x salary growth. Calculate your future tech salary potential.</p>
            </div>

            <div className="outcomes-dashboard">
              <div className="dashboard-left">
                <div className="potential-calculator">
                  <div className="calculator-header">
                    <h3>Career Growth Calculator</h3>
                    <p>See how much you could earn after upskilling</p>
                  </div>
                  <div className="calculator-content">
                    <div className="current-role">
                      <label>Current Role</label>
                      <select className="role-select">
                        <option>Select your current role</option>
                        <option>Student/Fresher</option>
                        <option>Software Developer</option>
                        <option>Business Analyst</option>
                        <option>Marketing Executive</option>
                        <option>Sales Representative</option>
                        <option>Teacher</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="experience-level">
                      <label>Experience Level</label>
                      <div className="experience-buttons">
                        <button className="exp-btn active">0-2 Years</button>
                        <button className="exp-btn">3-5 Years</button>
                        <button className="exp-btn">5+ Years</button>
                      </div>
                    </div>
                    <div className="potential-result">
                      <div className="result-card">
                        <div className="result-header">Your Potential Salary Growth</div>
                        <div className="salary-projection">
                          <div className="current-salary">
                            <span className="label">Current Range</span>
                            <span className="amount">₹2-5 LPA</span>
                          </div>
                          <div className="arrow-transform">→</div>
                          <div className="projected-salary">
                            <span className="label">After Program</span>
                            <span className="amount highlight">₹8-15 LPA</span>
                          </div>
                        </div>
                        <div className="growth-indicator">
                          <div className="growth-percentage">+200% Growth Potential</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-right">
                <div className="career-tracks">
                  <h3>Popular Career Tracks</h3>

                  <div className="track-card">
                    <div className="track-icon"><img src="https://img.icons8.com/fluency/32/bar-chart.png" alt="analytics" /></div>
                    <div className="track-info">
                      <h4>Data Analyst</h4>
                      <div className="track-details">
                        <span className="salary">₹4-8 LPA</span>
                        <span className="timeline">3-4 Months</span>
                      </div>
                      <div className="track-skills">
                        <span>Python</span>
                        <span>SQL</span>
                        <span>Tableau</span>
                      </div>
                    </div>
                    <div className="track-demand">High Demand</div>
                  </div>

                  <div className="track-card">
                    <div className="track-icon"><img src="https://img.icons8.com/fluency/32/robot.png" alt="AI" /></div>
                    <div className="track-info">
                      <h4>Data Scientist</h4>
                      <div className="track-details">
                        <span className="salary">₹8-15 LPA</span>
                        <span className="timeline">6-8 Months</span>
                      </div>
                      <div className="track-skills">
                        <span>Machine Learning</span>
                        <span>Python</span>
                        <span>Statistics</span>
                      </div>
                    </div>
                    <div className="track-demand">Very High</div>
                  </div>

                  <div className="track-card">
                    <div className="track-icon"><img src="https://img.icons8.com/fluency/32/brain.png" alt="ML" /></div>
                    <div className="track-info">
                      <h4>ML Engineer</h4>
                      <div className="track-details">
                        <span className="salary">₹12-25 LPA</span>
                        <span className="timeline">8-10 Months</span>
                      </div>
                      <div className="track-skills">
                        <span>Deep Learning</span>
                        <span>MLOps</span>
                        <span>Cloud</span>
                      </div>
                    </div>
                    <div className="track-demand">Extreme</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="success-metrics">
              <div className="metric-box">
                <div className="metric-number">15K+</div>
                <div className="metric-text">Successful Transitions</div>
              </div>
              <div className="metric-box">
                <div className="metric-number">180%</div>
                <div className="metric-text">Avg Salary Increase</div>
              </div>
              <div className="metric-box">
                <div className="metric-number">95%</div>
                <div className="metric-text">Job Placement Rate</div>
              </div>
              <div className="metric-box">
                <div className="metric-number">500+</div>
                <div className="metric-text">Hiring Partners</div>
              </div>
            </div>
          </div>
        </section>

        <section className="download-brochure">
          <div className="brochure-container">
            <div className="brochure-hero">
              <div className="hero-left">
                <div className="brochure-title-section">
                  <h2 className="brochure-main-title">Transform Your Career with AI & Data Science</h2>
                  <p className="brochure-tagline">Get our comprehensive program guide - packed with curriculum details, real-world projects, industry insights, and career transformation roadmaps.</p>
                </div>

                <div className="stats-showcase">
                  <div className="stat-box">
                    <span className="stat-value">50+</span>
                    <span className="stat-desc">Pages of Insights</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">100%</span>
                    <span className="stat-desc">Job Assistance</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-value">20K+</span>
                    <span className="stat-desc">Alumni Placed</span>
                  </div>
                </div>

                <div className="content-highlights">
                  <div className="highlight-row">
                    <span className="highlight-icon"><img src="https://img.icons8.com/fluency/24/books.png" alt="books" /></span>
                    <span className="highlight-desc">Master AI, ML & Data Science with expert-designed curriculum</span>
                  </div>
                  <div className="highlight-row">
                    <span className="highlight-icon"><img src="https://img.icons8.com/fluency/24/briefcase.png" alt="briefcase" /></span>
                    <span className="highlight-desc">Build 10+ real-world projects for your portfolio</span>
                  </div>
                  <div className="highlight-row">
                    <span className="highlight-icon"><img src="https://img.icons8.com/fluency/24/rocket.png" alt="growth" /></span>
                    <span className="highlight-desc">Career paths with 300%+ salary growth potential</span>
                  </div>
                </div>
              </div>

              <div className="hero-right">
                <div className="download-showcase">
                  <div className="brochure-preview">
                    <div className="preview-container">
                      <div className="page-stack">
                        <div className="page page-3">
                          <img src="https://picsum.photos/140/180?random=1" alt="Data Analytics" className="page-image" />
                        </div>
                        <div className="page page-2">
                          <img src="https://picsum.photos/140/180?random=2" alt="Machine Learning" className="page-image" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="download-action">
                    <div className="download-info">
                      <h3 className="info-title">Get Complete Program Details</h3>
                      <p className="info-description">Comprehensive guide with curriculum, projects, and career insights</p>
                    </div>

                    <button className="download-main-btn">
                      <span className="btn-icon">⬇</span>
                      <div className="btn-content">
                        <span className="btn-primary">Download Brochure</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="alumni-section">
          <div className="alumni-container">
            <div className="alumni-header">
              <h2 className="alumni-title">Trusted By 20,000+ Alumni Working At Top Companies</h2>
            </div>

            <div className="alumni-logos">
              <div className="logo-row scroll-right">
                <div className="logo-track">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Capgemini_Logo.svg/512px-Capgemini_Logo.svg.png" alt="Capgemini" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg" alt="Oracle" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/c5/Capgemini_Logo.svg/512px-Capgemini_Logo.svg.png" alt="Capgemini" className="company-logo-ai" />
                </div>
              </div>

              <div className="logo-row scroll-left">
                <div className="logo-track">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" alt="TCS" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cognizant_logo_2022.svg" alt="Cognizant" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/HCLTech_logo.svg" alt="HCL Technologies" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tech_Mahindra_New_Logo.svg/512px-Tech_Mahindra_New_Logo.svg.png" alt="Tech Mahindra" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" alt="IBM" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg" alt="Accenture" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg" alt="TCS" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg" alt="Wipro" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/4b/Cognizant_logo_2022.svg" alt="Cognizant" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c7/HCLTech_logo.svg" alt="HCL Technologies" className="company-logo-ai" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tech_Mahindra_New_Logo.svg/512px-Tech_Mahindra_New_Logo.svg.png" alt="Tech Mahindra" className="company-logo-ai" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="home-courses-section">
          <div className="home-courses-container">
            <div className="home-courses-header">
              <h2 className="home-courses-title">Find Your Perfect Program</h2>
              <p className="home-courses-subtitle">Explore our range of courses designed for every career stage.</p>
            </div>

            <div className="course-slider-container">
              <button className="slider-nav-btn prev" onClick={prevSlide} aria-label="Previous course">
                ‹
              </button>

              <div className="course-slider-wrapper">
                <div
                  className="course-slider-track"
                  data-current-slide={currentSlide}
                >
                  {courses.map((course, index) => (
                    <CourseCard
                      key={index}
                      variant="slider"
                      course={course}
                      onAction={handleLearnMore}
                      actionText="Learn More"
                    />
                  ))}
                </div>
              </div>

              <button className="slider-nav-btn next" onClick={nextSlide} aria-label="Next course">
                ›
              </button>

              <div className="slider-dots">
                {courses.map((_, index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-container">
            <div className="features-header">
              <h2 className="features-title">The 360DigiTMG Advantage</h2>
              <p className="features-subtitle">Everything You Need to Succeed in One Place</p>
            </div>

            <div className="features-slider-wrapper">
              <button className="slider-nav-btn prev" onClick={prevFeatureSlide} aria-label="Previous feature">
                ‹
              </button>

              <div
                className="features-grid"
                style={{ transform: `translateX(-${currentFeatureSlide * 100}%)` }}
                onTouchStart={handleFeatureTouchStart}
                onTouchMove={handleFeatureTouchMove}
                onTouchEnd={handleFeatureTouchEnd}
              >
              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/graduation-cap.png" alt="expert trainers" /></div>
                <h3 className="feature-title">Expert Trainers</h3>
                <p className="feature-description">Learn from industry professionals with 10+ years of experience in Data Science and AI</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/briefcase.png" alt="job assistance" /></div>
                <h3 className="feature-title">100% Job Assistance</h3>
                <p className="feature-description">Dedicated placement support with 15,000+ successful placements across top companies</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/trophy.png" alt="certification" /></div>
                <h3 className="feature-title">Global Certifications</h3>
                <p className="feature-description">Earn internationally recognized certifications from Microsoft, IBM, and other tech giants</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/synchronize.png" alt="live classes" /></div>
                <h3 className="feature-title">Live Interactive Classes</h3>
                <p className="feature-description">Real-time learning with live projects, doubt clearing sessions, and peer collaboration</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/lightning-bolt.png" alt="hands-on" /></div>
                <h3 className="feature-title">Hands-on Projects</h3>
                <p className="feature-description">Build real-world projects and create an impressive portfolio that stands out to employers</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/globe.png" alt="flexible learning" /></div>
                <h3 className="feature-title">Flexible Learning</h3>
                <p className="feature-description">Choose from weekday, weekend, or self-paced learning options that fit your schedule</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/books.png" alt="curriculum" /></div>
                <h3 className="feature-title">Comprehensive Curriculum</h3>
                <p className="feature-description">Updated syllabus covering latest tools and technologies used by industry leaders</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon"><img src="https://img.icons8.com/fluency/48/handshake.png" alt="lifetime support" /></div>
                <h3 className="feature-title">Lifetime Support</h3>
                <p className="feature-description">Get continuous support and access to updated materials even after course completion</p>
              </div>
              </div>

              <button className="slider-nav-btn next" onClick={nextFeatureSlide} aria-label="Next feature">
                ›
              </button>

              <div className="slider-dots">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentFeatureSlide ? 'active' : ''}`}
                    onClick={() => goToFeatureSlide(index)}
                    aria-label={`Go to feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="training-centers-section" aria-label="Training Centers">
          <div className="centers-container">
            <div className="centers-header">
              <h2 className="centers-title">Our Training Centers</h2>
              <p className="centers-subtitle">World-class facilities across India's leading tech hubs with state-of-the-art infrastructure</p>
            </div>

            <div className="centers-slider-wrapper">
              <button className="slider-nav-btn prev" onClick={prevCenterSlide} aria-label="Previous training center">
                ‹
              </button>

              <div
                className="centers-grid"
                role="list"
                style={{ transform: `translateX(-${currentCenterSlide * 100}%)` }}
                onTouchStart={handleCenterTouchStart}
                onTouchMove={handleCenterTouchMove}
                onTouchEnd={handleCenterTouchEnd}
              >
              <article className="center-card" role="listitem">
                <div className="center-icon" aria-hidden="true">
                  <img src={require('../../assets/images/Charminar.jpg')} alt="Charminar, Hyderabad" />
                </div>
                <h3 className="center-city">Hyderabad</h3>
                <div className="center-details">
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                    <span>Hi-Tech City, Madhapur</span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                    <span><a href="tel:+914023456789">+91 40 2345 6789</a></span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/students.png" alt="" aria-hidden="true" />
                    <span>5,000+ Students Trained</span>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem">
                <div className="center-icon" aria-hidden="true">
                  <img src="https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&h=400&fit=crop&auto=format&q=80" alt="" />
                </div>
                <h3 className="center-city">Bangalore</h3>
                <div className="center-details">
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" className=""/>
                    <span>Koramangala, BTM Layout</span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" className=""/>
                    <span><a href="tel:+918045678901">+91 80 4567 8901</a></span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/students.png" alt="" aria-hidden="true" className=""/>
                    <span>4,500+ Students Trained</span>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem">
                <div className="center-icon" aria-hidden="true">
                  <img src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop&auto=format&q=80&sat=10" alt="" />
                </div>
                <h3 className="center-city">Chennai</h3>
                <div className="center-details">
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                    <span>Velachery, Adyar</span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                    <span><a href="tel:+914467890123">+91 44 6789 0123</a></span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/students.png" alt="" aria-hidden="true" />
                    <span>3,500+ Students Trained</span>
                  </div>
                </div>
              </article>

              <article className="center-card" role="listitem">
                <div className="center-icon" aria-hidden="true">
                  <img src="https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=600&h=400&fit=crop&auto=format&q=80&contrast=10" alt="" />
                </div>
                <h3 className="center-city">Pune</h3>
                <div className="center-details">
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/marker.png" alt="" aria-hidden="true" />
                    <span>Hinjewadi, Wakad</span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/phone.png" alt="" aria-hidden="true" />
                    <span><a href="tel:+912034567890">+91 20 3456 7890</a></span>
                  </div>
                  <div className="detail-item">
                    <img src="https://img.icons8.com/fluency/20/students.png" alt="" aria-hidden="true" />
                    <span>2,000+ Students Trained</span>
                  </div>
                </div>
              </article>
              </div>

              <button className="slider-nav-btn next" onClick={nextCenterSlide} aria-label="Next training center">
                ›
              </button>

              <div className="slider-dots">
                {[0, 1, 2, 3].map((index) => (
                  <button
                    key={index}
                    className={`slider-dot ${index === currentCenterSlide ? 'active' : ''}`}
                    onClick={() => goToCenterSlide(index)}
                    aria-label={`Go to training center ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="centers-cta" role="region" aria-label="Online learning option">
              <p>Can't find a center near you? <strong>No problem!</strong> We offer <strong>Live Online Classes</strong> with the same quality, expert trainers, and interactive learning experience from anywhere in India.</p>
              <button
                className="explore-btn"
                onClick={() => navigate("/courses")}
                aria-label="Explore our online programs"
              >
                Explore Online Programs →
              </button>
            </div>
          </div>
        </section>

        <section className="leadership-section">
          <div className="leadership-container">
            <div className="leadership-card-compact">
              <div className="leader-image-side">
                <div className="image-wrapper">
                  <a href="https://www.linkedin.com/in/bharanikumardepuru/" target="_blank" rel="noopener noreferrer">
                    <img src={require('../../assets/images/download.jpg')}
                         alt="Bharani Kumar Depuru"
                         className="leader-photo" />
                  </a>
                </div>
              </div>

              <div className="leader-details">
                <div className="leader-header-compact">
                  <h3>Bharani Kumar Depuru</h3>
                  <p className="leader-position">CEO & Founder, AiSPRY | Founder & Director, 360DigiTMG</p>
                </div>

                <div className="leader-badges">
                  <span className="badge">IIT & ISB Alumni</span>
                  <span className="badge">Visiting Faculty at ISB</span>
                  <span className="badge">20+ Years Industry Experience</span>
                </div>

                <p className="leader-summary">
                  Visionary entrepreneur and Chief Data Scientist with a proven track record of transforming businesses through AI and data science innovation. Former Senior Consultant at Deloitte and leadership roles at HSBC, Infosys, and ITC Infotech. Founded AiSPRY and 360DigiTMG in 2015, empowering thousands of professionals worldwide with cutting-edge AI and data science education.
                </p>

                <div className="expertise-compact">
                  <span>Artificial Intelligence</span>
                  <span>Generative AI</span>
                  <span>Data Science</span>
                  <span>Machine Learning Strategy</span>
                  <span>AI Solutions</span>
                  <span>Global Speaker</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="main-footer">
          <div className="footer-container">
            <div className="footer-content">
              <div className="footer-section">
                <div className="footer-logo">
                  <img
                    src="https://aispry.com/pluginfile.php/1/theme_university/logo/1760548222/AiTutor-Logo-w.png"
                    alt="AiTutor Logo"
                    className="footer-logo-image"
                  />
                </div>
                <p className="footer-description">
                  Transform your career with industry-leading data science and technology programs.
                  Join thousands of successful alumni working at top companies worldwide.
                </p>
                <div className="social-links">
                  <a href="#" className="social-link"><img src="https://img.icons8.com/fluency/24/facebook.png" alt="facebook" /></a>
                  <a href="#" className="social-link"><img src="https://img.icons8.com/fluency/24/twitter.png" alt="twitter" /></a>
                  <a href="#" className="social-link"><img src="https://img.icons8.com/fluency/24/linkedin.png" alt="linkedin" /></a>
                  <a href="#" className="social-link"><img src="https://img.icons8.com/fluency/24/youtube.png" alt="youtube" /></a>
                </div>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Programs</h3>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Data Science</a></li>
                  <li><a href="#" className="footer-link">Machine Learning</a></li>
                  <li><a href="#" className="footer-link">AI & Deep Learning</a></li>
                  <li><a href="#" className="footer-link">Business Analytics</a></li>
                  <li><a href="#" className="footer-link">Python Programming</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Company</h3>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">About Us</a></li>
                  <li><a href="#" className="footer-link">Our Team</a></li>
                  <li><a href="#" className="footer-link">Careers</a></li>
                  <li><a href="#" className="footer-link">Success Stories</a></li>
                  <li><a href="#" className="footer-link">Contact</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Support</h3>
                <ul className="footer-links">
                  <li><a href="#" className="footer-link">Help Center</a></li>
                  <li><a href="#" className="footer-link">Student Portal</a></li>
                  <li><a href="#" className="footer-link">Course Materials</a></li>
                  <li><a href="#" className="footer-link">Technical Support</a></li>
                  <li><a href="#" className="footer-link">Community</a></li>
                </ul>
              </div>

              <div className="footer-section">
                <h3 className="footer-title">Contact Info</h3>
                <div className="contact-info">
                  <p className="contact-item"><img src="https://img.icons8.com/fluency/20/marker.png" alt="location" /> Hyderabad, Bangalore, Chennai</p>
                  <p className="contact-item"><img src="https://img.icons8.com/fluency/20/phone.png" alt="phone" /> +91-40-23456789</p>
                  <p className="contact-item"><img src="https://img.icons8.com/fluency/20/email.png" alt="email" /> info@360digitmg.com</p>
                  <p className="contact-item"><img src="https://img.icons8.com/fluency/20/clock.png" alt="hours" /> Mon-Fri 9AM-6PM</p>
                </div>
              </div>
            </div>

            <div className="footer-bottom">
              <div className="footer-bottom-content">
                <p className="copyright">
                  © 2024 360DigiTMG. All rights reserved.
                </p>
                <div className="footer-bottom-links">
                  <a href="#" className="bottom-link">Privacy Policy</a>
                  <a href="#" className="bottom-link">Terms of Service</a>
                  <a href="#" className="bottom-link">Cookie Policy</a>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
};

export default Home;