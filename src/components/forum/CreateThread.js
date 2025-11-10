import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import forumService from '../../services/forumService';
import './CreateThread.css';
import '../courses/Courses.css';
import {
  ArrowIcon, EditIcon, CloseIcon, MyCoursesIcon, BrowseIcon,
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

const CreateThread = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    courseId: '',
    title: '',
    content: ''
  });
  const [errors, setErrors] = useState({});
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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, coursesRes] = await Promise.all([
        forumService.getAllCategories(),
        fetch(`${window.location.origin.replace('3000', '8080')}/api/courses`).then(res => res.json())
      ]);

      if (categoriesRes.success) {
        setCategories(categoriesRes.data);
        if (categoriesRes.data.length > 0) {
          setFormData(prev => ({ ...prev, categoryId: categoriesRes.data[0].id }));
        }
      }

      if (coursesRes.success) {
        setCourses(coursesRes.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }

    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    } else if (formData.content.length < 20) {
      newErrors.content = 'Content must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    try {
      // Check if selected value is a course (has "course-" prefix)
      let categoryId = formData.categoryId;
      let courseId = null;

      if (formData.categoryId.startsWith('course-')) {
        // Extract course ID and set a default category
        courseId = formData.categoryId.replace('course-', '');
        // Use first category as default when course is selected
        categoryId = categories.length > 0 ? categories[0].id : null;
      }

      const result = await forumService.createThread(
        user.id,
        categoryId,
        formData.title,
        formData.content,
        courseId
      );

      if (result.success) {
        navigate(`/forum/thread/${result.data.id}`);
      } else {
        alert(result.message || 'Failed to create thread');
      }
    } catch (error) {
      console.error('Error creating thread:', error);
      alert('Failed to create thread. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (loading) {
    return (
      <div className="create-thread-loading">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="create-thread-page">
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

      <div className="create-thread-container">
        <div className="create-thread-title-section">
          <EditIcon className="pen-icon" size={32} />
          <h1>Start a New Discussion</h1>
          <p>Share your thoughts, ask questions, or start a conversation with the community</p>
        </div>

        <form onSubmit={handleSubmit} className="create-thread-form">
          <div className="form-group">
            <label htmlFor="categoryId">Category *</label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className={errors.categoryId ? 'error' : ''}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
              <optgroup label="Courses">
                {courses.map(course => (
                  <option key={`course-${course.id}`} value={`course-${course.id}`}>
                    {course.name}
                  </option>
                ))}
              </optgroup>
            </select>
            {errors.categoryId && <span className="error-message">{errors.categoryId}</span>}
            <small className="field-hint">
              Select a forum category or course
            </small>
          </div>

          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a descriptive title for your discussion..."
              maxLength={200}
              className={errors.title ? 'error' : ''}
            />
            <div className="input-meta">
              <span className="char-count">{formData.title.length}/200</span>
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content">Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Share your thoughts, ask questions, or provide details about your discussion topic..."
              rows={12}
              className={errors.content ? 'error' : ''}
            />
            {errors.content && <span className="error-message">{errors.content}</span>}
            <div className="content-tips">
              <h4>Tips for a great discussion:</h4>
              <ul>
                <li>Be clear and specific in your title</li>
                <li>Provide context and details in your content</li>
                <li>Be respectful and constructive</li>
                <li>Use proper formatting for readability</li>
              </ul>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/forum')}
              className="cancel-btn"
              disabled={submitting}
            >
              <CloseIcon size={16} /> Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting}
            >
              {submitting ? 'Creating...' : 'Create Thread'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateThread;
