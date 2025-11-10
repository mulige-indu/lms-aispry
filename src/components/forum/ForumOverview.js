import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import forumService from '../../services/forumService';
import './ForumOverview.css';
import '../courses/Courses.css';
import {
  SearchIcon, ClockIcon, HeartIcon, ArrowIcon, CodeIcon,
  BrainIcon, UserIcon, CheckIcon, MyCoursesIcon, BrowseIcon,
  ForumIcon, SupportIcon
} from '../common/SvgIcons';

// Helper function to get or create guest user
const getUser = () => {
  const userStr = localStorage.getItem('student');
  if (userStr) {
    return JSON.parse(userStr);
  }
  // Create guest user if none exists
  const guestUser = { id: 'guest-user', firstName: 'Guest', lastName: 'User', email: 'guest@example.com' };
  localStorage.setItem('student', JSON.stringify(guestUser));
  return guestUser;
};

// Map icon names to SVG components
const iconMap = {
  FaComments: UserIcon,
  FaQuestionCircle: BrainIcon,
  FaCode: CodeIcon,
  FaBriefcase: CodeIcon,
  FaLightbulb: BrainIcon,
  FaUsers: UserIcon
};

const ForumOverview = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [recentThreads, setRecentThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

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
    fetchForumData();
  }, [sortBy, filterStatus]);

  const fetchForumData = async () => {
    setLoading(true);
    try {
      const [categoriesRes, threadsRes] = await Promise.all([
        forumService.getAllCategories(),
        forumService.getAllThreads(1, 20, sortBy, searchQuery, filterStatus)
      ]);

      if (categoriesRes.success) {
        setCategories(categoriesRes.data);
      }

      if (threadsRes.success && threadsRes.data) {
        setRecentThreads(threadsRes.data.threads || []);
      }
    } catch (error) {
      console.error('Error fetching forum data:', error);
      setRecentThreads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      fetchForumData();
      return;
    }

    setLoading(true);
    const result = await forumService.getAllThreads(1, 20, sortBy, searchQuery, filterStatus);
    if (result.success) {
      setRecentThreads(result.data);
    }
    setLoading(false);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffMs = now - time;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return time.toLocaleDateString();
  };

  const renderIcon = (iconName) => {
    const Icon = iconMap[iconName] || UserIcon;
    return <Icon size={24} color="currentColor" />;
  };

  if (loading && categories.length === 0) {
    return (
      <div className="forum-loading">
        <div className="spinner"></div>
        <p>Loading forum...</p>
      </div>
    );
  }

  return (
    <div className="forum-overview">
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
            <button className="nav-btn" onClick={() => navigate('/courses')}>
              <BrowseIcon size={20} color="currentColor" /> Browse Courses
            </button>
            <button className="nav-btn active" onClick={() => navigate('/forum')}>
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

      <div className="forum-header">
        <div className="forum-header-content">
          <h1>Discussion Forum</h1>
          <p>Connect with fellow learners, ask questions, and share knowledge</p>
        </div>
        <button
          className="create-thread-btn"
          onClick={() => navigate('/forum/create')}
        >
          + New Thread
        </button>
      </div>

      <div className="forum-search-section">
        <form onSubmit={handleSearch} className="forum-search-form">
          <div className="search-input-wrapper">
            <SearchIcon className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="forum-search-input"
            />
          </div>
          <button type="submit" className="search-btn">Search</button>
        </form>

        <div className="forum-sort">
          <button
            className={sortBy === 'recent' ? 'active' : ''}
            onClick={() => setSortBy('recent')}
          >
            <ClockIcon size={16} /> Recent
          </button>
          <button
            className={sortBy === 'popular' ? 'active' : ''}
            onClick={() => setSortBy('popular')}
          >
            <HeartIcon size={16} /> Popular
          </button>
          <button
            className={sortBy === 'replies' ? 'active' : ''}
            onClick={() => setSortBy('replies')}
          >
            <UserIcon size={16} /> Most Replies
          </button>
          <button
            className={filterStatus === 'unanswered' ? 'active' : ''}
            onClick={() => setFilterStatus('unanswered')}
          >
            <BrainIcon size={16} /> Unanswered
          </button>
          <button
            className={filterStatus === 'pending' ? 'active' : ''}
            onClick={() => setFilterStatus('pending')}
          >
            <ClockIcon size={16} /> Pending Approval
          </button>
        </div>
      </div>

      <div className="forum-categories-grid">
        {categories.map(category => (
          <div
            key={category.id}
            className="category-card"
            onClick={() => navigate(`/forum/category/${category.id}`)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon">
              {renderIcon(category.icon)}
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="thread-count">{category.thread_count} threads</span>
            </div>
          </div>
        ))}
      </div>

      <div className="forum-threads-section">
        <h2>
          {filterStatus === 'all' && sortBy === 'recent' && 'Recent Discussions'}
          {filterStatus === 'all' && sortBy === 'popular' && 'Popular Discussions'}
          {filterStatus === 'all' && sortBy === 'replies' && 'Most Discussed'}
          {filterStatus === 'unanswered' && 'Unanswered Questions'}
          {filterStatus === 'pending' && 'Pending Approval'}
        </h2>

        {loading ? (
          <div className="threads-loading">
            <div className="spinner"></div>
          </div>
        ) : recentThreads.length === 0 ? (
          <div className="no-threads">
            <p>No discussions found. Be the first to start a conversation!</p>
            <button onClick={() => navigate('/forum/create')}>
              + Create Thread
            </button>
          </div>
        ) : (
          <div className="threads-list">
            {recentThreads.map(thread => (
              <div
                key={thread.id}
                className="thread-item"
                onClick={() => navigate(`/forum/thread/${thread.id}`)}
              >
                <div className="thread-main">
                  <div className="thread-header">
                    <span
                      className="thread-category"
                      style={{ backgroundColor: thread.category_color }}
                    >
                      {thread.category_name}
                    </span>
                    {thread.is_pinned && <span className="pinned-badge">Pinned</span>}
                    {thread.is_resolved && <span className="resolved-badge"><CheckIcon size={12} /> Resolved</span>}
                  </div>
                  <h3 className="thread-title">{thread.title}</h3>
                  <p className="thread-excerpt">
                    {thread.content.substring(0, 150)}
                    {thread.content.length > 150 && '...'}
                  </p>
                  <div className="thread-meta">
                    <span className="thread-author">
                      by {thread.firstName} {thread.lastName}
                    </span>
                    <span className="thread-time">
                      <ClockIcon size={14} /> {formatTimeAgo(thread.last_activity_at)}
                    </span>
                  </div>
                </div>
                <div className="thread-stats">
                  <div className="stat">
                    <span>{thread.view_count} views</span>
                  </div>
                  <div className="stat">
                    <UserIcon size={14} />
                    <span>{thread.actual_reply_count || thread.reply_count}</span>
                  </div>
                  <div className="stat">
                    <HeartIcon size={14} />
                    <span>{thread.like_count || 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumOverview;
