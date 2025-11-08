import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../config';
import CourseCard from '../common/CourseCard';
import './Courses.css';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  // Get logged-in user info
  useEffect(() => {
    const studentData = localStorage.getItem('student');
    if (studentData) {
      setUser(JSON.parse(studentData));
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('.user-profile')) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    setShowDropdown(false);
    navigate('/');
  };

  const handleSettings = () => {
    setShowDropdown(false);
    alert('Settings page coming soon!');
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/courses`);
      const data = await response.json();

      if (data.success) {
        setCourses(data.data);
      } else {
        setError('Failed to load courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Unable to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    const studentData = localStorage.getItem('student');

    if (!token || !studentData) {
      navigate('/login');
      return;
    }

    try {
      const student = JSON.parse(studentData);

      const response = await fetch(`${API_BASE_URL}/courses/enroll/${courseId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: student.id })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message);
        navigate('/my-courses');
      } else {
        alert(data.message || 'Enrollment failed');
      }
    } catch (err) {
      console.error('Enrollment error:', err);
      alert('Unable to enroll. Please try again.');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const categories = [
    'All',
    'Data Science',
    'Artificial Intelligence',
    'Analytics',
    'Cloud & DevOps',
    'Programming',
    'Security',
    'Data Engineering',
    'Marketing',
    'Blockchain'
  ];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'All' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'All' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="loader-spinner"></div>
        <p>Loading courses...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="courses-error">
        <div className="error-icon">⚠️</div>
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={fetchCourses} className="retry-btn">Try Again</button>
        <button onClick={handleGoBack} className="back-btn">Go Home</button>
      </div>
    );
  }

  return (
    <div className="courses-page">
      {/* Navigation Bar */}
      <nav className="courses-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="/images/logo-06.png"
              alt="360DigiTMG Logo"
              className="logo-image"
            />
          </div>

          <div className="navbar-menu">
            <button className="nav-btn" onClick={() => navigate('/my-courses')}>
              📚 My Course
            </button>
            <button className="nav-btn active" onClick={() => navigate('/courses')}>
              🔍 Browse Courses
            </button>
            <button className="nav-btn" onClick={() => navigate('/forum')}>
              💬 Discussion Forum
            </button>
            <button className="nav-btn" onClick={() => alert('Support coming soon!')}>
              🎧 Support
            </button>
          </div>
          <div className="navbar-user">
            {user ? (
              <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
                <div className="user-avatar">
                  {user.firstName?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">
                  {user.firstName} {user.lastName}
                </span>
                <span className="dropdown-arrow">▼</span>

                {showDropdown && (
                  <div className="user-dropdown">
                    <button className="dropdown-item" onClick={handleSettings}>
                      <span className="dropdown-icon">⚙️</span>
                      Settings
                    </button>
                    <button className="dropdown-item logout" onClick={handleLogout}>
                      <span className="dropdown-icon">🚪</span>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button className="login-btn" onClick={() => navigate('/login')}>
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="courses-header">
        <div className="header-content">
          <h1 className="courses-title">Explore Our Courses</h1>
          <p className="courses-subtitle">Transform your career with industry-leading programs</p>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <div className="courses-main-layout">
        {/* Category Aside */}
        <aside className="courses-filters-sidebar category-aside">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Browse by Category</h3>
            <div className="sidebar-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`sidebar-option ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category)}
                >
                  <span className="option-name">{category}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Level Aside */}
        <aside className="courses-filters-sidebar level-aside">
          <div className="sidebar-section">
            <h3 className="sidebar-title">Filter by Level</h3>
            <div className="sidebar-list">
              {levels.map((level) => (
                <button
                  key={level}
                  className={`sidebar-option ${selectedLevel === level ? 'active' : ''}`}
                  onClick={() => setSelectedLevel(level)}
                >
                  <span className="option-name">{level}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Courses Grid */}
        <div className="courses-container">
          <div className="courses-grid">
          {filteredCourses.length === 0 ? (
            <div className="no-courses">
              <p>No courses found matching your filters.</p>
            </div>
          ) : (
            filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                variant="browse"
                course={course}
                onAction={() => handleEnroll(course.id)}
                actionText="Enroll Now"
              />
            ))
          )}
        </div>
      </div>
    </div>

      {/* Stats Section */}
      <div className="courses-stats">
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-number" data-target={courses.length}>{courses.length}+</div>
          <div className="stat-label">Courses Available</div>
          <div className="stat-description">Industry-leading programs</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-number" data-target="10000">10,000+</div>
          <div className="stat-label">Students Enrolled</div>
          <div className="stat-description">Learning & growing</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🚀</div>
          <div className="stat-number" data-target="95">95%</div>
          <div className="stat-label">Placement Rate</div>
          <div className="stat-description">Career success guaranteed</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🤝</div>
          <div className="stat-number" data-target="500">500+</div>
          <div className="stat-label">Hiring Partners</div>
          <div className="stat-description">Top companies worldwide</div>
        </div>
      </div>
    </div>
  );
};

export default Courses;
