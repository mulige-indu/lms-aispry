import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from './CourseCard';
import './courses-navbar.css';
import './courses-header.css';
import './courses-main-layout.css';
import './courses-stats.css';
import './page-layout.css';
import './Courses.css';
import '../home/main-content.css';
import {
  MyCoursesIcon, BrowseIcon, ForumIcon, SupportIcon
} from '../SvgIcons';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState('mycourses');
  const navigate = useNavigate();

  // Get logged-in user info
  useEffect(() => {
    let studentData = localStorage.getItem('student');
    if (studentData) {
      setUser(JSON.parse(studentData));
    } else {
      // Create a default guest student
      const guestUser = { id: 'guest-user', firstName: 'Guest', lastName: 'User', email: 'guest@example.com' };
      localStorage.setItem('student', JSON.stringify(guestUser));
      setUser(guestUser);
    }
  }, [navigate]);

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
    if (user) {
      fetchMyCourses();
    }
  }, [user]);

  const fetchMyCourses = async () => {
    try {
      setLoading(true);
      setError(null);

      // Mock course data (same as in Courses.js)
      const allCourses = [
        {
          courseId: 1,
          courseName: 'Data Science with Python',
          category: 'Data Science',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn data science fundamentals with Python',
          instructor: 'Dr. Smith'
        },
        {
          courseId: 2,
          courseName: 'Machine Learning Fundamentals',
          category: 'AI/ML',
          level: 'Intermediate',
          duration: '16 weeks',
          description: 'Master machine learning algorithms and techniques',
          instructor: 'Prof. Johnson'
        },
        {
          courseId: 3,
          courseName: 'Web Development with React',
          category: 'Development',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Build modern web applications with React',
          instructor: 'Ms. Williams'
        }
      ];

      // Get enrolled courses from localStorage
      const enrolledCoursesJson = localStorage.getItem('enrolledCourses');
      const enrolledCourses = enrolledCoursesJson ? JSON.parse(enrolledCoursesJson) : {};

      // Get courses for current user
      const userEnrolledIds = enrolledCourses[user.id] || [];
      const myCourses = allCourses.filter(course => userEnrolledIds.includes(course.courseId));

      setCourses(myCourses);
    } catch (err) {
      console.error('Error loading my courses:', err);
      setError('Unable to load your courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleBrowseCourses = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <div className="courses-loading">
        <div className="loader-spinner"></div>
        <p>Loading your courses...</p>
      </div>
    );
  }

  return (
    <main className="courses-page">
      {/* Navigation Bar */}
      <nav className="courses-navbar">
        <div className="navbar-container">
          <div className="navbar-logo">
            <img
              src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png"
              alt="AiTutor Logo"
              className="logo-image"
            />
          </div>

          <div className="navbar-menu">
            <button className="nav-btn active" onClick={() => navigate('/my-courses')}>
              <MyCoursesIcon size={20} color="currentColor" /> My Course
            </button>
            <button className="nav-btn" onClick={() => navigate('/courses')}>
              <BrowseIcon size={20} color="currentColor" /> Browse Courses
            </button>
            <button className="nav-btn" onClick={() => navigate('/forum')}>
              <ForumIcon size={20} color="currentColor" /> Discussion Forum
            </button>
            <button className="nav-btn" onClick={() => alert('Support coming soon!')}>
              <SupportIcon size={20} color="currentColor" /> Support
            </button>
          </div>

          <div className="navbar-user">
            {user && (
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
            )}
          </div>
        </div>
      </nav>

      {/* Main Content with Aside */}
      <div className="page-layout">
        {/* Aside Navigation */}
        <aside className="sidebar-nav">
          <div className="sidebar-menu">
            <button
              className={`sidebar-item ${activeSection === 'mycourses' ? 'active' : ''}`}
              onClick={() => setActiveSection('mycourses')}
            >
              <span className="sidebar-icon">📚</span>
              <span className="sidebar-text">My Courses</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === 'orientation' ? 'active' : ''}`}
              onClick={() => setActiveSection('orientation')}
            >
              <span className="sidebar-icon">🎯</span>
              <span className="sidebar-text">Orientation</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === 'learningtools' ? 'active' : ''}`}
              onClick={() => setActiveSection('learningtools')}
            >
              <span className="sidebar-icon">🛠️</span>
              <span className="sidebar-text">Learning Tools</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === 'classschedule' ? 'active' : ''}`}
              onClick={() => setActiveSection('classschedule')}
            >
              <span className="sidebar-icon">📅</span>
              <span className="sidebar-text">Class Schedule</span>
            </button>
            <button
              className={`sidebar-item ${activeSection === 'projects' ? 'active' : ''}`}
              onClick={() => setActiveSection('projects')}
            >
              <span className="sidebar-icon">💼</span>
              <span className="sidebar-text">Projects</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <section className="main-content-area" style={{ padding: '20px 30px' }}>
          {/* Courses Container */}
          <section className="courses-container">
        {activeSection === 'mycourses' && error ? (
          <div className="courses-error" style={{ minHeight: '50vh' }}>
            <div className="error-icon">⚠️</div>
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button onClick={fetchMyCourses} className="retry-btn">Try Again</button>
          </div>
        ) : activeSection === 'mycourses' && courses.length === 0 ? (
          <div style={{
            minHeight: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px 20px'
          }}>
            <div style={{
              textAlign: 'center',
              maxWidth: '500px',
              padding: '40px',
              background: 'linear-gradient(135deg, rgba(213, 132, 46, 0.03) 0%, rgba(10, 158, 199, 0.03) 100%)',
              borderRadius: '20px',
              border: '2px dashed rgba(213, 132, 46, 0.2)'
            }}>
              <div style={{
                fontSize: '5rem',
                marginBottom: '20px',
                opacity: '0.6'
              }}>📚</div>
              <h2 style={{
                fontSize: '1.75rem',
                color: '#1a202c',
                marginBottom: '15px',
                fontWeight: '700'
              }}>You haven't enrolled in any courses yet</h2>
              <p style={{
                fontSize: '1.05rem',
                color: '#718096',
                marginBottom: '30px',
                lineHeight: '1.6'
              }}>Start learning today by browsing our available courses</p>
              <button onClick={handleBrowseCourses} style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #d5842e 0%, #0a9ec7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(213, 132, 46, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(213, 132, 46, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(213, 132, 46, 0.3)';
              }}>
                🔍 Browse Courses
              </button>
            </div>
          </div>
        ) : activeSection === 'mycourses' ? (
          <>
            {/* Merged Header and Learning Summary */}
            <header className="my-courses-summary" style={{
              background: 'linear-gradient(135deg, #d5842e 25%, rgba(82, 152, 149, 0.95) 50%, #0a9ec7 100%)',
              padding: '25px',
              borderRadius: '12px',
              color: 'white',
              marginBottom: '20px',
              boxShadow: '0 8px 30px rgba(213, 132, 46, 0.3)'
            }}>
              {/* Page Header */}
              <div style={{ marginBottom: '20px' }}>
                <h1 style={{ margin: '0 0 5px 0', fontSize: '1.8rem', fontWeight: '700' }}>
                  My Courses
                </h1>
                <p style={{ margin: '0', fontSize: '0.95rem', opacity: '0.95', fontWeight: '400' }}>
                  Continue your learning journey
                </p>
              </div>

              {/* Learning Stats Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '12px' }}>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '15px 12px', borderRadius: '10px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '5px' }}>{courses.length}</div>
                  <div style={{ opacity: 0.95, fontSize: '0.8rem', letterSpacing: '0.5px', fontWeight: '500' }}>Active Courses</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '15px 12px', borderRadius: '10px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '5px' }}>0%</div>
                  <div style={{ opacity: 0.95, fontSize: '0.8rem', letterSpacing: '0.5px', fontWeight: '500' }}>Avg Progress</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '15px 12px', borderRadius: '10px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '5px' }}>0</div>
                  <div style={{ opacity: 0.95, fontSize: '0.8rem', letterSpacing: '0.5px', fontWeight: '500' }}>Completed</div>
                </div>
                <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.15)', padding: '15px 12px', borderRadius: '10px', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)' }}>
                  <div style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '5px' }}>{courses.reduce((sum, c) => sum + (c.durationMonths || 0), 0)}</div>
                  <div style={{ opacity: 0.95, fontSize: '0.8rem', letterSpacing: '0.5px', fontWeight: '500' }}>Total Months</div>
                </div>
              </div>
            </header>

            {/* Enrolled Courses List */}
            <section className="courses-grid" style={{
              marginTop: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {courses.map((course) => (
                <CourseCard
                  key={course.courseId}
                  variant="enrolled"
                  course={course}
                  onAction={() => console.log('Continue learning:', course.courseName)}
                  actionText="Continue"
                />
              ))}
            </section>
          </>
        ) : activeSection === 'orientation' ? (
          <section className="section-content" style={{ padding: '20px' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#1a202c', marginBottom: '30px', textAlign: 'center' }}>
              🎯 Welcome to Your Learning Journey
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '30px' }}>
              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px', borderRadius: '15px', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>📚</span> Getting Started
                </h3>
                <ul style={{ lineHeight: '2', listStyle: 'none', padding: 0 }}>
                  <li>✓ Complete your profile setup</li>
                  <li>✓ Review course curriculum</li>
                  <li>✓ Join orientation session</li>
                  <li>✓ Download learning materials</li>
                </ul>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', padding: '30px', borderRadius: '15px', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>🎓</span> Learning Path
                </h3>
                <ul style={{ lineHeight: '2', listStyle: 'none', padding: 0 }}>
                  <li>→ Follow structured curriculum</li>
                  <li>→ Complete assignments on time</li>
                  <li>→ Attend live sessions regularly</li>
                  <li>→ Practice with real projects</li>
                </ul>
              </div>

              <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', padding: '30px', borderRadius: '15px', color: 'white', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>💡</span> Support & Resources
                </h3>
                <ul style={{ lineHeight: '2', listStyle: 'none', padding: 0 }}>
                  <li>→ 24/7 mentor support available</li>
                  <li>→ Access community forums</li>
                  <li>→ Download study materials</li>
                  <li>→ Join peer study groups</li>
                </ul>
              </div>
            </div>

            <div style={{ background: 'white', padding: '30px', borderRadius: '15px', marginTop: '30px', border: '2px solid #e2e8f0' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#2d3748', marginBottom: '15px' }}>📌 Important Guidelines</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '20px' }}>
                <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px', borderLeft: '4px solid #d5842e' }}>
                  <strong style={{ color: '#d5842e' }}>Attendance:</strong> Maintain 80% attendance for certification
                </div>
                <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px', borderLeft: '4px solid #0a9ec7' }}>
                  <strong style={{ color: '#0a9ec7' }}>Assignments:</strong> Submit all projects before deadlines
                </div>
                <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px', borderLeft: '4px solid #48bb78' }}>
                  <strong style={{ color: '#48bb78' }}>Assessments:</strong> Complete quizzes and exams to track progress
                </div>
                <div style={{ padding: '15px', background: '#f7fafc', borderRadius: '10px', borderLeft: '4px solid #ed8936' }}>
                  <strong style={{ color: '#ed8936' }}>Placement:</strong> 100% placement assistance after course completion
                </div>
              </div>
            </div>
          </section>
        ) : activeSection === 'learningtools' ? (
          <section className="section-content" style={{ padding: '20px' }}>
            <h2>🛠️ Learning Tools & Resources</h2>
            <div className="courses-grid" style={{ marginTop: '20px' }}>
              <div className="course-card">
                <h3>📖 Study Materials</h3>
                <p>Access course PDFs, slides, and reading materials</p>
                <button className="enroll-btn">Access Materials</button>
              </div>
              <div className="course-card">
                <h3>💻 Coding Labs</h3>
                <p>Practice coding in interactive environments</p>
                <button className="enroll-btn">Open Labs</button>
              </div>
              <div className="course-card">
                <h3>📺 Video Library</h3>
                <p>Watch recorded lectures and tutorials</p>
                <button className="enroll-btn">View Videos</button>
              </div>
            </div>
          </section>
        ) : activeSection === 'classschedule' ? (
          <section className="section-content" style={{ padding: '20px' }}>
            <h2>📅 Upcoming Classes</h2>
            <div style={{ background: 'white', padding: '30px', borderRadius: '15px', marginTop: '20px' }}>
              <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem' }}>
                No upcoming classes scheduled
              </p>
              <p style={{ textAlign: 'center', color: '#999', marginTop: '10px' }}>
                Class schedules will appear here once available
              </p>
            </div>
          </section>
        ) : activeSection === 'projects' ? (
          <section className="section-content" style={{ padding: '20px' }}>
            <h2>💼 My Projects</h2>
            <div style={{ background: 'white', padding: '30px', borderRadius: '15px', marginTop: '20px' }}>
              <p style={{ textAlign: 'center', color: '#666', fontSize: '1.2rem' }}>
                No projects available yet
              </p>
              <p style={{ textAlign: 'center', color: '#999', marginTop: '10px' }}>
                Start learning to unlock project assignments
              </p>
            </div>
          </section>
        ) : null}
          </section>

          {/* Browse More */}
          {activeSection === 'mycourses' && courses.length > 0 && (
            <div style={{
              maxWidth: '600px',
              margin: '40px auto 0',
              padding: '30px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(213, 132, 46, 0.05) 0%, rgba(10, 158, 199, 0.05) 100%)',
              borderRadius: '16px',
              border: '2px dashed rgba(213, 132, 46, 0.3)'
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                color: '#1a202c',
                marginBottom: '12px',
                fontWeight: '700'
              }}>Want to learn more?</h3>
              <p style={{
                color: '#718096',
                marginBottom: '20px',
                fontSize: '0.95rem'
              }}>Explore our full catalog of courses and expand your skills</p>
              <button onClick={handleBrowseCourses} style={{
                padding: '14px 32px',
                background: 'linear-gradient(135deg, #d5842e 0%, #0a9ec7 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '0.95rem',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(213, 132, 46, 0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(213, 132, 46, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(213, 132, 46, 0.3)';
              }}>
                🔍 Browse All Courses
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyCourses;
