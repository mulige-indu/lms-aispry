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

      // Courses matching Browse by Category
      const mockCourses = [
        // Data Science (5 courses)
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
          courseName: 'Advanced Data Science & Statistical Analysis',
          category: 'Data Science',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Master advanced data science techniques, statistical modeling, hypothesis testing, and predictive analytics',
          instructor: 'Prof. Johnson',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 3,
          courseName: 'Data Science for Business Decisions',
          category: 'Data Science',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Apply data science to solve real business problems, forecasting, and strategic decision making',
          instructor: 'Dr. Williams',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 4,
          courseName: 'Time Series Analysis & Forecasting',
          category: 'Data Science',
          level: 'Advanced',
          duration: '14 weeks',
          description: 'Master time series analysis, ARIMA, Prophet, and forecasting techniques for business',
          instructor: 'Ms. Chen',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 5,
          courseName: 'R Programming for Data Science',
          category: 'Data Science',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Learn R programming, ggplot2, dplyr, and statistical computing for data analysis',
          instructor: 'Prof. Anderson',
          icon: <CodeIcon size={48} color="#276DC3" />
        },

        // Artificial Intelligence (6 courses)
        {
          courseId: 6,
          courseName: 'Machine Learning Fundamentals',
          category: 'Artificial Intelligence',
          level: 'Intermediate',
          duration: '16 weeks',
          description: 'Master machine learning algorithms including supervised and unsupervised learning, regression, and classification',
          instructor: 'Dr. Kumar',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 7,
          courseName: 'Deep Learning & Neural Networks',
          category: 'Artificial Intelligence',
          level: 'Advanced',
          duration: '20 weeks',
          description: 'Master deep learning, CNNs, RNNs, and transformer models with TensorFlow and PyTorch',
          instructor: 'Prof. Sharma',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 8,
          courseName: 'Generative AI & LLMs',
          category: 'Artificial Intelligence',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Master generative AI, prompt engineering, fine-tuning LLMs, and build AI applications with GPT',
          instructor: 'Dr. Lee',
          icon: <BrainIcon size={48} color="#FFC107" />
        },
        {
          courseId: 9,
          courseName: 'Natural Language Processing (NLP)',
          category: 'Artificial Intelligence',
          level: 'Advanced',
          duration: '18 weeks',
          description: 'Deep dive into NLP, transformers, BERT, text analytics, sentiment analysis, and chatbot development',
          instructor: 'Dr. Nguyen',
          icon: <CodeIcon size={48} color="#4CAF50" />
        },
        {
          courseId: 10,
          courseName: 'Computer Vision & Image Processing',
          category: 'Artificial Intelligence',
          level: 'Advanced',
          duration: '14 weeks',
          description: 'Master image processing, object detection, facial recognition, and video analytics with OpenCV',
          instructor: 'Prof. Martinez',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 11,
          courseName: 'Reinforcement Learning & AI Agents',
          category: 'Artificial Intelligence',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Learn Q-learning, policy gradients, deep reinforcement learning, and build autonomous AI agents',
          instructor: 'Dr. Park',
          icon: <BrainIcon size={48} color="#667eea" />
        },

        // Analytics (4 courses)
        {
          courseId: 12,
          courseName: 'Business Analytics with Power BI',
          category: 'Analytics',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Learn business intelligence, data visualization, and reporting with Power BI and Excel',
          instructor: 'Ms. Patel',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 13,
          courseName: 'Tableau for Data Visualization',
          category: 'Analytics',
          level: 'Beginner',
          duration: '6 weeks',
          description: 'Create stunning dashboards and interactive visualizations with Tableau',
          instructor: 'Mr. Moore',
          icon: <ChartIcon size={48} color="#E97627" />
        },
        {
          courseId: 14,
          courseName: 'Google Analytics & Web Analytics',
          category: 'Analytics',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Master Google Analytics, track user behavior, conversion optimization, and web performance metrics',
          instructor: 'Ms. Taylor',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 15,
          courseName: 'Predictive Analytics & Forecasting',
          category: 'Analytics',
          level: 'Advanced',
          duration: '12 weeks',
          description: 'Build predictive models, regression analysis, and advanced forecasting techniques for business',
          instructor: 'Dr. Robinson',
          icon: <ChartIcon size={48} color="#667eea" />
        },

        // Cloud & DevOps (5 courses)
        {
          courseId: 16,
          courseName: 'Cloud Computing with AWS',
          category: 'Cloud & DevOps',
          level: 'Intermediate',
          duration: '14 weeks',
          description: 'Master AWS services including EC2, S3, Lambda, RDS, and deploy scalable cloud applications',
          instructor: 'Dr. Chen',
          icon: <CloudIcon size={48} color="#FF9900" />
        },
        {
          courseId: 17,
          courseName: 'Microsoft Azure Cloud Solutions',
          category: 'Cloud & DevOps',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn Microsoft Azure services, cloud architecture, Azure DevOps, and cloud security',
          instructor: 'Ms. White',
          icon: <CloudIcon size={48} color="#0089D6" />
        },
        {
          courseId: 18,
          courseName: 'DevOps & CI/CD Bootcamp',
          category: 'Cloud & DevOps',
          level: 'Intermediate',
          duration: '12 weeks',
          description: 'Master Docker, Kubernetes, Jenkins, Git, Ansible, and automated deployment pipelines',
          instructor: 'Mr. Thompson',
          icon: <CodeIcon size={48} color="#2496ED" />
        },
        {
          courseId: 19,
          courseName: 'Google Cloud Platform (GCP)',
          category: 'Cloud & DevOps',
          level: 'Intermediate',
          duration: '14 weeks',
          description: 'Master Google Cloud Platform, Compute Engine, Cloud Functions, BigQuery, and GCP services',
          instructor: 'Dr. Mitchell',
          icon: <CloudIcon size={48} color="#4285F4" />
        },
        {
          courseId: 20,
          courseName: 'Kubernetes & Container Orchestration',
          category: 'Cloud & DevOps',
          level: 'Advanced',
          duration: '10 weeks',
          description: 'Deep dive into Kubernetes, container orchestration, microservices, and production deployment',
          instructor: 'Mr. Davis',
          icon: <CodeIcon size={48} color="#326CE5" />
        },

        // Programming (6 courses)
        {
          courseId: 21,
          courseName: 'Full Stack Python Development',
          category: 'Programming',
          level: 'Intermediate',
          duration: '18 weeks',
          description: 'Build complete web applications using Django, Flask, REST APIs, and PostgreSQL',
          instructor: 'Mr. Anderson',
          icon: <CodeIcon size={48} color="#3776ab" />
        },
        {
          courseId: 22,
          courseName: 'Web Development with React',
          category: 'Programming',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Build modern web applications with React, Redux, hooks, and component architecture',
          instructor: 'Ms. Williams',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 23,
          courseName: 'Mobile App Development',
          category: 'Programming',
          level: 'Intermediate',
          duration: '16 weeks',
          description: 'Build cross-platform mobile apps with React Native, Flutter, and native features',
          instructor: 'Mr. Garcia',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 24,
          courseName: 'Java Full Stack Development',
          category: 'Programming',
          level: 'Intermediate',
          duration: '20 weeks',
          description: 'Master Java, Spring Boot, Hibernate, microservices, and full stack development',
          instructor: 'Dr. Kumar',
          icon: <CodeIcon size={48} color="#007396" />
        },
        {
          courseId: 25,
          courseName: 'Node.js Backend Development',
          category: 'Programming',
          level: 'Intermediate',
          duration: '12 weeks',
          description: 'Build scalable backend applications with Node.js, Express, MongoDB, and RESTful APIs',
          instructor: 'Ms. Brown',
          icon: <CodeIcon size={48} color="#339933" />
        },
        {
          courseId: 26,
          courseName: 'iOS Development with Swift',
          category: 'Programming',
          level: 'Beginner',
          duration: '14 weeks',
          description: 'Create native iOS applications with Swift, SwiftUI, and Xcode',
          instructor: 'Mr. Wilson',
          icon: <CodeIcon size={48} color="#FA7343" />
        },

        // Security (4 courses)
        {
          courseId: 27,
          courseName: 'Cyber Security Essentials',
          category: 'Security',
          level: 'Beginner',
          duration: '12 weeks',
          description: 'Learn ethical hacking, network security, penetration testing, and security best practices',
          instructor: 'Mr. Rodriguez',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 28,
          courseName: 'Advanced Penetration Testing',
          category: 'Security',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Master advanced security techniques, vulnerability assessment, exploit development, and red team operations',
          instructor: 'Dr. Martinez',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 29,
          courseName: 'Cloud Security & Compliance',
          category: 'Security',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Secure cloud infrastructure, IAM, encryption, compliance (GDPR, SOC2), and security monitoring',
          instructor: 'Ms. Jackson',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 30,
          courseName: 'Application Security & Secure Coding',
          category: 'Security',
          level: 'Intermediate',
          duration: '12 weeks',
          description: 'Learn secure coding practices, OWASP Top 10, code review, and application security testing',
          instructor: 'Dr. Harris',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },

        // Data Engineering (5 courses)
        {
          courseId: 31,
          courseName: 'Data Engineering with Apache Spark',
          category: 'Data Engineering',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Build big data pipelines with Apache Spark, PySpark, Kafka, Hadoop, and Airflow',
          instructor: 'Ms. Lee',
          icon: <DatabaseIcon size={48} color="#667eea" />
        },
        {
          courseId: 32,
          courseName: 'SQL & Database Management',
          category: 'Data Engineering',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Learn SQL queries, database design, normalization, indexes, and work with MySQL and PostgreSQL',
          instructor: 'Ms. Brown',
          icon: <DatabaseIcon size={48} color="#667eea" />
        },
        {
          courseId: 33,
          courseName: 'ETL & Data Warehousing',
          category: 'Data Engineering',
          level: 'Intermediate',
          duration: '14 weeks',
          description: 'Master ETL processes, data warehousing, dimensional modeling, Snowflake, and Redshift',
          instructor: 'Mr. Thomas',
          icon: <DatabaseIcon size={48} color="#667eea" />
        },
        {
          courseId: 34,
          courseName: 'Real-Time Data Streaming',
          category: 'Data Engineering',
          level: 'Advanced',
          duration: '12 weeks',
          description: 'Build real-time streaming pipelines with Kafka, Flink, Storm, and event-driven architectures',
          instructor: 'Dr. Kim',
          icon: <DatabaseIcon size={48} color="#667eea" />
        },
        {
          courseId: 35,
          courseName: 'NoSQL Databases & MongoDB',
          category: 'Data Engineering',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Master NoSQL databases, MongoDB, Cassandra, Redis, and document-oriented data modeling',
          instructor: 'Ms. Clark',
          icon: <DatabaseIcon size={48} color="#47A248" />
        },

        // Marketing (4 courses)
        {
          courseId: 36,
          courseName: 'Digital Marketing Analytics',
          category: 'Marketing',
          level: 'Beginner',
          duration: '10 weeks',
          description: 'Learn SEO, Google Analytics, social media analytics, and marketing ROI measurement',
          instructor: 'Mr. Wilson',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 37,
          courseName: 'Advanced Digital Marketing Strategy',
          category: 'Marketing',
          level: 'Intermediate',
          duration: '12 weeks',
          description: 'Master content marketing, conversion optimization, A/B testing, and marketing automation',
          instructor: 'Ms. Davis',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 38,
          courseName: 'Social Media Marketing & Advertising',
          category: 'Marketing',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Master Facebook Ads, Instagram marketing, LinkedIn advertising, and social media strategy',
          instructor: 'Ms. Green',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 39,
          courseName: 'Email Marketing & Marketing Automation',
          category: 'Marketing',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Build email campaigns, marketing automation workflows, lead nurturing, and CRM integration',
          instructor: 'Mr. Young',
          icon: <ChartIcon size={48} color="#FF5722" />
        },

        // Blockchain (4 courses)
        {
          courseId: 40,
          courseName: 'Blockchain Development',
          category: 'Blockchain',
          level: 'Advanced',
          duration: '16 weeks',
          description: 'Build decentralized applications with Ethereum, Solidity, smart contracts, and Web3.js',
          instructor: 'Mr. Clark',
          icon: <CodeIcon size={48} color="#F7931A" />
        },
        {
          courseId: 41,
          courseName: 'Blockchain Fundamentals',
          category: 'Blockchain',
          level: 'Beginner',
          duration: '8 weeks',
          description: 'Learn blockchain technology, cryptocurrency, distributed ledger, consensus algorithms, and Bitcoin',
          instructor: 'Dr. Taylor',
          icon: <CodeIcon size={48} color="#F7931A" />
        },
        {
          courseId: 42,
          courseName: 'DeFi & Smart Contract Development',
          category: 'Blockchain',
          level: 'Advanced',
          duration: '14 weeks',
          description: 'Build DeFi protocols, yield farming, liquidity pools, and advanced smart contract patterns',
          instructor: 'Ms. Miller',
          icon: <CodeIcon size={48} color="#F7931A" />
        },
        {
          courseId: 43,
          courseName: 'NFT Development & Web3',
          category: 'Blockchain',
          level: 'Intermediate',
          duration: '10 weeks',
          description: 'Create NFTs, build NFT marketplaces, Web3 applications, and integrate with IPFS',
          instructor: 'Mr. Adams',
          icon: <CodeIcon size={48} color="#F7931A" />
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
    if (selectedCategory === 'All') {
      return true;
    }
    return course.category === selectedCategory;
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
