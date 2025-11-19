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

      // Professional Industry-Standard Courses
      const mockCourses = [
        // Data Science & AI (6 courses)
        {
          courseId: 1,
          courseName: 'Data Science Certification Course',
          category: 'Data Science & AI',
          level: 'Beginner',
          duration: '6 months',
          description: 'Complete data science training with Python, statistics, machine learning, and real-world projects',
          instructor: 'Dr. Smith',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 2,
          courseName: 'Artificial Intelligence & Deep Learning',
          category: 'Data Science & AI',
          level: 'Advanced',
          duration: '6 months',
          description: 'Master AI, deep learning, neural networks, TensorFlow, PyTorch with hands-on projects',
          instructor: 'Prof. Johnson',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 3,
          courseName: 'Machine Learning Professional Course',
          category: 'Data Science & AI',
          level: 'Intermediate',
          duration: '5 months',
          description: 'Learn supervised, unsupervised learning, model deployment, and ML algorithms',
          instructor: 'Dr. Kumar',
          icon: <BrainIcon size={48} color="#667eea" />
        },
        {
          courseId: 4,
          courseName: 'Python for Data Science',
          category: 'Data Science & AI',
          level: 'Beginner',
          duration: '3 months',
          description: 'Master Python programming, NumPy, Pandas, data manipulation, and visualization',
          instructor: 'Ms. Chen',
          icon: <CodeIcon size={48} color="#3776ab" />
        },
        {
          courseId: 5,
          courseName: 'Natural Language Processing (NLP)',
          category: 'Data Science & AI',
          level: 'Advanced',
          duration: '4 months',
          description: 'Build text analytics, sentiment analysis, chatbots, and language models',
          instructor: 'Dr. Lee',
          icon: <BrainIcon size={48} color="#4CAF50" />
        },
        {
          courseId: 6,
          courseName: 'Computer Vision & Image Recognition',
          category: 'Data Science & AI',
          level: 'Advanced',
          duration: '4 months',
          description: 'Master OpenCV, object detection, facial recognition, and deep learning for vision',
          instructor: 'Prof. Martinez',
          icon: <BrainIcon size={48} color="#667eea" />
        },

        // Data Analytics & BI (6 courses)
        {
          courseId: 7,
          courseName: 'Data Analytics Certification',
          category: 'Data Analytics & BI',
          level: 'Beginner',
          duration: '4 months',
          description: 'Learn data analysis, Excel, SQL, statistics, and business intelligence fundamentals',
          instructor: 'Ms. Patel',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 8,
          courseName: 'Power BI for Business Analytics',
          category: 'Data Analytics & BI',
          level: 'Beginner',
          duration: '2 months',
          description: 'Create interactive dashboards, reports, and data visualizations with Power BI',
          instructor: 'Mr. Moore',
          icon: <ChartIcon size={48} color="#F2C811" />
        },
        {
          courseId: 9,
          courseName: 'Tableau Data Visualization',
          category: 'Data Analytics & BI',
          level: 'Beginner',
          duration: '2 months',
          description: 'Build stunning visualizations and business dashboards with Tableau',
          instructor: 'Ms. Taylor',
          icon: <ChartIcon size={48} color="#E97627" />
        },
        {
          courseId: 10,
          courseName: 'Business Analytics Professional Course',
          category: 'Data Analytics & BI',
          level: 'Intermediate',
          duration: '5 months',
          description: 'Master business metrics, KPIs, predictive analytics, and data-driven decision making',
          instructor: 'Dr. Robinson',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 11,
          courseName: 'SQL & Database Management',
          category: 'Data Analytics & BI',
          level: 'Beginner',
          duration: '2 months',
          description: 'Learn SQL queries, database design, joins, and data manipulation',
          instructor: 'Ms. Brown',
          icon: <DatabaseIcon size={48} color="#00758F" />
        },
        {
          courseId: 12,
          courseName: 'Excel for Data Analytics',
          category: 'Data Analytics & BI',
          level: 'Beginner',
          duration: '1 month',
          description: 'Master Excel formulas, pivot tables, macros, and advanced data analysis',
          instructor: 'Mr. Wilson',
          icon: <ChartIcon size={48} color="#217346" />
        },

        // Generative AI & LLMs (4 courses)
        {
          courseId: 13,
          courseName: 'Generative AI Certification Course',
          category: 'Generative AI & LLMs',
          level: 'Intermediate',
          duration: '3 months',
          description: 'Master GPT, DALL-E, Stable Diffusion, and build AI-powered applications',
          instructor: 'Dr. Nguyen',
          icon: <BrainIcon size={48} color="#FFC107" />
        },
        {
          courseId: 14,
          courseName: 'Prompt Engineering Professional Course',
          category: 'Generative AI & LLMs',
          level: 'Beginner',
          duration: '2 months',
          description: 'Learn prompt design, optimization, and build AI solutions with LLMs',
          instructor: 'Ms. Williams',
          icon: <BrainIcon size={48} color="#FFC107" />
        },
        {
          courseId: 15,
          courseName: 'LLM Fine-Tuning & RAG Systems',
          category: 'Generative AI & LLMs',
          level: 'Advanced',
          duration: '4 months',
          description: 'Fine-tune large language models, build RAG systems, and custom AI applications',
          instructor: 'Dr. Park',
          icon: <BrainIcon size={48} color="#FFC107" />
        },
        {
          courseId: 16,
          courseName: 'ChatGPT & AI for Business',
          category: 'Generative AI & LLMs',
          level: 'Beginner',
          duration: '1 month',
          description: 'Use ChatGPT, AI tools for productivity, automation, and business applications',
          instructor: 'Ms. Davis',
          icon: <BrainIcon size={48} color="#FFC107" />
        },

        // MLOps & Deployment (4 courses)
        {
          courseId: 17,
          courseName: 'MLOps Certification Course',
          category: 'MLOps & Deployment',
          level: 'Advanced',
          duration: '4 months',
          description: 'Deploy ML models, CI/CD pipelines, monitoring, and production ML systems',
          instructor: 'Mr. Thompson',
          icon: <CloudIcon size={48} color="#326CE5" />
        },
        {
          courseId: 18,
          courseName: 'Model Deployment & Production',
          category: 'MLOps & Deployment',
          level: 'Intermediate',
          duration: '3 months',
          description: 'Deploy models with Docker, Kubernetes, Flask, FastAPI, and cloud platforms',
          instructor: 'Dr. Mitchell',
          icon: <CloudIcon size={48} color="#2496ED" />
        },
        {
          courseId: 19,
          courseName: 'ML Model Monitoring & Maintenance',
          category: 'MLOps & Deployment',
          level: 'Advanced',
          duration: '2 months',
          description: 'Monitor model performance, drift detection, retraining, and A/B testing',
          instructor: 'Ms. Clark',
          icon: <ChartIcon size={48} color="#667eea" />
        },
        {
          courseId: 20,
          courseName: 'AutoML & Model Optimization',
          category: 'MLOps & Deployment',
          level: 'Intermediate',
          duration: '3 months',
          description: 'Automated machine learning, hyperparameter tuning, and model optimization',
          instructor: 'Dr. Kim',
          icon: <BrainIcon size={48} color="#667eea" />
        },

        // Programming & Development (6 courses)
        {
          courseId: 21,
          courseName: 'Full Stack Web Development',
          category: 'Programming & Development',
          level: 'Intermediate',
          duration: '6 months',
          description: 'Build complete web applications with React, Node.js, databases, and deployment',
          instructor: 'Mr. Anderson',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 22,
          courseName: 'Python Programming Certification',
          category: 'Programming & Development',
          level: 'Beginner',
          duration: '3 months',
          description: 'Learn Python fundamentals, OOP, file handling, and build real-world projects',
          instructor: 'Ms. White',
          icon: <CodeIcon size={48} color="#3776ab" />
        },
        {
          courseId: 23,
          courseName: 'React & Modern Web Development',
          category: 'Programming & Development',
          level: 'Beginner',
          duration: '4 months',
          description: 'Build responsive web apps with React, hooks, Redux, and modern JavaScript',
          instructor: 'Mr. Garcia',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 24,
          courseName: 'Java Programming & Spring Boot',
          category: 'Programming & Development',
          level: 'Intermediate',
          duration: '5 months',
          description: 'Master Java, Spring Boot, microservices, and enterprise application development',
          instructor: 'Dr. Kumar',
          icon: <CodeIcon size={48} color="#007396" />
        },
        {
          courseId: 25,
          courseName: 'Mobile App Development',
          category: 'Programming & Development',
          level: 'Intermediate',
          duration: '5 months',
          description: 'Build cross-platform mobile apps with React Native and Flutter',
          instructor: 'Ms. Green',
          icon: <CodeIcon size={48} color="#61dafb" />
        },
        {
          courseId: 26,
          courseName: 'Backend Development with Node.js',
          category: 'Programming & Development',
          level: 'Intermediate',
          duration: '4 months',
          description: 'Build REST APIs, authentication, databases with Node.js and Express',
          instructor: 'Mr. Wilson',
          icon: <CodeIcon size={48} color="#339933" />
        },

        // Digital Marketing (5 courses)
        {
          courseId: 27,
          courseName: 'Digital Marketing Certification',
          category: 'Digital Marketing',
          level: 'Beginner',
          duration: '4 months',
          description: 'Learn SEO, SEM, social media, email marketing, and digital strategy',
          instructor: 'Ms. Davis',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 28,
          courseName: 'SEO & Content Marketing',
          category: 'Digital Marketing',
          level: 'Beginner',
          duration: '2 months',
          description: 'Master SEO optimization, keyword research, content strategy, and link building',
          instructor: 'Mr. Young',
          icon: <ChartIcon size={48} color="#FF5722" />
        },
        {
          courseId: 29,
          courseName: 'Social Media Marketing',
          category: 'Digital Marketing',
          level: 'Beginner',
          duration: '2 months',
          description: 'Facebook, Instagram, LinkedIn ads, social media strategy, and influencer marketing',
          instructor: 'Ms. Miller',
          icon: <ChartIcon size={48} color="#E1306C" />
        },
        {
          courseId: 30,
          courseName: 'Google Analytics & Web Analytics',
          category: 'Digital Marketing',
          level: 'Beginner',
          duration: '2 months',
          description: 'Track website traffic, user behavior, conversion optimization, and analytics',
          instructor: 'Mr. Adams',
          icon: <ChartIcon size={48} color="#E37400" />
        },
        {
          courseId: 31,
          courseName: 'Performance Marketing & PPC',
          category: 'Digital Marketing',
          level: 'Intermediate',
          duration: '3 months',
          description: 'Google Ads, Facebook Ads, campaign optimization, ROI tracking, and A/B testing',
          instructor: 'Ms. Jackson',
          icon: <ChartIcon size={48} color="#FF5722" />
        },

        // Cloud Computing (5 courses)
        {
          courseId: 32,
          courseName: 'AWS Cloud Practitioner',
          category: 'Cloud Computing',
          level: 'Beginner',
          duration: '3 months',
          description: 'Learn AWS services, EC2, S3, Lambda, RDS, and cloud fundamentals',
          instructor: 'Dr. Chen',
          icon: <CloudIcon size={48} color="#FF9900" />
        },
        {
          courseId: 33,
          courseName: 'Microsoft Azure Fundamentals',
          category: 'Cloud Computing',
          level: 'Beginner',
          duration: '3 months',
          description: 'Master Azure services, virtual machines, storage, networking, and Azure DevOps',
          instructor: 'Ms. White',
          icon: <CloudIcon size={48} color="#0089D6" />
        },
        {
          courseId: 34,
          courseName: 'Google Cloud Platform (GCP)',
          category: 'Cloud Computing',
          level: 'Intermediate',
          duration: '4 months',
          description: 'Learn GCP services, Compute Engine, Cloud Functions, BigQuery, and Kubernetes',
          instructor: 'Dr. Mitchell',
          icon: <CloudIcon size={48} color="#4285F4" />
        },
        {
          courseId: 35,
          courseName: 'DevOps Engineering',
          category: 'Cloud Computing',
          level: 'Advanced',
          duration: '5 months',
          description: 'CI/CD pipelines, Docker, Kubernetes, Jenkins, Git, infrastructure as code',
          instructor: 'Mr. Thompson',
          icon: <CodeIcon size={48} color="#2496ED" />
        },
        {
          courseId: 36,
          courseName: 'Cloud Architecture & Design',
          category: 'Cloud Computing',
          level: 'Advanced',
          duration: '4 months',
          description: 'Design scalable cloud solutions, microservices, serverless, and cloud security',
          instructor: 'Dr. Harris',
          icon: <CloudIcon size={48} color="#667eea" />
        },

        // Cybersecurity (5 courses)
        {
          courseId: 37,
          courseName: 'Cybersecurity Certification Course',
          category: 'Cybersecurity',
          level: 'Beginner',
          duration: '5 months',
          description: 'Learn ethical hacking, network security, penetration testing, and security tools',
          instructor: 'Mr. Rodriguez',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 38,
          courseName: 'Ethical Hacking & Penetration Testing',
          category: 'Cybersecurity',
          level: 'Advanced',
          duration: '6 months',
          description: 'Master penetration testing, vulnerability assessment, Kali Linux, and security audits',
          instructor: 'Dr. Martinez',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 39,
          courseName: 'Network Security & Firewall',
          category: 'Cybersecurity',
          level: 'Intermediate',
          duration: '4 months',
          description: 'Secure networks, configure firewalls, IDS/IPS, VPN, and network protocols',
          instructor: 'Ms. Jackson',
          icon: <CodeIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 40,
          courseName: 'Cloud Security Professional',
          category: 'Cybersecurity',
          level: 'Advanced',
          duration: '4 months',
          description: 'AWS/Azure security, IAM, encryption, compliance, and cloud security best practices',
          instructor: 'Dr. Harris',
          icon: <CloudIcon size={48} color="#00BCD4" />
        },
        {
          courseId: 41,
          courseName: 'Application Security & OWASP',
          category: 'Cybersecurity',
          level: 'Intermediate',
          duration: '3 months',
          description: 'Secure coding, OWASP Top 10, XSS, SQL injection, authentication, and code review',
          instructor: 'Mr. Clark',
          icon: <CodeIcon size={48} color="#00BCD4" />
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
    'Data Science & AI',
    'Data Analytics & BI',
    'Generative AI & LLMs',
    'MLOps & Deployment',
    'Programming & Development',
    'Digital Marketing',
    'Cloud Computing',
    'Cybersecurity'
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
          <h2 className="section-heading courses-title">Explore Our Courses</h2>
          <p className="courses-subtitle">Transform your career with industry-leading programs</p>
        </div>
      </header>

      {/* Main Content with Sidebar */}
      <section className="courses-main-layout">
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
        <section className="courses-container">
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
      </section>
    </section>

      {/* Stats Section */}
      <section className="courses-stats">
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
      </section>
    </main>
  );
};

export default Courses;
