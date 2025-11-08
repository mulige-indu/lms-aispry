import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import forumService from '../../services/forumService';
import authService from '../../services/authService';
import './ForumOverview.css';
import {
  FaComments, FaQuestionCircle, FaCode, FaBriefcase,
  FaLightbulb, FaUsers, FaPlus, FaSearch, FaFire,
  FaClock, FaComment, FaEye, FaHeart, FaHourglassHalf, FaCheckCircle, FaArrowLeft
} from 'react-icons/fa';

const iconMap = {
  FaComments, FaQuestionCircle, FaCode, FaBriefcase,
  FaLightbulb, FaUsers
};

const ForumOverview = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [recentThreads, setRecentThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filterStatus, setFilterStatus] = useState('all');
  const user = authService.getUser();

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }
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

      if (threadsRes.success) {
        setRecentThreads(threadsRes.data);
      }
    } catch (error) {
      console.error('Error fetching forum data:', error);
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
    const Icon = iconMap[iconName] || FaComments;
    return <Icon />;
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
      <div className="forum-back-header">
        <button onClick={() => navigate('/courses')} className="forum-back-btn">
          <FaArrowLeft /> Back to Courses
        </button>
      </div>

      <div className="forum-header">
        <div className="forum-header-content">
          <h1>Discussion Forum</h1>
          <p>Connect with fellow learners, ask questions, and share knowledge</p>
        </div>
        <button
          className="create-thread-btn"
          onClick={() => navigate('/forum/create')}
        >
          <FaPlus /> New Thread
        </button>
      </div>

      <div className="forum-search-section">
        <form onSubmit={handleSearch} className="forum-search-form">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
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
            <FaClock /> Recent
          </button>
          <button
            className={sortBy === 'popular' ? 'active' : ''}
            onClick={() => setSortBy('popular')}
          >
            <FaFire /> Popular
          </button>
          <button
            className={sortBy === 'replies' ? 'active' : ''}
            onClick={() => setSortBy('replies')}
          >
            <FaComment /> Most Replies
          </button>
          <button
            className={filterStatus === 'unanswered' ? 'active' : ''}
            onClick={() => setFilterStatus('unanswered')}
          >
            <FaQuestionCircle /> Unanswered
          </button>
          <button
            className={filterStatus === 'pending' ? 'active' : ''}
            onClick={() => setFilterStatus('pending')}
          >
            <FaHourglassHalf /> Pending Approval
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
              <FaPlus /> Create Thread
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
                    {thread.is_resolved && <span className="resolved-badge">Resolved</span>}
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
                      <FaClock /> {formatTimeAgo(thread.last_activity_at)}
                    </span>
                  </div>
                </div>
                <div className="thread-stats">
                  <div className="stat">
                    <FaEye />
                    <span>{thread.view_count}</span>
                  </div>
                  <div className="stat">
                    <FaComment />
                    <span>{thread.actual_reply_count || thread.reply_count}</span>
                  </div>
                  <div className="stat">
                    <FaHeart />
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
