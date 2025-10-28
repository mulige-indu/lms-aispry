import React, { useState, useEffect } from 'react';
import './CoursePageEnhanced.css';
import { useNavigate } from 'react-router-dom';
import HomeDashboard from '../dashboard/HomeDashboard';

// Scaler Dashboard Component
const CoursePageEnhanced = () => {
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(null);
  // Remove tab state since we only show all courses now
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();

  // Enhanced course data with formal information
  const enhancedCourses = [
    {
      id: 1,
      course_name: "Data Science Fundamentals",
      course_code: "DS101",
      description: "Master the foundations of data science with Python, statistics, and machine learning. Learn data visualization, analysis, and predictive modeling from industry experts.",
      duration_months: 6,
      price: 49999.00,
      difficulty_level: "Beginner",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
      category: "Data Science",
      modules: 12,
      projects: 5,
      certification: "Industry-Recognized Certificate",
      prerequisites: "Basic computer knowledge",
      skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Statistics"],
      instructor: {
        name: "Dr. Priya Sharma",
        experience: "10+ years",
        image: "https://randomuser.me/api/portraits/women/47.jpg"
      },
      rating: 4.8,
      students: 2847,
      aiFeatures: {
        personalizedPath: true,
        aiMentor: true,
        smartAssessments: true,
        careerGuidance: true
      },
      highlights: [
        "100% Placement Assistance",
        "Live Industry Projects",
        "24/7 AI-Powered Support",
        "1-on-1 Mentoring Sessions"
      ]
    },
    {
      id: 2,
      course_name: "Machine Learning Mastery",
      course_code: "ML201",
      description: "Dive deep into machine learning algorithms, neural networks, and advanced AI techniques. Build real-world ML models and deploy them in production.",
      duration_months: 8,
      price: 79999.00,
      difficulty_level: "Intermediate",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&crop=center",
      category: "Machine Learning",
      modules: 16,
      projects: 8,
      certification: "Advanced ML Professional Certificate",
      prerequisites: "Python programming, Basic statistics",
      skills: ["Scikit-learn", "TensorFlow", "PyTorch", "Deep Learning", "NLP"],
      instructor: {
        name: "Prof. Raj Kumar",
        experience: "15+ years",
        image: "https://randomuser.me/api/portraits/men/45.jpg"
      },
      rating: 4.9,
      students: 1923,
      aiFeatures: {
        personalizedPath: true,
        aiMentor: true,
        smartAssessments: true,
        careerGuidance: true
      },
      highlights: [
        "Advanced Algorithm Training",
        "GPU-Accelerated Learning",
        "Industry Case Studies",
        "Research Paper Reviews"
      ]
    },
    {
      id: 3,
      course_name: "AI & Deep Learning",
      course_code: "AI301",
      description: "Explore cutting-edge artificial intelligence and deep learning technologies. Master neural networks, computer vision, and natural language processing.",
      duration_months: 10,
      price: 99999.00,
      difficulty_level: "Advanced",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center",
      category: "Artificial Intelligence",
      modules: 20,
      projects: 12,
      certification: "AI Specialist Professional Certificate",
      prerequisites: "Machine Learning experience, Advanced Python",
      skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP", "GANs"],
      instructor: {
        name: "Dr. Anita Singh",
        experience: "12+ years",
        image: "https://randomuser.me/api/portraits/women/55.jpg"
      },
      rating: 4.9,
      students: 1456,
      aiFeatures: {
        personalizedPath: true,
        aiMentor: true,
        smartAssessments: true,
        careerGuidance: true
      },
      highlights: [
        "Cutting-edge AI Research",
        "Industry Partnerships",
        "Research Publication Support",
        "Advanced Computing Resources"
      ]
    },
    {
      id: 4,
      course_name: "Business Analytics",
      course_code: "BA101",
      description: "Transform business decisions with data analytics. Learn Excel, SQL, Tableau, and Power BI to drive strategic business insights.",
      duration_months: 4,
      price: 39999.00,
      difficulty_level: "Beginner",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      category: "Business Analytics",
      modules: 10,
      projects: 4,
      certification: "Business Analytics Professional Certificate",
      prerequisites: "Basic Excel knowledge",
      skills: ["SQL", "Tableau", "Power BI", "Excel", "Statistics"],
      instructor: {
        name: "Mr. Suresh Patel",
        experience: "8+ years",
        image: "https://randomuser.me/api/portraits/men/36.jpg"
      },
      rating: 4.7,
      students: 3245,
      aiFeatures: {
        personalizedPath: true,
        aiMentor: true,
        smartAssessments: true,
        careerGuidance: true
      },
      highlights: [
        "Industry Case Studies",
        "Real Business Problems",
        "Executive Dashboard Creation",
        "Strategic Decision Making"
      ]
    },
    {
      id: 5,
      course_name: "Big Data Engineering",
      course_code: "BDE201",
      description: "Master big data technologies including Hadoop, Spark, and cloud platforms. Design and build scalable data pipelines and processing systems.",
      duration_months: 7,
      price: 69999.00,
      difficulty_level: "Intermediate",
      image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop&crop=center",
      category: "Big Data",
      modules: 14,
      projects: 6,
      certification: "Big Data Engineer Professional Certificate",
      prerequisites: "Programming experience, Database knowledge",
      skills: ["Hadoop", "Spark", "Kafka", "AWS", "Docker"],
      instructor: {
        name: "Mr. Vikram Gupta",
        experience: "11+ years",
        image: "https://randomuser.me/api/portraits/men/58.jpg"
      },
      rating: 4.8,
      students: 1678,
      aiFeatures: {
        personalizedPath: true,
        aiMentor: true,
        smartAssessments: true,
        careerGuidance: true
      },
      highlights: [
        "Cloud Platform Training",
        "Scalable Architecture Design",
        "Real-time Data Processing",
        "Performance Optimization"
      ]
    }
  ];

  useEffect(() => {
    // Strict authentication check - only allow logged-in students
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('student');

    if (!token || !userData) {
      // Redirect immediately without showing page content
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      if (!parsedUser.id || !parsedUser.firstName) {
        // Invalid user data
        localStorage.removeItem('token');
        localStorage.removeItem('student');
        navigate('/login');
        return;
      }

      setStudent(parsedUser);
      setCourses(enhancedCourses);
      setEnrolledCourses([]); // Mock enrolled courses
      setLoading(false);
    } catch (error) {
      // Invalid JSON in localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('student');
      navigate('/login');
    }
  }, [navigate]);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);

    // Simulate API call
    setTimeout(() => {
      alert('Successfully enrolled! Welcome to your new course.');
      const course = enhancedCourses.find(c => c.id === courseId);
      setEnrolledCourses(prev => [...prev, {...course, enrollment_date: new Date(), progress_percentage: 0, completion_status: 'Enrolled'}]);
      setEnrolling(null);
    }, 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    // Using navigate for client-side routing
    navigate('/');
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(price);
  };

  const filteredCourses = enhancedCourses.filter(course => {
    const matchesSearch = course.course_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || course.difficulty_level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="course-page-enhanced">
        <div className="loading-container">
          <div className="ai-loading-animation">
            <div className="neural-network">
              <div className="node"></div>
              <div className="node"></div>
              <div className="node"></div>
              <div className="connections"></div>
            </div>
          </div>
          <p className="loading-text">Loading your personalized learning experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="scaler-dashboard">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <img
            src="https://aispry.com/pluginfile.php/1/theme_university/logo/1760548222/AiTutor-Logo-w.png"
            alt="AiTutor"
            className="logo"
          />
        </div>
        <div className="nav-right">
          <div className="user-menu">
            <div className="user-avatar">
              {student?.firstName?.charAt(0)}
            </div>
            <span className="user-name">{student?.firstName} {student?.lastName}</span>
            <button onClick={handleLogout} className="logout-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeWidth="2"/>
                <polyline points="16 17 21 12 16 7" strokeWidth="2"/>
                <line x1="21" y1="12" x2="9" y2="12" strokeWidth="2"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="dashboard-container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <ul className="sidebar-menu">
              <li
                className={activeSection === 'home' ? 'active' : ''}
                onClick={() => setActiveSection('home')}
              >
                <span>🏠 Home</span>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">Learning</h3>
            <ul className="sidebar-menu">
              <li
                className={activeSection === 'my-courses' ? 'active' : ''}
                onClick={() => setActiveSection('my-courses')}
              >
                <span>📚 My Courses</span>
              </li>
              <li
                className={activeSection === 'all-courses' ? 'active' : ''}
                onClick={() => setActiveSection('all-courses')}
              >
                <span>🎓 All Courses</span>
              </li>
            </ul>
          </div>
          <div className="sidebar-section">
            <h3 className="sidebar-title">Profile</h3>
            <ul className="sidebar-menu">
              <li
                className={activeSection === 'profile' ? 'active' : ''}
                onClick={() => setActiveSection('profile')}
              >
                <span>👤 My Profile</span>
              </li>
              <li
                className={activeSection === 'settings' ? 'active' : ''}
                onClick={() => setActiveSection('settings')}
              >
                <span>⚙️ Settings</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {activeSection === 'home' && <HomeDashboard />}
          {activeSection === 'all-courses' && (
            <div className="content-section">
              <div className="section-header">
                <h1>All Courses</h1>
                <p className="subtitle">Explore our comprehensive course catalog</p>
              </div>

              <div className="search-filter-section">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="🔍 Search courses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="ai-search-input"
                  />
                </div>
                <div className="filter-container">
                  <select
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="level-filter"
                  >
                    <option value="all">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="courses-grid-enhanced">
                {filteredCourses.map((course) => {
                  const isEnrolled = enrolledCourses.some(ec => ec.id === course.id);
                  return (
                    <div key={course.id} className={`course-card-enhanced ${isEnrolled ? 'enrolled' : ''}`}>
                      <div className="course-image-container">
                        <img src={course.image} alt={course.course_name} className="course-image" />
                        <div className="course-overlay">
                          <div className="course-category">{course.category}</div>
                          <div
                            className="difficulty-badge-enhanced"
                            style={{ backgroundColor: getDifficultyColor(course.difficulty_level) }}
                          >
                            {course.difficulty_level}
                          </div>
                        </div>
                        {course.aiFeatures.personalizedPath && (
                          <div className="ai-feature-badge">🤖 AI-Powered</div>
                        )}
                      </div>

                      <div className="course-content">
                        <div className="course-header-info">
                          <h3 className="course-title-enhanced">{course.course_name}</h3>
                        </div>

                        <p className="course-description-enhanced">{course.description}</p>

                        <div className="course-actions-enhanced">
                          {isEnrolled ? (
                            <button className="enrolled-btn-enhanced" disabled>
                              ✅ Enrolled
                            </button>
                          ) : (
                            <button
                                onClick={() => handleEnroll(course.id)}
                                disabled={enrolling === course.id}
                                className="enroll-btn-enhanced primary"
                              >
                                {enrolling === course.id ? 'Enrolling...' : 'Enroll Now'}
                              </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {activeSection !== 'all-courses' && activeSection !== 'home' && (
            <div className="content-section empty-state-placeholder">
              <h2>Coming Soon!</h2>
              <p>This section is under construction.</p>
            </div>
          )}
       </main>
      </div>
    </div>
  );
};

export default CoursePageEnhanced;
