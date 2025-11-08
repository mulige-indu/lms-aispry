import { API_BASE_URL } from '../config';

const forumService = {
  // Categories
  getAllCategories: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/categories`);
      return await response.json();
    } catch (error) {
      console.error('Get categories error:', error);
      return { success: false, message: 'Failed to fetch categories' };
    }
  },

  // Threads
  getAllThreads: async (page = 1, limit = 20, sort = 'recent', search = '', filter = 'all', categoryId = '') => {
    try {
      const params = new URLSearchParams({ page, limit, sort, search, filter, categoryId });
      const response = await fetch(`${API_BASE_URL}/forum/threads?${params}`);
      return await response.json();
    } catch (error) {
      console.error('Get threads error:', error);
      return { success: false, message: 'Failed to fetch threads' };
    }
  },

  getThreadsByCategory: async (categoryId, page = 1, limit = 20, sort = 'recent') => {
    try {
      const params = new URLSearchParams({ page, limit, sort });
      const response = await fetch(`${API_BASE_URL}/forum/category/${categoryId}?${params}`);
      return await response.json();
    } catch (error) {
      console.error('Get category threads error:', error);
      return { success: false, message: 'Failed to fetch threads' };
    }
  },

  getThread: async (threadId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/thread/${threadId}`);
      return await response.json();
    } catch (error) {
      console.error('Get thread error:', error);
      return { success: false, message: 'Failed to fetch thread' };
    }
  },

  createThread: async (userId, categoryId, title, content, courseId = null, questionType = 'general', attachmentUrl = null, attachmentName = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/thread`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, categoryId, courseId, title, content, questionType, attachmentUrl, attachmentName })
      });
      return await response.json();
    } catch (error) {
      console.error('Create thread error:', error);
      return { success: false, message: 'Failed to create thread' };
    }
  },

  // Posts
  createPost: async (userId, threadId, content, parentPostId = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, threadId, content, parentPostId })
      });
      return await response.json();
    } catch (error) {
      console.error('Create post error:', error);
      return { success: false, message: 'Failed to create post' };
    }
  },

  updatePost: async (postId, userId, content) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/post/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, content })
      });
      return await response.json();
    } catch (error) {
      console.error('Update post error:', error);
      return { success: false, message: 'Failed to update post' };
    }
  },

  deletePost: async (postId, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      return await response.json();
    } catch (error) {
      console.error('Delete post error:', error);
      return { success: false, message: 'Failed to delete post' };
    }
  },

  // Likes
  likeThread: async (threadId, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/thread/${threadId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      return await response.json();
    } catch (error) {
      console.error('Like thread error:', error);
      return { success: false, message: 'Failed to like thread' };
    }
  },

  likePost: async (postId, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/post/${postId}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      return await response.json();
    } catch (error) {
      console.error('Like post error:', error);
      return { success: false, message: 'Failed to like post' };
    }
  },

  // Bookmarks
  bookmarkThread: async (threadId, userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/thread/${threadId}/bookmark`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId })
      });
      return await response.json();
    } catch (error) {
      console.error('Bookmark thread error:', error);
      return { success: false, message: 'Failed to bookmark thread' };
    }
  },

  getUserBookmarks: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/user/${userId}/bookmarks`);
      return await response.json();
    } catch (error) {
      console.error('Get bookmarks error:', error);
      return { success: false, message: 'Failed to fetch bookmarks' };
    }
  },

  // User Activity
  getUserActivity: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/forum/user/${userId}/activity`);
      return await response.json();
    } catch (error) {
      console.error('Get user activity error:', error);
      return { success: false, message: 'Failed to fetch user activity' };
    }
  }
};

export default forumService;
