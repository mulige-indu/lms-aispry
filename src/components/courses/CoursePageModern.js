import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CoursePageModern.css';
import {
  CalendarIcon, ClockIcon, StarIcon, BookIcon, ChartIcon,
  CodeIcon, BrainIcon, UserIcon, CheckIcon, HeartIcon, EditIcon
} from '../common/SvgIcons';

const CoursePageModern = ({ userName }) => {
  const [selectedTab, setSelectedTab] = useState('All Free Offerings');
  const [loggedInUser, setLoggedInUser] = useState('User');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentAlumniSlide, setCurrentAlumniSlide] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Get logged-in user from localStorage
    const studentData = localStorage.getItem('student');
    if (studentData) {
      try {
        const student = JSON.parse(studentData);
        const displayName = student.firstName
          ? `${student.firstName}${student.lastName ? ' ' + student.lastName : ''}`
          : student.email;
        setLoggedInUser(displayName);
      } catch (error) {
        console.error('Error parsing student data:', error);
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.sr-header__account')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('student');
    navigate('/');
  };

  const handleSettings = () => {
    // Navigate to settings page or show settings modal
    console.log('Settings clicked');
    setIsUserMenuOpen(false);
  };

  const handleFeatureCardClick = (path) => {
    navigate(path);
  };

  // Alumni slider data with AI-generated Indian human images
  const alumniProfiles = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Data Scientist at Google',
      previousRole: 'Software Engineer',
      salaryJump: '180% increase',
      testimonial: "360DigiTMG's comprehensive curriculum and expert mentorship helped me transition into data science seamlessly.",
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      role: 'ML Engineer at Microsoft',
      previousRole: 'Business Analyst',
      salaryJump: '220% increase',
      testimonial: "The hands-on projects and industry exposure at 360DigiTMG gave me the confidence to crack top tech companies.",
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Arjun Mehta',
      role: 'AI Researcher at Amazon',
      previousRole: 'Data Analyst',
      salaryJump: '195% increase',
      testimonial: "From data analyst to AI researcher - 360DigiTMG made this incredible journey possible with their world-class program.",
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 4,
      name: 'Sneha Patel',
      role: 'Senior DevOps Engineer at Netflix',
      previousRole: 'System Administrator',
      salaryJump: '165% increase',
      testimonial: "The cloud computing and DevOps program completely transformed my career. Now I'm architecting solutions for millions of users.",
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 5,
      name: 'Vikram Singh',
      role: 'Blockchain Developer at Coinbase',
      previousRole: 'Full Stack Developer',
      salaryJump: '210% increase',
      testimonial: "360DigiTMG's Web3 and blockchain specialization gave me the edge I needed to break into the crypto industry.",
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 6,
      name: 'Kavya Reddy',
      role: 'Product Manager at Adobe',
      previousRole: 'Marketing Executive',
      salaryJump: '150% increase',
      testimonial: "The data-driven product management course helped me pivot from marketing to tech product management seamlessly.",
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 7,
      name: 'Amit Verma',
      role: 'Cybersecurity Analyst at IBM',
      previousRole: 'Network Engineer',
      salaryJump: '175% increase',
      testimonial: "From securing networks to defending against advanced threats - the cybersecurity program opened doors I never imagined.",
      gradient: 'linear-gradient(135deg, #ff6e7f 0%, #bfe9ff 100%)',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face'
    },
    {
      id: 8,
      name: 'Deepika Nair',
      role: 'Lead Data Engineer at Uber',
      previousRole: 'Database Developer',
      salaryJump: '200% increase',
      testimonial: "The big data and distributed systems training prepared me perfectly for building real-time data pipelines at scale.",
      gradient: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face'
    }
  ];

  // Alumni slider navigation
  const nextAlumniSlide = () => {
    setCurrentAlumniSlide((prev) => (prev + 1) % alumniProfiles.length);
  };

  const prevAlumniSlide = () => {
    setCurrentAlumniSlide((prev) => (prev - 1 + alumniProfiles.length) % alumniProfiles.length);
  };

  // Auto-advance alumni slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlumniSlide((prev) => (prev + 1) % alumniProfiles.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [alumniProfiles.length]);

  // Use prop if provided, otherwise use logged-in user
  const displayUserName = userName || loggedInUser;

  return (
    <main className="digitmg-dashboard">
      {/* ==================== MAIN LAYOUT ==================== */}
      <section className="main-section">
        {/* FIRST ASIDE - LEFT SIDEBAR */}
        <aside className="first-aside">
          <div data-testid="sidebar" data-cy="mentee_sidebar" className="sidebar mentee-sidebar mentee-sidebar--free-product mentee-sidebar--fp-revamped sidebar__open">
          {/* Sidebar Logo */}
          <div className="sidebar__logo-container">
            <img src="https://aispry.com/pluginfile.php/1/theme_university/logo/1762520057/AiTutor-Logo-w.png" alt="AiTutor" className="sidebar__logo" />
          </div>

          <div className="sidebar__content scroll-bar-hidden sidebar__content--free-product">
            <div aria-current="page" className="sidebar-section__heading sidebar-section__heading--top sidebar__item--active bold" displayname="GTMTracking" style={{cursor: 'default'}}>
              <span className="home-icon">🏠</span> Home
            </div>
            <div className="sidebar__section sidebar-section">
              <div className="sidebar-section__heading">
                <div className="sidebar-section__heading-text sidebar-section__heading-text--lowercase">Free Resources</div>
              </div>
              <div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <dotlottie-player autoplay="true" loop="" mode="normal" src="" classname="sidebar__lottie" style={{width: '40px', height: '40px'}} background="transparent"></dotlottie-player>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text--without-icon">Free LIVE Masterclasses</span>
                  </div>
                </div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-guidance sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text--with-tag sidebar__item-text-active">Video Guidance</span>
                  </div>
                  <div className="sidebar__tag sidebar__tag--alert m-l-10">
                    <i className="icon-trend-up"></i>Trending
                  </div>
                </div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-roadmap sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text">Generate Career Roadmap</span>
                  </div>
                </div>
                <div className="tappable sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-PhoneCall sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text">Free 1:1 with Expert</span>
                  </div>
                </div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-topics sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text">Video Courses</span>
                  </div>
                </div>
              </div>
              <div className="cm-divider sidebar__divider sidebar__divider--free-product"></div>
            </div>
            <div className="sidebar__section sidebar-section">
              <div className="sidebar-section__heading" style={{textDecoration: 'none', cursor: 'default'}}>
                <div className="sidebar-section__heading-text sidebar-section__heading-text--lowercase">Know About Data Science</div>
                <div className="sidebar__tag sidebar__tag--success m-l-10">New</div>
              </div>
              <div>
                <div className="sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-curriculum-alt sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text-active">Course Overview (Curriculum)</span>
                  </div>
                </div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-chalkboard-teacher sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text-active">Meet Your Instructors</span>
                  </div>
                </div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-money-icon sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text--with-tag sidebar__item-text-active">Apply a Referral Code</span>
                  </div>
                  <div className="sidebar__tag sidebar__tag--success m-l-10">New</div>
                </div>
                <div className="sidebar__item sidebar__item" style={{cursor: 'default'}}>
                  <i className="icon-rocket sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text-active">Know How 360DigiTMG Can Help</span>
                  </div>
                </div>
              </div>
              <div className="cm-divider sidebar__divider sidebar__divider--free-product"></div>
            </div>
            <div className="sidebar-section__heading sidebar-section__heading-text sidebar-section__heading-text--lowercase">Paid Resources</div>
            <div className="sidebar__item sidebar__item" activeclassname="sidebar__item--active" sectionheaderclass="sidebar-section__heading-text--lowercase" header="Paid Resources" popoveritems="[object Object],[object Object]" style={{cursor: 'default'}}>
              <i className="icon-neovarsity-v2 sidebar__item-icon"></i>
              <div className="p-v-10 row align-items-center flex-1 sidebar__item-compact">
                <span className="sidebar__item-text">Explore Paid Programs</span>
              </div>
              <i className="icon-chevron-right"></i>
            </div>
            <div className="cm-divider sidebar__divider sidebar__divider--free-product"></div>
            <div className="sidebar__section sidebar-section">
              <div className="sidebar-section__heading">
                <div className="sidebar-section__heading-text sidebar-section__heading-text--lowercase">Learn & Practice</div>
              </div>
              <div>
                <div className="sidebar__item sidebar__item" id="sidebar-all-classes" style={{cursor: 'default'}}>
                  <i className="icon-all-class-alt sidebar__item-icon"></i>
                  <div className="p-v-10 sidebar__item-compact">
                    <span className="sidebar__item-text sidebar__item-text-active">All Classes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cm-divider sidebar__divider sidebar__divider--free-product"></div>
          <div className="sidebar__entrance-test-container">
            <div className="tappable btn btn-secondary sidebar__entrance-test-cta bold" style={{cursor: 'default'}}>Take Entrance Test</div>
          </div>
          </div>
        </aside>

        {/* SECOND ASIDE - HEADER AND CONTENT */}
        <aside className="second-aside">
          {/* HEADER */}
          <div data-testid="header" className="sr-header p-v-20 academy-header mentee-header fp-header mentee-header__free-product fp-header--without-hamburger">
            <div className="sr-header__content">
              <div className="fp-header__left-section">
                <div className="mentee-header__db-switch">
                  <div className="fp-header fp-header__db-switch-container">
                    <div className="dropdown mentee-header__db-switch-dropdown">
                      <a className="tappable dropdown__title">
                        <div className="fp-popover__db-switch-option fp-popover__db-switch-title fp-popover__db-switch-option--no-subtext">
                          <i className="icon-dsml fp-popover__switch-icon fp-popover__switch-icon--active"></i>
                          <div className="fp-popover__dashboard-names">
                            <div className="fp-popover__dashboard-heading">Data Science</div>
                          </div>
                          <i className="icon-chevron-down"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header__items-icon">
                <div className="tappable m-r-20 btn btn-secondary" id="schedule_demo">Request a Callback</div>
              </div>
            </div>
            <div className="sr-header__dropdown">
              <div className="dropdown sr-header__account">
                <a className="tappable dropdown__title no-highlight" onClick={toggleUserMenu}>
                  <span>{displayUserName}</span>
                  <i className={`icon-chevron-down ${isUserMenuOpen ? 'rotate-up' : ''}`}></i>
                </a>
                {isUserMenuOpen && (
                  <div className="user-dropdown-menu">
                    <div className="dropdown-menu-item" onClick={handleSettings}>
                      <i className="icon-settings"></i>
                      <span>Settings</span>
                    </div>
                    <div className="dropdown-menu-divider"></div>
                    <div className="dropdown-menu-item logout-item" onClick={handleLogout}>
                      <i className="icon-logout"></i>
                      <span>Logout</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="dashboard-layout">
            <section>
          {/* Navigation Tabs */}
          <nav className="dashboard-tabs" id="compartmentalisation-navigation">
            <div className="tabs-wrapper">
              <a
                href="#start-learning"
                className={`dashboard-tab ${selectedTab === 'All Free Offerings' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('All Free Offerings')}
              >
                All Free Offerings
              </a>
              <a
                href="#unlock-premium"
                className={`dashboard-tab ${selectedTab === 'Unlock Premium' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Unlock Premium')}
              >
                Unlock Premium
              </a>
              <a
                href="#ai-mock-interview-banner"
                className={`dashboard-tab ${selectedTab === 'Ai Mock Interview' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Ai Mock Interview')}
              >
                Ai Mock Interview
              </a>
              <a
                href="#why-ai-section"
                className={`dashboard-tab ${selectedTab === 'Explore AI' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Explore AI')}
              >
                Explore AI
              </a>
              <a
                href="#alumni-profiles-last"
                className={`dashboard-tab ${selectedTab === 'Alumni Profiles' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Alumni Profiles')}
              >
                Alumni Profiles
              </a>
              <a
                href="#entrance-test"
                className={`dashboard-tab ${selectedTab === '360DigiTMG Eligibility Test' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('360DigiTMG Eligibility Test')}
              >
                360DigiTMG Eligibility Test
              </a>
              <a
                href="#digitmg-events"
                className={`dashboard-tab ${selectedTab === 'View Masterclass' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('View Masterclass')}
              >
                View Masterclass
              </a>
              <a
                href="#problems"
                className={`dashboard-tab ${selectedTab === 'Coding Problems' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Coding Problems')}
              >
                Coding Problems
              </a>
              <a
                href="#guidance-sessions"
                className={`dashboard-tab ${selectedTab === 'Guidance Sessions' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Guidance Sessions')}
              >
                Guidance Sessions
              </a>
              <a
                href="#premium-classes"
                className={`dashboard-tab ${selectedTab === 'Premium Classes' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Premium Classes')}
              >
                Premium Classes
              </a>
              <a
                href="#expert-guidance"
                className={`dashboard-tab ${selectedTab === 'Expert Guidance' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Expert Guidance')}
              >
                Expert Guidance
              </a>
              <a
                href="#success-stories"
                className={`dashboard-tab ${selectedTab === 'Success Stories' ? 'dashboard-tab--active' : ''}`}
                onClick={() => setSelectedTab('Success Stories')}
              >
                Success Stories
              </a>
            </div>
          </nav>
           <header className='main-head'>
            {/* MAIN CONTENT - MENTEE DASHBOARD */}
        <main className="mentee-content__dashboard mentee-content__dashboard--free-product">
         

          {/* Feature Cards Section */}
          <div className="dashboard-features">
            <div className="features-grid-container">
              {/* Row 1 */}
              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><CodeIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">Free Live Class</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><CalendarIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">Live Masterclass</span>
              </div>

              <div className="dashboard-feature-card dashboard-feature-card--highlighted">
                <span className="feature-card-icon"><UserIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">AI-Mock Interviews</span>
                <span className="feature-card-badge">
                  <StarIcon size={20} color="#ffc107" />
                  NEW
                </span>
              </div>

              {/* Row 2 */}
              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><BrainIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">Career Roadmap</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><BookIcon size={24} color="#5c6bc0" /></span>
                <span className="feature-card-title">Curriculum</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><UserIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">Instructors</span>
              </div>

              {/* Row 3 */}
              <div className="dashboard-feature-card">
                <span className="feature-card-icon">{/* TODO: Replace with <FaStar /> */}<span>⚠️</span></span>
                <span className="feature-card-title">360DigiTMG Benefits</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><UserIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">1:1 Expert Connect</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><ChartIcon size={24} color="#667eea" /></span>
                <span className="feature-card-title">Placement Report</span>
              </div>

              {/* Row 4 */}
              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><BookIcon size={24} color="#5c6bc0" /></span>
                <span className="feature-card-title">Scholarship Test</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><StarIcon size={24} color="#ffc107" /></span>
                <span className="feature-card-title">IIT-R Certification</span>
              </div>

              <div className="dashboard-feature-card">
                <span className="feature-card-icon"><BookIcon size={24} color="#5c6bc0" /></span>
                <span className="feature-card-title">AI Resume Review</span>
              </div>
            </div>
          </div>

          {/* All Free Offerings Section */}
          <section id="start-learning" className="content-section">
            <h2 className="section-heading section-title">All Free Offerings</h2>
            <p className="section-description">Explore our comprehensive free resources to kickstart your learning journey.</p>

            <div className="features-grid-container" style={{marginTop: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem'}}>
              <div className="resource-card" style={{padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div style={{fontSize: '2.5rem', marginBottom: '1rem'}}>📹</div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Video Tutorials</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Access 500+ free video tutorials covering Python, Machine Learning, Deep Learning, and more.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2196f3', fontWeight: '600', fontSize: '0.9rem'}}>
                  Start Learning →
                </div>
              </div>

              <div className="resource-card" style={{padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div style={{marginBottom: '1rem'}}><BookIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Study Materials</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Download comprehensive PDFs, cheat sheets, and study guides for all data science topics.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2196f3', fontWeight: '600', fontSize: '0.9rem'}}>
                  Browse Resources →
                </div>
              </div>

              <div className="resource-card" style={{padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div style={{marginBottom: '1rem'}}><BookIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Free Courses</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Enroll in beginner-friendly courses on Statistics, Python Programming, and SQL fundamentals.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2196f3', fontWeight: '600', fontSize: '0.9rem'}}>
                  Explore Courses →
                </div>
              </div>

              <div className="resource-card" style={{padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div style={{marginBottom: '1rem'}}><CodeIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Practice Labs</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Hands-on coding environments with Jupyter notebooks for practical learning experience.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2196f3', fontWeight: '600', fontSize: '0.9rem'}}>
                  Start Practicing →
                </div>
              </div>

              <div className="resource-card" style={{padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div style={{marginBottom: '1rem'}}><StarIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Skill Assessments</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Test your knowledge with free quizzes and assessments to track your progress.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2196f3', fontWeight: '600', fontSize: '0.9rem'}}>
                  Take Assessment →
                </div>
              </div>

              <div className="resource-card" style={{padding: '1.5rem', border: '1px solid #e5e7eb', borderRadius: '12px', background: '#ffffff', cursor: 'pointer', transition: 'all 0.3s ease'}}>
                <div style={{marginBottom: '1rem'}}><BrainIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Community Forums</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Join 50,000+ learners in our community to discuss, learn, and grow together.</p>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#2196f3', fontWeight: '600', fontSize: '0.9rem'}}>
                  Join Community →
                </div>
              </div>
            </div>
          </section>

          {/* Unlock Premium Section */}
          <section id="unlock-premium" className="dashboard-premium-unlock">
            <h2 className="premium-unlock-title">3 steps to unlock Premium Experience</h2>

            {/* Step 1 */}
            <div className="premium-step">
              <div className="premium-step-indicator">
                <span className="step-number">1</span>
              </div>
              <div className="premium-step-content">
                <h3 className="step-heading">Register for guidance session with our Experts</h3>
              </div>
            </div>

            {/* Free Class Registration Card */}
            <div className="free-class-registration">
              <div className="class-video-container">
                <div className="video-thumbnail-wrapper">
                  <button className="video-play-button" aria-label="Play video">
                    ▶
                  </button>
                  <div className="video-attendance-badge">
                    <span className="attendance-icon">👥</span>
                    <span className="attendance-count">2k+ users attending</span>
                  </div>
                </div>
              </div>

              <div className="class-registration-details">
                <h3 className="class-registration-title">
                  Attend a Free Class to Experience The 360DigiTMG Data Science, AI & ML Program
                </h3>

                <div className="class-registration-meta">
                  <div className="meta-info-item">
                    <span className="meta-icon">📅</span>
                    <span className="meta-text">Wed, 15 Oct</span>
                  </div>
                  <div className="meta-info-item">
                    <span className="meta-icon">🕐</span>
                    <span className="meta-text">07:00 PM - 09:00 PM</span>
                  </div>
                  <div className="meta-info-item meta-info-item--timer">
                    <span className="meta-text">Starts in 26h : 06m</span>
                  </div>
                </div>

                <button className="class-registration-button">
                  Register with 1-Click
                </button>
              </div>
            </div>

            {/* Step 2 */}
            <div className="premium-step" style={{marginTop: '2rem'}}>
              <div className="premium-step-indicator">
                <span className="step-number">2</span>
              </div>
              <div className="premium-step-content">
                <h3 className="step-heading">Take the Eligibility Assessment</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem', lineHeight: '1.6'}}>
                  Complete our comprehensive assessment to evaluate your current skill level and receive personalized course recommendations tailored to your career goals.
                </p>
                <button style={{marginTop: '1rem', padding: '0.75rem 1.5rem', background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '0.9rem'}}>
                  Start Assessment
                </button>
              </div>
            </div>

            {/* Step 3 */}
            <div className="premium-step" style={{marginTop: '2rem'}}>
              <div className="premium-step-indicator">
                <span className="step-number">3</span>
              </div>
              <div className="premium-step-content">
                <h3 className="step-heading">Enroll in Premium Program</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', marginTop: '0.5rem', lineHeight: '1.6'}}>
                  Choose from our industry-leading programs in Data Science, AI & ML, and unlock access to live classes, mentorship, placement support, and lifetime learning resources.
                </p>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
                  <div style={{padding: '1rem', border: '2px solid #2196f3', borderRadius: '8px', background: '#f0f9ff'}}>
                    <div style={{fontWeight: '700', color: '#1976d2', fontSize: '0.95rem'}}>Data Science Pro</div>
                    <div style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem'}}>12 months • Live classes</div>
                  </div>
                  <div style={{padding: '1rem', border: '2px solid #2196f3', borderRadius: '8px', background: '#f0f9ff'}}>
                    <div style={{fontWeight: '700', color: '#1976d2', fontSize: '0.95rem'}}>AI & ML Mastery</div>
                    <div style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem'}}>10 months • Expert mentors</div>
                  </div>
                  <div style={{padding: '1rem', border: '2px solid #2196f3', borderRadius: '8px', background: '#f0f9ff'}}>
                    <div style={{fontWeight: '700', color: '#1976d2', fontSize: '0.95rem'}}>Full Stack DS</div>
                    <div style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.25rem'}}>14 months • Job guarantee</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Mock Interview Section */}
          <section id="ai-mock-interview-banner" className="content-section">
            <h2 className="section-heading section-title">AI Mock Interview</h2>
            <p className="section-description">Practice with our AI-powered mock interview system and get instant feedback.</p>

            <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '2.5rem', borderRadius: '12px', marginTop: '2rem', color: 'white'}}>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center'}}>
                <div>
                  <h3 style={{fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem'}}>Ace Your Next Interview</h3>
                  <p style={{fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem', opacity: '0.95'}}>
                    Get real-time feedback on your interview performance with our advanced AI interviewer. Practice technical, behavioral, and case study questions.
                  </p>
                  <button style={{padding: '1rem 2rem', background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '1rem', cursor: 'pointer'}}>
                    Start Practice Interview
                  </button>
                </div>
                <div style={{textAlign: 'center'}}><StarIcon size={40} color="#667eea" /></div>
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
              <div style={{padding: '1.5rem', background: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb'}}>
                <div style={{marginBottom: '1rem'}}><UserIcon size={32} color="#667eea" /></div>
                <h4 style={{fontSize: '1.05rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Natural Conversations</h4>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6'}}>Experience realistic interview conversations with our advanced AI that adapts to your responses.</p>
              </div>

              <div style={{padding: '1.5rem', background: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb'}}>
                <div style={{marginBottom: '1rem'}}><ChartIcon size={32} color="#667eea" /></div>
                <h4 style={{fontSize: '1.05rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Detailed Analytics</h4>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6'}}>Get comprehensive reports on your communication, technical knowledge, and problem-solving skills.</p>
              </div>

              <div style={{padding: '1.5rem', background: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb'}}>
                <div style={{marginBottom: '1rem'}}><BookIcon size={32} color="#667eea" /></div>
                <h4 style={{fontSize: '1.05rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Learn & Improve</h4>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6'}}>Receive personalized suggestions and resources to improve your weak areas after each session.</p>
              </div>

              <div style={{padding: '1.5rem', background: '#f9fafb', borderRadius: '10px', border: '1px solid #e5e7eb'}}>
                <div style={{marginBottom: '1rem'}}><ClockIcon size={32} color="#667eea" /></div>
                <h4 style={{fontSize: '1.05rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Practice Anytime</h4>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6'}}>Available 24/7 for unlimited practice sessions. No scheduling required, start whenever you want.</p>
              </div>
            </div>
          </section>

          {/* Explore AI Section */}
          <section id="why-ai-section" className="content-section">
            <h2 className="section-heading section-title">Explore AI</h2>
            <p className="section-description">Discover the power of AI and machine learning in modern data science.</p>

            <div style={{marginTop: '2rem'}}>
              <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#1f2937', marginBottom: '1.5rem'}}>AI & ML Learning Paths</h3>

              <div style={{display: 'grid', gap: '1.5rem'}}>
                {/* Beginner Path */}
                <div style={{padding: '2rem', background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', borderRadius: '12px', border: '2px solid #2196f3'}}>
                  <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem'}}>
                    <div><StarIcon size={24} color="#4caf50" /></div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
                        <h4 style={{fontSize: '1.2rem', fontWeight: '700', color: '#1565c0', margin: 0}}>Beginner Path</h4>
                        <span style={{padding: '0.25rem 0.75rem', background: '#2196f3', color: 'white', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600'}}>START HERE</span>
                      </div>
                      <p style={{fontSize: '0.95rem', color: '#424242', lineHeight: '1.6', marginBottom: '1rem'}}>
                        Perfect for those new to AI. Learn Python fundamentals, basic statistics, and introduction to machine learning algorithms.
                      </p>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Python Basics</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Statistics 101</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>ML Fundamentals</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Data Visualization</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Intermediate Path */}
                <div style={{padding: '2rem', background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', borderRadius: '12px', border: '2px solid #9c27b0'}}>
                  <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem'}}>
                    <div><ChartIcon size={24} color="#2196f3" /></div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
                        <h4 style={{fontSize: '1.2rem', fontWeight: '700', color: '#7b1fa2', margin: 0}}>Intermediate Path</h4>
                        <span style={{padding: '0.25rem 0.75rem', background: '#9c27b0', color: 'white', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600'}}>POPULAR</span>
                      </div>
                      <p style={{fontSize: '0.95rem', color: '#424242', lineHeight: '1.6', marginBottom: '1rem'}}>
                        Dive deeper into advanced ML algorithms, neural networks, natural language processing, and computer vision.
                      </p>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Deep Learning</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>NLP</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Computer Vision</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>TensorFlow</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Path */}
                <div style={{padding: '2rem', background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)', borderRadius: '12px', border: '2px solid #ff9800'}}>
                  <div style={{display: 'flex', alignItems: 'flex-start', gap: '1.5rem'}}>
                    <div><StarIcon size={24} color="#ff5722" /></div>
                    <div style={{flex: 1}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
                        <h4 style={{fontSize: '1.2rem', fontWeight: '700', color: '#e65100', margin: 0}}>Advanced Path</h4>
                        <span style={{padding: '0.25rem 0.75rem', background: '#ff9800', color: 'white', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '600'}}>EXPERT</span>
                      </div>
                      <p style={{fontSize: '0.95rem', color: '#424242', lineHeight: '1.6', marginBottom: '1rem'}}>
                        Master cutting-edge AI technologies including GANs, reinforcement learning, MLOps, and deploying AI at scale.
                      </p>
                      <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>GANs</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Reinforcement Learning</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>MLOps</span>
                        <span style={{padding: '0.5rem 1rem', background: 'white', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500'}}>Model Deployment</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Alumni Profiles Section - New Stack Slider */}
          <section id="alumni-profiles-last" className="content-section" style={{background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)', padding: '4rem 2rem', marginBottom: '0'}}>
            <div style={{textAlign: 'center', marginBottom: '3rem'}}>
              <h2 className="section-heading section-title" style={{marginBottom: '1rem'}}><StarIcon size={24} color="#ffc107" /> Alumni Profiles</h2>
              <p className="section-description" style={{maxWidth: '700px', margin: '0 auto'}}>
                Real transformations. Real results. See how our alumni achieved their dream careers.
              </p>
            </div>

            <div style={{maxWidth: '1100px', margin: '0 auto', position: 'relative'}}>
              {/* Card Stack Container */}
              <div style={{display: 'flex', gap: '1.5rem', alignItems: 'stretch', justifyContent: 'center', position: 'relative', minHeight: '380px'}}>
                {alumniProfiles.map((alumni, index) => {
                  const isActive = index === currentAlumniSlide;
                  const isPrev = index === (currentAlumniSlide - 1 + alumniProfiles.length) % alumniProfiles.length;
                  const isNext = index === (currentAlumniSlide + 1) % alumniProfiles.length;

                  return (
                    <div
                      key={alumni.id}
                      onClick={() => setCurrentAlumniSlide(index)}
                      style={{
                        flex: isActive ? '1' : '0.28',
                        maxWidth: isActive ? '580px' : '180px',
                        transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                        cursor: isActive ? 'default' : 'pointer',
                        position: 'relative',
                        opacity: isActive ? 1 : 0.5,
                        transform: isActive ? 'scale(1)' : 'scale(0.9)',
                        filter: isActive ? 'none' : 'grayscale(20%)',
                        order: isActive ? 2 : (isPrev ? 1 : (isNext ? 3 : 0)),
                        display: (isPrev || isActive || isNext) ? 'block' : 'none'
                      }}
                    >
                      <div style={{
                        background: 'white',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        height: '100%',
                        boxShadow: isActive
                          ? '0 20px 60px rgba(10, 158, 199, 0.25), 0 0 0 3px rgba(10, 158, 199, 0.1)'
                          : '0 10px 30px rgba(0, 0, 0, 0.1)',
                        border: isActive ? '3px solid #0a9ec7' : '1px solid #e5e7eb',
                        transition: 'all 0.5s ease'
                      }}>
                        {/* Compact Header for inactive cards */}
                        {!isActive && (
                          <div style={{
                            background: alumni.gradient,
                            padding: '1.5rem',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            color: 'white'
                          }}>
                            <div style={{
                              width: '70px',
                              height: '70px',
                              borderRadius: '50%',
                              marginBottom: '0.75rem',
                              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                              overflow: 'hidden'
                            }}>
                              <img src={alumni.image} alt={alumni.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                            </div>
                            <h3 style={{fontSize: '1.1rem', fontWeight: '700', marginBottom: '0.4rem'}}>
                              {alumni.name}
                            </h3>
                            <p style={{fontSize: '0.85rem', opacity: '0.9'}}>
                              {alumni.role.split(' at ')[1]}
                            </p>
                            <div style={{
                              marginTop: '0.75rem',
                              padding: '0.4rem 0.85rem',
                              background: 'rgba(255, 255, 255, 0.2)',
                              borderRadius: '16px',
                              fontSize: '0.8rem',
                              fontWeight: '600'
                            }}>
                              Click to expand
                            </div>
                          </div>
                        )}

                        {/* Full Card for active card */}
                        {isActive && (
                          <>
                            <div style={{background: alumni.gradient, padding: '1.75rem 1.5rem', position: 'relative'}}>
                              <div style={{
                                position: 'absolute',
                                top: '8px',
                                right: '8px',
                                background: 'rgba(255, 255, 255, 0.3)',
                                padding: '0.4rem 0.85rem',
                                borderRadius: '16px',
                                color: 'white',
                                fontSize: '0.8rem',
                                fontWeight: '700',
                                backdropFilter: 'blur(10px)'
                              }}>
                                Featured Story <StarIcon size={16} color="#ffc107" />
                              </div>

                              <div style={{display: 'flex', gap: '1.25rem', alignItems: 'center', color: 'white'}}>
                                <div style={{
                                  width: '80px',
                                  height: '80px',
                                  borderRadius: '50%',
                                  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                                  flexShrink: 0,
                                  overflow: 'hidden'
                                }}>
                                  <img src={alumni.image} alt={alumni.name} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
                                </div>
                                <div>
                                  <h3 style={{fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.4rem'}}>
                                    {alumni.name}
                                  </h3>
                                  <p style={{fontSize: '1rem', opacity: '0.95'}}>
                                    {alumni.role}
                                  </p>
                                </div>
                              </div>
                            </div>

                            <div style={{padding: '1.5rem'}}>
                              <div style={{display: 'flex', gap: '0.85rem', marginBottom: '1.25rem'}}>
                                <div style={{
                                  flex: 1,
                                  background: '#f8f9fa',
                                  padding: '1rem',
                                  borderRadius: '10px',
                                  border: '2px solid #e9ecef'
                                }}>
                                  <div style={{fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.4rem', fontWeight: '600', textTransform: 'uppercase'}}>
                                    From
                                  </div>
                                  <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#1f2937'}}>
                                    {alumni.previousRole}
                                  </div>
                                </div>
                                <div style={{
                                  flex: 1,
                                  background: 'linear-gradient(135deg, #d1fae5, #a7f3d0)',
                                  padding: '1rem',
                                  borderRadius: '10px',
                                  border: '2px solid #6ee7b7'
                                }}>
                                  <div style={{fontSize: '0.7rem', color: '#065f46', marginBottom: '0.4rem', fontWeight: '600', textTransform: 'uppercase'}}>
                                    Growth
                                  </div>
                                  <div style={{fontSize: '0.95rem', fontWeight: '700', color: '#059669'}}>
                                    <ChartIcon size={16} color="#4caf50" /> {alumni.salaryJump}
                                  </div>
                                </div>
                              </div>

                              <div style={{
                                background: 'linear-gradient(135deg, #fff7ed, #ffedd5)',
                                padding: '1.25rem',
                                borderRadius: '10px',
                                borderLeft: '4px solid #f59e0b',
                                position: 'relative'
                              }}>
                                <div style={{
                                  position: 'absolute',
                                  top: '0.5rem',
                                  left: '0.85rem',
                                  opacity: '0.2'
                                }}>
                                  <UserIcon size={16} color="currentColor" />
                                </div>
                                <p style={{
                                  fontSize: '0.9rem',
                                  color: '#78350f',
                                  lineHeight: '1.6',
                                  fontStyle: 'italic',
                                  marginTop: '0.75rem'
                                }}>
                                  "{alumni.testimonial}"
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', alignItems: 'center'}}>
                <button
                  onClick={prevAlumniSlide}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #d5842e, #0a9ec7)',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(213, 132, 46, 0.3)',
                    transition: 'transform 0.2s',
                    fontWeight: 'bold'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ‹
                </button>

                <div style={{display: 'flex', gap: '0.5rem'}}>
                  {alumniProfiles.map((_, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentAlumniSlide(index)}
                      style={{
                        width: currentAlumniSlide === index ? '32px' : '10px',
                        height: '10px',
                        borderRadius: '5px',
                        background: currentAlumniSlide === index
                          ? 'linear-gradient(135deg, #d5842e, #0a9ec7)'
                          : '#cbd5e1',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  ))}
                </div>

                <button
                  onClick={nextAlumniSlide}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #d5842e, #0a9ec7)',
                    border: 'none',
                    color: 'white',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(213, 132, 46, 0.3)',
                    transition: 'transform 0.2s',
                    fontWeight: 'bold'
                  }}
                  onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                  onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          {/* 360DigiTMG Eligibility Test Section */}
          <section id="entrance-test" className="content-section">
            <h2 className="section-heading section-title">360DigiTMG Eligibility Test</h2>
            <p className="section-description">Take our entrance test to assess your current skill level and get personalized recommendations.</p>

            <div style={{background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', padding: '2.5rem', borderRadius: '12px', marginTop: '2rem', border: '2px solid #2196f3'}}>
              <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                <div style={{marginBottom: '1rem'}}><EditIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.5rem', fontWeight: '700', color: '#1565c0', marginBottom: '0.75rem'}}>Free Eligibility Assessment</h3>
                <p style={{fontSize: '1rem', color: '#424242', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto'}}>
                  Evaluate your skills and discover which program suits you best. Get personalized learning path recommendations.
                </p>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem'}}>
                <div style={{textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '10px'}}>
                  <div style={{marginBottom: '0.5rem'}}><ClockIcon size={24} color="#667eea" /></div>
                  <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#1976d2', marginBottom: '0.25rem'}}>30 mins</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Duration</div>
                </div>
                <div style={{textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '10px'}}>
                  <div style={{marginBottom: '0.5rem'}}><BrainIcon size={24} color="#667eea" /></div>
                  <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#1976d2', marginBottom: '0.25rem'}}>50 Questions</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280'}}>MCQ Format</div>
                </div>
                <div style={{textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: '10px'}}>
                  <div style={{marginBottom: '0.5rem'}}><ChartIcon size={24} color="#667eea" /></div>
                  <div style={{fontSize: '1.5rem', fontWeight: '700', color: '#1976d2', marginBottom: '0.25rem'}}>Instant Report</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Get Results</div>
                </div>
              </div>

              <div style={{marginBottom: '2rem'}}>
                <h4 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '1rem'}}>Test Sections:</h4>
                <div style={{display: 'grid', gap: '0.75rem'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: '8px'}}>
                    <span><CodeIcon size={16} color="#3776ab" /></span>
                    <span style={{fontSize: '0.95rem', fontWeight: '500', color: '#1f2937'}}>Python Programming Basics</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: '8px'}}>
                    <span>{/* TODO: Replace with <FaChartLine /> */}<span>⚠️</span></span>
                    <span style={{fontSize: '0.95rem', fontWeight: '500', color: '#1f2937'}}>Statistics & Mathematics</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: '8px'}}>
                    <span>{/* TODO: Replace with <FaRobot /> */}<span>⚠️</span></span>
                    <span style={{fontSize: '0.95rem', fontWeight: '500', color: '#1f2937'}}>Machine Learning Concepts</span>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', background: 'white', borderRadius: '8px'}}>
                    <span>{/* TODO: Replace with <FaLightbulb /> */}<span>⚠️</span></span>
                    <span style={{fontSize: '0.95rem', fontWeight: '500', color: '#1f2937'}}>Logical Reasoning & Aptitude</span>
                  </div>
                </div>
              </div>

              <div style={{textAlign: 'center'}}>
                <button style={{padding: '1rem 3rem', background: 'linear-gradient(135deg, #2196f3 0%, #1976d2 100%)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'}}>
                  Start Eligibility Test
                </button>
                <p style={{fontSize: '0.85rem', color: '#6b7280', marginTop: '0.75rem'}}>Free • No credit card required • Instant results</p>
              </div>
            </div>
          </section>

          {/* View Masterclass Section */}
          <section id="digitmg-events" className="content-section">
            <h2 className="section-heading section-title">View Masterclass</h2>
            <p className="section-description">Join our expert-led masterclasses on cutting-edge topics in data science and AI.</p>

            <div style={{display: 'grid', gap: '1.5rem', marginTop: '2rem'}}>
              {/* Masterclass 1 */}
              <div style={{display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '1.5rem', padding: '1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', alignItems: 'center'}}>
                <div style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
                  {/* TODO: Replace with <FaBrain /> */}<span>⚠️</span>
                </div>
                <div>
                  <h3 style={{fontSize: '1.15rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Deep Learning Fundamentals with PyTorch</h3>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>Learn neural networks, CNNs, and RNNs from scratch with hands-on coding sessions.</p>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#6b7280'}}>
                    <span>{/* TODO: Replace with <FaCalendar /> */}<span>⚠️</span> Oct 18, 2025</span>
                    <span>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 7:00 PM IST</span>
                    <span style={{color: '#059669', fontWeight: '600'}}>{/* TODO: Replace with <FaUsers /> */}<span>⚠️</span> 2.5k registered</span>
                  </div>
                </div>
                <button style={{padding: '0.75rem 1.5rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'}}>
                  Register Free
                </button>
              </div>

              {/* Masterclass 2 */}
              <div style={{display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '1.5rem', padding: '1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', alignItems: 'center'}}>
                <div style={{background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: '10px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
                  {/* TODO: Replace with <FaChartBar /> */}<span>⚠️</span>
                </div>
                <div>
                  <h3 style={{fontSize: '1.15rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Advanced Data Visualization Techniques</h3>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>Master matplotlib, seaborn, and plotly to create stunning interactive visualizations.</p>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#6b7280'}}>
                    <span>{/* TODO: Replace with <FaCalendar /> */}<span>⚠️</span> Oct 20, 2025</span>
                    <span>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 6:30 PM IST</span>
                    <span style={{color: '#059669', fontWeight: '600'}}>{/* TODO: Replace with <FaUsers /> */}<span>⚠️</span> 1.8k registered</span>
                  </div>
                </div>
                <button style={{padding: '0.75rem 1.5rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'}}>
                  Register Free
                </button>
              </div>

              {/* Masterclass 3 */}
              <div style={{display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '1.5rem', padding: '1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', alignItems: 'center'}}>
                <div style={{background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', borderRadius: '10px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
                  {/* TODO: Replace with <FaComments /> */}<span>⚠️</span>
                </div>
                <div>
                  <h3 style={{fontSize: '1.15rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Natural Language Processing with Transformers</h3>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>Explore BERT, GPT, and state-of-the-art NLP models for text processing.</p>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#6b7280'}}>
                    <span>{/* TODO: Replace with <FaCalendar /> */}<span>⚠️</span> Oct 22, 2025</span>
                    <span>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 8:00 PM IST</span>
                    <span style={{color: '#059669', fontWeight: '600'}}>{/* TODO: Replace with <FaUsers /> */}<span>⚠️</span> 3.2k registered</span>
                  </div>
                </div>
                <button style={{padding: '0.75rem 1.5rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'}}>
                  Register Free
                </button>
              </div>

              {/* Masterclass 4 */}
              <div style={{display: 'grid', gridTemplateColumns: '200px 1fr auto', gap: '1.5rem', padding: '1.5rem', background: 'white', border: '1px solid #e5e7eb', borderRadius: '12px', alignItems: 'center'}}>
                <div style={{background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', borderRadius: '10px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'}}>
                  {/* TODO: Replace with <FaRocket /> */}<span>⚠️</span>
                </div>
                <div>
                  <h3 style={{fontSize: '1.15rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>MLOps: Deploying ML Models to Production</h3>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>Learn Docker, Kubernetes, and cloud deployment strategies for ML systems.</p>
                  <div style={{display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#6b7280'}}>
                    <span>{/* TODO: Replace with <FaCalendar /> */}<span>⚠️</span> Oct 25, 2025</span>
                    <span>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 7:30 PM IST</span>
                    <span style={{color: '#059669', fontWeight: '600'}}>{/* TODO: Replace with <FaUsers /> */}<span>⚠️</span> 2.1k registered</span>
                  </div>
                </div>
                <button style={{padding: '0.75rem 1.5rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap'}}>
                  Register Free
                </button>
              </div>
            </div>
          </section>

          {/* Coding Problems Section */}
          <section id="problems" className="content-section">
            <h2 className="section-heading section-title">Coding Problems</h2>
            <p className="section-description">Sharpen your coding skills with our curated collection of practice problems.</p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
              {/* Easy Problems */}
              <div style={{padding: '2rem', background: 'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)', borderRadius: '12px', border: '2px solid #4caf50'}}>
                <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                  <div style={{marginBottom: '0.5rem'}}>{/* TODO: Replace with <FaCheck /> */}<span>⚠️</span></div>
                  <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#2e7d32', marginBottom: '0.5rem'}}>Easy Problems</h3>
                  <p style={{fontSize: '0.9rem', color: '#1b5e20'}}>Perfect for beginners</p>
                </div>
                <div style={{background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
                  <div style={{fontSize: '2rem', fontWeight: '700', color: '#4caf50', textAlign: 'center'}}>250+</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280', textAlign: 'center'}}>Problems Available</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#1b5e20'}}>
                  <div>✓ Arrays & Strings</div>
                  <div>✓ Basic Math</div>
                  <div>✓ Loops & Conditions</div>
                </div>
              </div>

              {/* Medium Problems */}
              <div style={{padding: '2rem', background: 'linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%)', borderRadius: '12px', border: '2px solid #ff9800'}}>
                <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                  <div style={{marginBottom: '0.5rem'}}>{/* TODO: Replace with <FaExclamation /> */}<span>⚠️</span></div>
                  <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#e65100', marginBottom: '0.5rem'}}>Medium Problems</h3>
                  <p style={{fontSize: '0.9rem', color: '#e65100'}}>Intermediate challenge</p>
                </div>
                <div style={{background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
                  <div style={{fontSize: '2rem', fontWeight: '700', color: '#ff9800', textAlign: 'center'}}>180+</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280', textAlign: 'center'}}>Problems Available</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#e65100'}}>
                  <div>✓ Recursion & DP</div>
                  <div>✓ Trees & Graphs</div>
                  <div>✓ Sorting Algorithms</div>
                </div>
              </div>

              {/* Hard Problems */}
              <div style={{padding: '2rem', background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)', borderRadius: '12px', border: '2px solid #f44336'}}>
                <div style={{textAlign: 'center', marginBottom: '1.5rem'}}>
                  <div style={{marginBottom: '0.5rem'}}>{/* TODO: Replace with <FaExclamationTriangle /> */}<span>⚠️</span></div>
                  <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#c62828', marginBottom: '0.5rem'}}>Hard Problems</h3>
                  <p style={{fontSize: '0.9rem', color: '#c62828'}}>Expert level</p>
                </div>
                <div style={{background: 'white', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
                  <div style={{fontSize: '2rem', fontWeight: '700', color: '#f44336', textAlign: 'center'}}>120+</div>
                  <div style={{fontSize: '0.85rem', color: '#6b7280', textAlign: 'center'}}>Problems Available</div>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#c62828'}}>
                  <div>✓ Advanced DP</div>
                  <div>✓ Graph Algorithms</div>
                  <div>✓ Complex DS</div>
                </div>
              </div>
            </div>
          </section>

          {/* Guidance Sessions Section */}
          <section id="guidance-sessions" className="content-section">
            <h2 className="section-heading section-title">Guidance Sessions</h2>
            <p className="section-description">Book one-on-one sessions with industry experts for personalized career guidance.</p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginTop: '2rem'}}>
              <div style={{padding: '2rem', background: 'white', border: '2px solid #2196f3', borderRadius: '12px'}}>
                <div style={{marginBottom: '1rem'}}><StarIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Career Counseling</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Get expert advice on career transitions, skill development, and industry trends.</p>
                <div style={{fontSize: '0.85rem', color: '#2196f3', fontWeight: '600', marginBottom: '1rem'}}>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 45 min session • Free</div>
                <button style={{width: '100%', padding: '0.75rem', background: '#2196f3', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'}}>Book Now</button>
              </div>

              <div style={{padding: '2rem', background: 'white', border: '2px solid #9c27b0', borderRadius: '12px'}}>
                <div style={{marginBottom: '1rem'}}><EditIcon size={32} color="#667eea" /></div>
                <h3 style={{fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Resume Review</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Professional feedback on your resume with actionable improvement suggestions.</p>
                <div style={{fontSize: '0.85rem', color: '#9c27b0', fontWeight: '600', marginBottom: '1rem'}}>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 30 min session • Free</div>
                <button style={{width: '100%', padding: '0.75rem', background: '#9c27b0', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'}}>Book Now</button>
              </div>

              <div style={{padding: '2rem', background: 'white', border: '2px solid #ff9800', borderRadius: '12px'}}>
                <div style={{marginBottom: '1rem'}}>{/* TODO: Replace with <FaBriefcase /> */}<span>⚠️</span></div>
                <h3 style={{fontSize: '1.2rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.75rem'}}>Portfolio Review</h3>
                <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '1rem'}}>Showcase your projects effectively with expert portfolio guidance.</p>
                <div style={{fontSize: '0.85rem', color: '#ff9800', fontWeight: '600', marginBottom: '1rem'}}>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 45 min session • Premium</div>
                <button style={{width: '100%', padding: '0.75rem', background: '#ff9800', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer'}}>Book Now</button>
              </div>
            </div>
          </section>

          {/* Premium Classes Section */}
          <section id="premium-classes" className="content-section">
            <h2 className="section-heading section-title">Premium Classes</h2>
            <p className="section-description">Access our premium content and accelerate your learning with advanced courses.</p>

            <div style={{display: 'grid', gap: '1.5rem', marginTop: '2rem'}}>
              <div style={{display: 'flex', gap: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '12px', color: 'white', alignItems: 'center'}}>
                <div style={{flex: 1}}>
                  <h3 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem'}}>Data Science Masterclass</h3>
                  <p style={{fontSize: '1rem', marginBottom: '1rem', opacity: '0.95'}}>Complete end-to-end program covering statistics, ML, deep learning, and deployment.</p>
                  <div style={{display: 'flex', gap: '1.5rem', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
                    <span>{/* TODO: Replace with <FaCalendar /> */}<span>⚠️</span> 12 months</span>
                    <span>{/* TODO: Replace with <FaGraduationCap /> */}<span>⚠️</span> IIT-R certified</span>
                    <span>{/* TODO: Replace with <FaBriefcase /> */}<span>⚠️</span> Placement support</span>
                  </div>
                  <button style={{padding: '0.75rem 2rem', background: 'white', color: '#667eea', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer'}}>Enroll Now</button>
                </div>
                <div>{/* TODO: Replace with <FaGraduationCap /> */}<span>⚠️</span></div>
              </div>

              <div style={{display: 'flex', gap: '2rem', padding: '2rem', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: '12px', color: 'white', alignItems: 'center'}}>
                <div style={{flex: 1}}>
                  <h3 style={{fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem'}}>AI & ML Specialization</h3>
                  <p style={{fontSize: '1rem', marginBottom: '1rem', opacity: '0.95'}}>Advanced program focusing on neural networks, NLP, computer vision, and reinforcement learning.</p>
                  <div style={{display: 'flex', gap: '1.5rem', fontSize: '0.9rem', marginBottom: '1.5rem'}}>
                    <span>{/* TODO: Replace with <FaCalendar /> */}<span>⚠️</span> 10 months</span>
                    <span>{/* TODO: Replace with <FaGraduationCap /> */}<span>⚠️</span> Industry certified</span>
                    <span>{/* TODO: Replace with <FaBriefcase /> */}<span>⚠️</span> Job guarantee</span>
                  </div>
                  <button style={{padding: '0.75rem 2rem', background: 'white', color: '#f5576c', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer'}}>Enroll Now</button>
                </div>
                <div>{/* TODO: Replace with <FaRobot /> */}<span>⚠️</span></div>
              </div>
            </div>
          </section>

          {/* Expert Guidance Section */}
          <section id="expert-guidance" className="content-section">
            <h2 className="section-heading section-title">Expert Guidance</h2>
            <p className="section-description">Get mentorship from industry veterans to guide your career path.</p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem'}}>
              <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <div style={{background: '#667eea', padding: '1.5rem', textAlign: 'center'}}>
                  <div style={{width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src="https://i.pravatar.cc/80?img=20" alt="mentor" style={{borderRadius: '50%', width: '80px', height: '80px'}} /></div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Dr. Suresh Reddy</h3>
                  <p style={{fontSize: '0.85rem', color: '#2196f3', fontWeight: '600', marginBottom: '0.75rem'}}>Senior Data Scientist @ Google</p>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>15+ years in ML • PhD in AI • 50+ research papers</p>
                  <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Specializes in: Deep Learning, NLP</div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <div style={{background: '#f093fb', padding: '1.5rem', textAlign: 'center'}}>
                  <div style={{width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src="https://i.pravatar.cc/80?img=20" alt="mentor" style={{borderRadius: '50%', width: '80px', height: '80px'}} /></div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Anjali Patel</h3>
                  <p style={{fontSize: '0.85rem', color: '#9c27b0', fontWeight: '600', marginBottom: '0.75rem'}}>ML Lead @ Microsoft</p>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>12+ years in industry • Ex-Amazon • Stanford MS</p>
                  <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Specializes in: Computer Vision, MLOps</div>
                </div>
              </div>

              <div style={{background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}>
                <div style={{background: '#4facfe', padding: '1.5rem', textAlign: 'center'}}>
                  <div style={{width: '80px', height: '80px', background: 'white', borderRadius: '50%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><img src="https://i.pravatar.cc/80?img=20" alt="mentor" style={{borderRadius: '50%', width: '80px', height: '80px'}} /></div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.1rem', fontWeight: '700', color: '#1f2937', marginBottom: '0.5rem'}}>Vikram Singh</h3>
                  <p style={{fontSize: '0.85rem', color: '#2196f3', fontWeight: '600', marginBottom: '0.75rem'}}>AI Architect @ Amazon</p>
                  <p style={{fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '0.75rem'}}>10+ years experience • Ex-Tesla • IIT Delhi</p>
                  <div style={{fontSize: '0.85rem', color: '#6b7280'}}>Specializes in: AI Systems, Scalability</div>
                </div>
              </div>
            </div>
          </section>

          {/* Success Stories Section */}
          <section id="success-stories" className="content-section">
            <h2 className="section-heading section-title">Success Stories</h2>
            <p className="section-description">Inspiring journeys of our learners who transformed their careers with 360DigiTMG.</p>

            <div style={{display: 'grid', gap: '2rem', marginTop: '2rem'}}>
              <div style={{background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)', padding: '2rem', borderRadius: '12px', border: '2px solid #2196f3'}}>
                <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start'}}>
                  <div style={{width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><img src="https://i.pravatar.cc/100?img=68" alt="success" style={{borderRadius: '50%', width: '100px', height: '100px'}} /></div>
                  <div style={{flex: 1}}>
                    <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#1565c0', marginBottom: '0.5rem'}}>From Mechanical Engineer to Data Scientist</h3>
                    <p style={{fontSize: '0.95rem', fontWeight: '600', color: '#1976d2', marginBottom: '1rem'}}>Karthik Rao • Now at Flipkart</p>
                    <p style={{fontSize: '1rem', color: '#424242', lineHeight: '1.7', marginBottom: '1rem'}}>
                      "I was a mechanical engineer with 5 years of experience, but I always wanted to work with data. 360DigiTMG's comprehensive curriculum and placement support helped me land my dream job as a Data Scientist at Flipkart with a 250% salary hike. The hands-on projects and mentorship were game-changers for me."
                    </p>
                    <div style={{display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#1976d2', fontWeight: '600'}}>
                      <span>{/* TODO: Replace with <FaQuestionCircle /> */}<span>⚠️</span> 250% salary increase</span>
                      <span>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 8 months program</span>
                      <span>{/* TODO: Replace with <FaBullseye /> */}<span>⚠️</span> Dream role achieved</span>
                    </div>
                  </div>
                </div>
              </div>

              <div style={{background: 'linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%)', padding: '2rem', borderRadius: '12px', border: '2px solid #9c27b0'}}>
                <div style={{display: 'flex', gap: '2rem', alignItems: 'flex-start'}}>
                  <div style={{width: '100px', height: '100px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}><img src="https://i.pravatar.cc/100?img=69" alt="success" style={{borderRadius: '50%', width: '100px', height: '100px'}} /></div>
                  <div style={{flex: 1}}>
                    <h3 style={{fontSize: '1.3rem', fontWeight: '700', color: '#7b1fa2', marginBottom: '0.5rem'}}>Fresh Graduate to ML Engineer at Microsoft</h3>
                    <p style={{fontSize: '0.95rem', fontWeight: '600', color: '#9c27b0', marginBottom: '1rem'}}>Sneha Verma • ML Engineer at Microsoft</p>
                    <p style={{fontSize: '1rem', color: '#424242', lineHeight: '1.7', marginBottom: '1rem'}}>
                      "As a fresh CS graduate, I had theoretical knowledge but lacked practical skills. 360DigiTMG's industry-oriented program with real-world projects gave me the confidence to crack interviews at top tech companies. The AI mock interviews were especially helpful in my preparation."
                    </p>
                    <div style={{display: 'flex', gap: '1rem', fontSize: '0.9rem', color: '#9c27b0', fontWeight: '600'}}>
                      <span>{/* TODO: Replace with <FaGraduationCap /> */}<span>⚠️</span> Fresh graduate</span>
                      <span>{/* TODO: Replace with <FaClock /> */}<span>⚠️</span> 6 months to placement</span>
                      <span>{/* TODO: Replace with <FaQuestionCircle /> */}<span>⚠️</span> Microsoft offer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Industry Partners Section */}
          <section id="industry-partners" className="industry-partners-section">
            <h2 className="section-heading section-title">Industry Partners & Hiring Companies</h2>
            <p className="section-description">Our alumni have been hired by leading companies across the globe</p>

            <div className="partners-grid">
              <div className="partner-card">
                
                <h4 className="partner-name">Google</h4>
                <p className="partner-hires">150+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Microsoft</h4>
                <p className="partner-hires">120+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Amazon</h4>
                <p className="partner-hires">200+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Tesla</h4>
                <p className="partner-hires">80+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">IBM</h4>
                <p className="partner-hires">90+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Accenture</h4>
                <p className="partner-hires">110+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Meta</h4>
                <p className="partner-hires">95+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Apple</h4>
                <p className="partner-hires">75+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Netflix</h4>
                <p className="partner-hires">60+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Adobe</h4>
                <p className="partner-hires">85+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Flipkart</h4>
                <p className="partner-hires">130+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">PayPal</h4>
                <p className="partner-hires">70+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Salesforce</h4>
                <p className="partner-hires">100+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Oracle</h4>
                <p className="partner-hires">95+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Goldman Sachs</h4>
                <p className="partner-hires">65+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Nvidia</h4>
                <p className="partner-hires">55+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Uber</h4>
                <p className="partner-hires">75+ Hires</p>
              </div>

              <div className="partner-card">
                
                <h4 className="partner-name">Airbnb</h4>
                <p className="partner-hires">50+ Hires</p>
              </div>
            </div>
          </section>
        </main>
           </header>
      </section>


        {/* RIGHT SIDEBAR */}
        <aside className="sidebar-right">
          {/* Premium Experience Box */}
          <div className="premium-cta-box">
            <p className="premium-subtitle">Complete actions and experience</p>
            <h3 className="premium-title">360DigiTMG Premium for FREE</h3>
            <p className="premium-progress">2 more steps to go...</p>
          </div>

          {/* Action Checklist */}
          <div className="action-checklist">
            <div className="action-item">
              <div className="action-number">1</div>
              <span>Book Guidance Session with Data Science Expert</span>
            </div>
            <div className="action-item completed">
              <div className="action-checkmark">✓</div>
              <span>Register Free Masterclass</span>
            </div>
            <div className="action-item">
              <div className="action-number">2</div>
              <span>Get Career Roadmap</span>
            </div>
          </div>

          <a href="#" className="link-experience-premium">Experience Premium →</a>

          {/* WhatsApp Group Button */}
          <button className="btn-whatsapp">
            <span className="whatsapp-icon">💬</span>
            Join FREE Class Group !
          </button>

          {/* Placement News Card */}
          <div className="placement-news-card">
            <div className="news-header">
              <h4>Placement News</h4>
              <a href="#" className="link-view-alumni">View Alumni</a>
            </div>
            <div className="report-card">
              <div className="year-tag">2024</div>
              <div className="report-icon">📊</div>
              <h5>360DigiTMG Career Transition Report</h5>
              <p className="verification-text">✓ Verified by 83K Analytics</p>
            </div>
          </div>
        </aside>
          </div>
        </aside>
      </section>
    </main>
  );
};

export default CoursePageModern;
