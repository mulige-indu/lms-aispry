import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../common/CourseCard';
import './Courses.css';
import {
  ChartIcon, BrainIcon, CodeIcon, CloudIcon, DatabaseIcon,
  MyCoursesIcon, BrowseIcon, ForumIcon, SupportIcon
} from '../common/SvgIcons';

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

      // Mock course data
      const mockCourses = [
        {
          courseId: 1,
          courseName: 'Data Science with Python',
          category: 'Data Science',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn data science fundamentals with Python, including NumPy, Pandas, and data visualization',
          instructor: 'Dr. Smith',
          icon: <CodeIcon size={48} color="#3776ab" />
        },
        {
          courseId: 2,
          courseName: 'Machine Learning Fundamentals',
          category: 'AI/ML',
          level: 'Intermediate',
          duration: '16 weeks',
          description: 'Master machine learning algorithms and techniques including supervised and unsupervised learning',
          instructor: 'Prof. Johnson',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 3,
          courseName: 'Web Development with React',
          category: 'Development',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Build modern web applications with React, Redux, and hooks',
          instructor: 'Ms. Williams',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 4,
          courseName: 'Deep Learning & Neural Networks',
          category: 'AI/ML',
          level: 'Advanced',
          duration: '20 weeks',
          description: 'Master deep learning, CNNs, RNNs, and transformer models with TensorFlow and PyTorch',
          instructor: 'Dr. Kumar',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 5,
          courseName: 'Business Analytics with Power BI',
          category: 'Data Science',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Learn business intelligence, data visualization, and reporting with Power BI and Excel',
          instructor: 'Ms. Patel',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 6,
          courseName: 'Full Stack Python Development',
          category: 'Development',
          level: 'Intermediate',
          duration: '18 weeks',
          description: 'Build complete web applications using Django, Flask, REST APIs, and PostgreSQL',
          instructor: 'Mr. Anderson',
          icon: <CodeIcon size={48} color="#3776ab" />
        },
        {
          courseId: 7,
          courseName: 'Cloud Computing with AWS',
          category: 'Cloud',
          level: 'Intermediate',
          duration: '14 weeks',
          description: 'Master AWS services including EC2, S3, Lambda, and deploy scalable cloud applications',
          instructor: 'Dr. Chen',
          icon: <CloudIcon size={48} color="#FF9900" />
        },
        {
          courseId: 8,
          courseName: 'Artificial Intelligence Engineer',
          category: 'AI/ML',
          level: 'Advanced',
          duration: '24 weeks',
          description: 'Comprehensive AI training covering NLP, Computer Vision, Generative AI, and LLMs',
          instructor: 'Prof. Sharma',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 9,
          courseName: 'Cyber Security Essentials',
          category: 'Security',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn ethical hacking, network security, penetration testing, and security best practices',
          instructor: 'Mr. Rodriguez',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 10,
          courseName: 'Data Engineering with Spark',
          category: 'Data Science',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Build big data pipelines with Apache Spark, Kafka, Hadoop, and Airflow',
          instructor: 'Ms. Lee',
          icon: <DatabaseIcon size={48} color="#667eea" />
        },
        {
          courseId: 11,
          courseName: 'DevOps & CI/CD Bootcamp',
          category: 'Development',
          level: 'Intermediate',
          duration: '12 weeks',
          description: 'Master Docker, Kubernetes, Jenkins, Git, and automated deployment pipelines',
          instructor: 'Mr. Thompson',
          icon: <CodeIcon size={48} color="#2496ED" />
        },
        {
          courseId: 12,
          courseName: 'Natural Language Processing',
          category: 'AI/ML',
          level: 'Advanced',
          duration: '18 weeks',
          description: 'Deep dive into NLP, transformers, BERT, GPT, and build chatbots and text analytics',
          instructor: 'Dr. Nguyen',
          icon: <CodeIcon size={48} color="#4CAF50" />
        },
        {
          courseId: 13,
          courseName: 'Blockchain Development',
          category: 'Development',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Build decentralized applications with Ethereum, Solidity, and smart contracts',
          instructor: 'Ms. Davis',
          icon: <CodeIcon size={48} color="#F7931A" />
        },
        {
          courseId: 14,
          courseName: 'Digital Marketing Analytics',
          category: 'Marketing',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Learn SEO, Google Analytics, social media analytics, and marketing ROI measurement',
          instructor: 'Mr. Wilson',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 15,
          courseName: 'Computer Vision with OpenCV',
          category: 'AI/ML',
          level: 'Intermediate',
          duration: '14 weeks',
          description: 'Master image processing, object detection, facial recognition, and video analytics',
          instructor: 'Prof. Martinez',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 16,
          courseName: 'SQL & Database Management',
          category: 'Data Science',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Learn SQL queries, database design, normalization, and work with MySQL and PostgreSQL',
          instructor: 'Ms. Brown',
          icon: <DatabaseIcon size={48} color="#667eea" />
        },
        {
          courseId: 17,
          courseName: 'Mobile App Development',
          category: 'Development',
          level: 'Intermediate',
          duration: '16 weeks',
          description: 'Build cross-platform mobile apps with React Native and Flutter',
          instructor: 'Mr. Garcia',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 18,
          courseName: 'MLOps & Model Deployment',
          category: 'AI/ML',
          level: 'Advanced',
          duration: '12 weeks',
          description: 'Deploy ML models in production with MLflow, Docker, Kubernetes, and monitoring',
          instructor: 'Dr. Taylor',
          icon: <CodeIcon size={48} color="#667eea" />
        },
        {
          courseId: 19,
          courseName: 'Azure Cloud Solutions',
          category: 'Cloud',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn Microsoft Azure services, cloud architecture, and Azure DevOps',
          instructor: 'Ms. White',
          icon: <CloudIcon size={48} color="#0089D6" />
        },
        {
          courseId: 20,
          courseName: 'Generative AI & ChatGPT',
          category: 'AI/ML',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Master generative AI, prompt engineering, fine-tuning LLMs, and build AI applications',
          instructor: 'Prof. Kumar',
          icon: <BrainIcon size={48} color="#FFC107" />
        },
        {
          courseId: 21,
          courseName: 'Tableau for Data Visualization',
          category: 'Data Science',
          level: 'Beginner',
          duration: '6 weeks',
          description: 'Create stunning dashboards and interactive visualizations with Tableau',
          instructor: 'Mr. Moore',
          icon: <ChartIcon size={48} color="#E97627" />
        },
        {
          courseId: 22,
          courseName: 'Python for Finance & Trading',
          category: 'Finance',
          level: 'Intermediate',
          duration: '14 weeks',
          description: 'Build trading algorithms, analyze financial data, and create backtesting strategies',
          instructor: 'Dr. Jackson',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 23,
          courseName: 'UI/UX Design Fundamentals',
          category: 'Design',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Learn user research, wireframing, prototyping with Figma, and design thinking',
          instructor: 'Ms. Harris',
          icon: <CodeIcon size={48} color="#E91E63" />
        },
        {
          courseId: 24,
          courseName: 'IoT & Embedded Systems',
          category: 'Development',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Build IoT projects with Arduino, Raspberry Pi, sensors, and cloud integration',
          instructor: 'Mr. Clark',
          icon: <CodeIcon size={48} color="#9C27B0" />
        }
      ];

      setCourses(mockCourses);
    } catch (err) {
      console.error('Error loading courses:', err);
      setError('Unable to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      // Use default student ID if not logged in
      let studentData = localStorage.getItem('student');
      let student;

      if (!studentData) {
        // Create a default guest student
        student = { id: 'guest-user', firstName: 'Guest', lastName: 'User', email: 'guest@example.com' };
        localStorage.setItem('student', JSON.stringify(student));
      } else {
        student = JSON.parse(studentData);
      }

      // Get enrolled courses from localStorage
      const enrolledCoursesJson = localStorage.getItem('enrolledCourses');
      const enrolledCourses = enrolledCoursesJson ? JSON.parse(enrolledCoursesJson) : {};

      // Check if already enrolled
      if (!enrolledCourses[student.id]) {
        enrolledCourses[student.id] = [];
      }

      if (enrolledCourses[student.id].includes(courseId)) {
        alert('You are already enrolled in this course');
        return;
      }

      // Enroll in course
      enrolledCourses[student.id].push(courseId);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));

      alert('Successfully enrolled in course!');
      navigate('/my-courses');
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
              src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png"
              alt="AiTutor Logo"
              className="logo-image"
            />
          </div>

          <div className="navbar-menu">
            <button className="nav-btn" onClick={() => navigate('/my-courses')}>
              <MyCoursesIcon size={20} color="currentColor" /> My Course
            </button>
            <button className="nav-btn active" onClick={() => navigate('/courses')}>
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
              <div style={{color: 'white', padding: '10px'}}>No user logged in</div>
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
                key={course.courseId}
                variant="browse"
                course={course}
                onAction={() => handleEnroll(course.courseId)}
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
