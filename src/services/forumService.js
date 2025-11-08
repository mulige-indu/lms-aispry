// Forum service - Frontend only with mock data

// Helper functions for localStorage
const getStorageData = (key, defaultValue = []) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
};

const setStorageData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Initialize mock data if not exists
const initializeMockData = () => {
  if (!localStorage.getItem('forum_categories')) {
    const mockCategories = [
      { categoryId: 1, name: 'General Discussion', description: 'General topics', icon: 'FaComments' },
      { categoryId: 2, name: 'Course Help', description: 'Get help with courses', icon: 'FaQuestionCircle' },
      { categoryId: 3, name: 'Technical Issues', description: 'Technical support', icon: 'FaTools' },
      { categoryId: 4, name: 'Career Advice', description: 'Career guidance', icon: 'FaBriefcase' }
    ];
    setStorageData('forum_categories', mockCategories);
  }

  if (!localStorage.getItem('forum_threads')) {
    setStorageData('forum_threads', []);
  }

  if (!localStorage.getItem('forum_posts')) {
    setStorageData('forum_posts', []);
  }

  if (!localStorage.getItem('forum_likes')) {
    setStorageData('forum_likes', { threads: {}, posts: {} });
  }

  if (!localStorage.getItem('forum_bookmarks')) {
    setStorageData('forum_bookmarks', {});
  }
};

const forumService = {
  // Categories
  getAllCategories: async () => {
    try {
      initializeMockData();
      const categories = getStorageData('forum_categories');
      return { success: true, data: categories };
    } catch (error) {
      console.error('Get categories error:', error);
      return { success: false, message: 'Failed to fetch categories' };
    }
  },

  // Threads
  getAllThreads: async (page = 1, limit = 20, sort = 'recent', search = '', filter = 'all', categoryId = '') => {
    try {
      initializeMockData();
      let threads = getStorageData('forum_threads');

      // Filter by category
      if (categoryId) {
        threads = threads.filter(t => t.categoryId == categoryId);
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        threads = threads.filter(t =>
          t.title.toLowerCase().includes(searchLower) ||
          t.content.toLowerCase().includes(searchLower)
        );
      }

      // Sort
      if (sort === 'recent') {
        threads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sort === 'popular') {
        threads.sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0));
      }

      // Pagination
      const startIndex = (page - 1) * limit;
      const paginatedThreads = threads.slice(startIndex, startIndex + limit);

      return {
        success: true,
        data: {
          threads: paginatedThreads,
          totalPages: Math.ceil(threads.length / limit),
          currentPage: page,
          totalThreads: threads.length
        }
      };
    } catch (error) {
      console.error('Get threads error:', error);
      return { success: false, message: 'Failed to fetch threads' };
    }
  },

  getThreadsByCategory: async (categoryId, page = 1, limit = 20, sort = 'recent') => {
    return forumService.getAllThreads(page, limit, sort, '', 'all', categoryId);
  },

  getThread: async (threadId) => {
    try {
      initializeMockData();
      const threads = getStorageData('forum_threads');
      const thread = threads.find(t => t.threadId == threadId);

      if (!thread) {
        return { success: false, message: 'Thread not found' };
      }

      // Get posts for this thread
      const posts = getStorageData('forum_posts').filter(p => p.threadId == threadId);

      return {
        success: true,
        data: {
          thread: thread,
          posts: posts
        }
      };
    } catch (error) {
      console.error('Get thread error:', error);
      return { success: false, message: 'Failed to fetch thread' };
    }
  },

  createThread: async (userId, categoryId, title, content, courseId = null, questionType = 'general', attachmentUrl = null, attachmentName = null) => {
    try {
      initializeMockData();
      const threads = getStorageData('forum_threads');

      const newThread = {
        threadId: Date.now(),
        userId: userId,
        categoryId: categoryId,
        courseId: courseId,
        title: title,
        content: content,
        questionType: questionType,
        attachmentUrl: attachmentUrl,
        attachmentName: attachmentName,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likesCount: 0,
        postsCount: 0,
        viewsCount: 0
      };

      threads.push(newThread);
      setStorageData('forum_threads', threads);

      return {
        success: true,
        data: newThread,
        message: 'Thread created successfully'
      };
    } catch (error) {
      console.error('Create thread error:', error);
      return { success: false, message: 'Failed to create thread' };
    }
  },

  // Posts
  createPost: async (userId, threadId, content, parentPostId = null) => {
    try {
      initializeMockData();
      const posts = getStorageData('forum_posts');
      const threads = getStorageData('forum_threads');

      const newPost = {
        postId: Date.now(),
        threadId: threadId,
        userId: userId,
        content: content,
        parentPostId: parentPostId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likesCount: 0
      };

      posts.push(newPost);
      setStorageData('forum_posts', posts);

      // Update thread post count
      const thread = threads.find(t => t.threadId == threadId);
      if (thread) {
        thread.postsCount = (thread.postsCount || 0) + 1;
        setStorageData('forum_threads', threads);
      }

      return {
        success: true,
        data: newPost,
        message: 'Post created successfully'
      };
    } catch (error) {
      console.error('Create post error:', error);
      return { success: false, message: 'Failed to create post' };
    }
  },

  updatePost: async (postId, userId, content) => {
    try {
      initializeMockData();
      const posts = getStorageData('forum_posts');
      const post = posts.find(p => p.postId == postId && p.userId == userId);

      if (!post) {
        return { success: false, message: 'Post not found or unauthorized' };
      }

      post.content = content;
      post.updatedAt = new Date().toISOString();
      setStorageData('forum_posts', posts);

      return {
        success: true,
        data: post,
        message: 'Post updated successfully'
      };
    } catch (error) {
      console.error('Update post error:', error);
      return { success: false, message: 'Failed to update post' };
    }
  },

  deletePost: async (postId, userId) => {
    try {
      initializeMockData();
      const posts = getStorageData('forum_posts');
      const postIndex = posts.findIndex(p => p.postId == postId && p.userId == userId);

      if (postIndex === -1) {
        return { success: false, message: 'Post not found or unauthorized' };
      }

      const post = posts[postIndex];
      posts.splice(postIndex, 1);
      setStorageData('forum_posts', posts);

      // Update thread post count
      const threads = getStorageData('forum_threads');
      const thread = threads.find(t => t.threadId == post.threadId);
      if (thread) {
        thread.postsCount = Math.max(0, (thread.postsCount || 0) - 1);
        setStorageData('forum_threads', threads);
      }

      return {
        success: true,
        message: 'Post deleted successfully'
      };
    } catch (error) {
      console.error('Delete post error:', error);
      return { success: false, message: 'Failed to delete post' };
    }
  },

  // Likes
  likeThread: async (threadId, userId) => {
    try {
      initializeMockData();
      const likes = getStorageData('forum_likes');
      const threads = getStorageData('forum_threads');

      if (!likes.threads[threadId]) {
        likes.threads[threadId] = [];
      }

      const userLikeIndex = likes.threads[threadId].indexOf(userId);
      const thread = threads.find(t => t.threadId == threadId);

      if (userLikeIndex === -1) {
        // Add like
        likes.threads[threadId].push(userId);
        if (thread) {
          thread.likesCount = (thread.likesCount || 0) + 1;
        }
      } else {
        // Remove like
        likes.threads[threadId].splice(userLikeIndex, 1);
        if (thread) {
          thread.likesCount = Math.max(0, (thread.likesCount || 0) - 1);
        }
      }

      setStorageData('forum_likes', likes);
      setStorageData('forum_threads', threads);

      return {
        success: true,
        data: { liked: userLikeIndex === -1 },
        message: 'Like updated successfully'
      };
    } catch (error) {
      console.error('Like thread error:', error);
      return { success: false, message: 'Failed to like thread' };
    }
  },

  likePost: async (postId, userId) => {
    try {
      initializeMockData();
      const likes = getStorageData('forum_likes');
      const posts = getStorageData('forum_posts');

      if (!likes.posts[postId]) {
        likes.posts[postId] = [];
      }

      const userLikeIndex = likes.posts[postId].indexOf(userId);
      const post = posts.find(p => p.postId == postId);

      if (userLikeIndex === -1) {
        // Add like
        likes.posts[postId].push(userId);
        if (post) {
          post.likesCount = (post.likesCount || 0) + 1;
        }
      } else {
        // Remove like
        likes.posts[postId].splice(userLikeIndex, 1);
        if (post) {
          post.likesCount = Math.max(0, (post.likesCount || 0) - 1);
        }
      }

      setStorageData('forum_likes', likes);
      setStorageData('forum_posts', posts);

      return {
        success: true,
        data: { liked: userLikeIndex === -1 },
        message: 'Like updated successfully'
      };
    } catch (error) {
      console.error('Like post error:', error);
      return { success: false, message: 'Failed to like post' };
    }
  },

  // Bookmarks
  bookmarkThread: async (threadId, userId) => {
    try {
      initializeMockData();
      const bookmarks = getStorageData('forum_bookmarks');

      if (!bookmarks[userId]) {
        bookmarks[userId] = [];
      }

      const bookmarkIndex = bookmarks[userId].indexOf(threadId);

      if (bookmarkIndex === -1) {
        // Add bookmark
        bookmarks[userId].push(threadId);
      } else {
        // Remove bookmark
        bookmarks[userId].splice(bookmarkIndex, 1);
      }

      setStorageData('forum_bookmarks', bookmarks);

      return {
        success: true,
        data: { bookmarked: bookmarkIndex === -1 },
        message: 'Bookmark updated successfully'
      };
    } catch (error) {
      console.error('Bookmark thread error:', error);
      return { success: false, message: 'Failed to bookmark thread' };
    }
  },

  getUserBookmarks: async (userId) => {
    try {
      initializeMockData();
      const bookmarks = getStorageData('forum_bookmarks');
      const threads = getStorageData('forum_threads');

      const userBookmarkIds = bookmarks[userId] || [];
      const bookmarkedThreads = threads.filter(t => userBookmarkIds.includes(t.threadId));

      return {
        success: true,
        data: bookmarkedThreads
      };
    } catch (error) {
      console.error('Get bookmarks error:', error);
      return { success: false, message: 'Failed to fetch bookmarks' };
    }
  },

  // User Activity
  getUserActivity: async (userId) => {
    try {
      initializeMockData();
      const threads = getStorageData('forum_threads').filter(t => t.userId == userId);
      const posts = getStorageData('forum_posts').filter(p => p.userId == userId);

      return {
        success: true,
        data: {
          threads: threads,
          posts: posts,
          threadsCount: threads.length,
          postsCount: posts.length
        }
      };
    } catch (error) {
      console.error('Get user activity error:', error);
      return { success: false, message: 'Failed to fetch user activity' };
    }
  }
};

export default forumService;
