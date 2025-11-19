import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import forumService from '../../services/forumService';
import './DiscussionThread.css';
import '../courses/Courses.css';
import {
  ArrowIcon, HeartIcon, ClockIcon, EditIcon, DeleteIcon, SendIcon,
  MyCoursesIcon, BrowseIcon, ForumIcon, SupportIcon
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

const DiscussionThread = () => {
  const { threadId } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyContent, setReplyContent] = useState('');
  const [editingPostId, setEditingPostId] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
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
    fetchThread();
  }, [threadId]);

  const fetchThread = async () => {
    setLoading(true);
    try {
      const result = await forumService.getThread(threadId);
      if (result.success) {
        setThread(result.data.thread);
        setPosts(result.data.posts);
      } else {
        console.error('Failed to fetch thread');
      }
    } catch (error) {
      console.error('Error fetching thread:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyContent.trim() || submitting) return;

    setSubmitting(true);
    try {
      const result = await forumService.createPost(
        user.id,
        threadId,
        replyContent
      );

      if (result.success) {
        setPosts([...posts, result.data]);
        setReplyContent('');
      } else {
        alert('Failed to post reply');
      }
    } catch (error) {
      console.error('Error posting reply:', error);
      alert('Failed to post reply');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (postId) => {
    if (!editContent.trim()) return;

    try {
      const result = await forumService.updatePost(postId, user.id, editContent);
      if (result.success) {
        setPosts(posts.map(post =>
          post.id === postId
            ? { ...post, content: editContent, is_edited: true }
            : post
        ));
        setEditingPostId(null);
        setEditContent('');
      } else {
        alert('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post');
    }
  };

  const handleDelete = async (postId) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const result = await forumService.deletePost(postId, user.id);
      if (result.success) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const handleLikeThread = async () => {
    try {
      const result = await forumService.likeThread(threadId, user.id);
      if (result.success) {
        setLiked(result.liked);
        setThread({
          ...thread,
          like_count: result.liked ? thread.like_count + 1 : thread.like_count - 1
        });
      }
    } catch (error) {
      console.error('Error liking thread:', error);
    }
  };

  const handleBookmarkThread = async () => {
    try {
      const result = await forumService.bookmarkThread(threadId, user.id);
      if (result.success) {
        setBookmarked(result.bookmarked);
      }
    } catch (error) {
      console.error('Error bookmarking thread:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const result = await forumService.likePost(postId, user.id);
      if (result.success) {
        setPosts(posts.map(post =>
          post.id === postId
            ? { ...post, like_count: result.liked ? (post.like_count || 0) + 1 : (post.like_count || 1) - 1 }
            : post
        ));
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
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

  if (loading) {
    return (
      <div className="thread-loading">
        <div className="spinner"></div>
        <p>Loading discussion...</p>
      </div>
    );
  }

  if (!thread) {
    return (
      <div className="thread-error">
        <h2>Thread not found</h2>
        <button onClick={() => navigate('/forum')}>Back to Forum</button>
      </div>
    );
  }

  return (
    <main className="discussion-thread">
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

      <article className="thread-content-wrapper">
        <section className="thread-original-post">
          <div className="post-header">
            <div className="author-info">
              <div className="author-avatar">
                {thread.firstName[0]}{thread.lastName[0]}
              </div>
              <div>
                <h4>{thread.firstName} {thread.lastName}</h4>
                <span className="post-time">
                  <ClockIcon size={14} /> {formatTimeAgo(thread.created_at)}
                </span>
              </div>
            </div>
            <div className="thread-actions">
              <button
                onClick={handleLikeThread}
                className={`action-btn ${liked ? 'liked' : ''}`}
              >
                <HeartIcon size={18} color={liked ? '#e91e63' : 'currentColor'} />
                <span>{thread.like_count || 0}</span>
              </button>
              <button
                onClick={handleBookmarkThread}
                className={`action-btn ${bookmarked ? 'bookmarked' : ''}`}
              >
                {bookmarked ? '★' : '☆'}
              </button>
            </div>
          </div>

          <h1 className="thread-title">{thread.title}</h1>
          <div className="thread-content">
            {thread.content}
          </div>

          <div className="thread-stats-footer">
            <span>{thread.view_count} views</span>
            <span>{posts.length} replies</span>
          </div>
        </section>

        <section className="thread-replies">
          <h3>{posts.length} Replies</h3>

          {posts.length === 0 ? (
            <div className="no-replies">
              <p>No replies yet. Be the first to respond!</p>
            </div>
          ) : (
            posts.map(post => (
              <article key={post.id} className="reply-item">
                <div className="reply-header">
                  <div className="author-info">
                    <div className="author-avatar">
                      {post.firstName[0]}{post.lastName[0]}
                    </div>
                    <div>
                      <h4>{post.firstName} {post.lastName}</h4>
                      <span className="post-time">
                        <ClockIcon size={14} /> {formatTimeAgo(post.created_at)}
                        {post.is_edited && <span className="edited-badge"> (edited)</span>}
                      </span>
                    </div>
                  </div>
                  <div className="reply-actions">
                    <button
                      onClick={() => handleLikePost(post.id)}
                      className="action-btn-small"
                    >
                      <HeartIcon size={14} /> {post.like_count || 0}
                    </button>
                    {user.id === post.user_id && (
                      <>
                        <button
                          onClick={() => {
                            setEditingPostId(post.id);
                            setEditContent(post.content);
                          }}
                          className="action-btn-small"
                        >
                          <EditIcon size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="action-btn-small delete"
                        >
                          <DeleteIcon size={14} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {editingPostId === post.id ? (
                  <div className="edit-form">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      rows={4}
                    />
                    <div className="edit-actions">
                      <button onClick={() => handleEdit(post.id)} className="save-btn">
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingPostId(null);
                          setEditContent('');
                        }}
                        className="cancel-btn"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="reply-content">{post.content}</div>
                )}
              </article>
            ))
          )}
        </section>

        <section className="reply-form-wrapper">
          <h3><SendIcon size={20} /> Post a Reply</h3>
          <form onSubmit={handleReply} className="reply-form">
            <textarea
              placeholder="Share your thoughts..."
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              rows={5}
              required
            />
            <button type="submit" disabled={submitting || !replyContent.trim()}>
              {submitting ? 'Posting...' : 'Post Reply'}
            </button>
          </form>
        </section>
      </article>
    </main>
  );
};

export default DiscussionThread;
