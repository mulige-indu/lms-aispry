# Discussion Forum Setup Guide

## Overview
A comprehensive discussion forum has been successfully implemented for the 360DigiTMG LMS platform. This guide will help you set up and start using the forum feature.

---

## Features Implemented

### 1. **Forum Categories**
- 6 pre-configured categories:
  - General Discussion
  - Course Help
  - Technical Questions
  - Career Guidance
  - Project Showcase
  - Alumni Network

### 2. **Thread Management**
- Create new discussion threads
- View threads by category
- Sort threads by: Recent, Popular, Most Replies
- Search functionality across all threads
- Thread statistics (views, replies, likes)
- Pinned and resolved thread badges

### 3. **Posts & Replies**
- Post replies to threads
- Edit your own posts
- Delete your own posts
- Like threads and posts
- Bookmark favorite threads
- Nested reply support

### 4. **User Features**
- User activity tracking
- Personal bookmarks
- Forum badges system
- Author identification with avatars

---

## Installation Steps

### Step 1: Database Setup

1. Open your MySQL client (phpMyAdmin, MySQL Workbench, or command line)

2. Execute the forum schema file:
```bash
mysql -u root -p digitmg_360_academy < database/forum-schema.sql
```

Or manually run the SQL file located at:
```
database/forum-schema.sql
```

This will create:
- `forum_categories` table
- `forum_threads` table
- `forum_posts` table
- `forum_likes` table
- `forum_bookmarks` table
- `forum_badges` table
- Sample data with 6 categories
- Database views and triggers

### Step 2: Verify Database

After running the schema, verify the tables were created:

```sql
USE digitmg_360_academy;
SHOW TABLES;
```

You should see the new forum tables listed.

Check the categories:
```sql
SELECT * FROM forum_categories;
```

### Step 3: Start the Application

1. **Start the backend server:**
```bash
npm run backend
```
or
```bash
node server.js
```

The server will run on `http://localhost:8080`

2. **Start the frontend:**
```bash
npm run frontend
```
or
```bash
npm start
```

The frontend will run on `http://localhost:3000`

3. **Or run both concurrently:**
```bash
npm run dev
```

---

## API Endpoints

All forum endpoints are available at `http://localhost:8080/api/forum`

### Categories
- `GET /api/forum/categories` - Get all categories

### Threads
- `GET /api/forum/threads` - Get all threads (with pagination, sorting, search)
- `GET /api/forum/category/:id` - Get threads by category
- `GET /api/forum/thread/:id` - Get single thread with posts
- `POST /api/forum/thread` - Create new thread
- `POST /api/forum/thread/:id/like` - Like/unlike thread
- `POST /api/forum/thread/:id/bookmark` - Bookmark/unbookmark thread

### Posts
- `POST /api/forum/post` - Create new post/reply
- `PUT /api/forum/post/:id` - Update post
- `DELETE /api/forum/post/:id` - Delete post
- `POST /api/forum/post/:id/like` - Like/unlike post

### User Activity
- `GET /api/forum/user/:userId/activity` - Get user's threads, posts, and badges
- `GET /api/forum/user/:userId/bookmarks` - Get user's bookmarked threads

---

## Routes

The following routes have been added to the application:

| Route | Component | Description |
|-------|-----------|-------------|
| `/forum` | ForumOverview | Main forum page with categories and recent threads |
| `/forum/category/:id` | ForumOverview | Threads filtered by category |
| `/forum/thread/:threadId` | DiscussionThread | View thread with all replies |
| `/forum/create` | CreateThread | Create new discussion thread |

---

## File Structure

```
src/
├── components/
│   └── forum/
│       ├── ForumOverview.js          # Main forum page
│       ├── ForumOverview.css
│       ├── DiscussionThread.js       # Thread detail page
│       ├── DiscussionThread.css
│       ├── CreateThread.js           # New thread form
│       └── CreateThread.css
├── services/
│   └── forumService.js               # API service for forum
└── App.js                            # Routes configured

database/
└── forum-schema.sql                  # Database schema

server.js                             # Backend with forum endpoints
```

---

## Usage Guide

### For Students

#### 1. **Accessing the Forum**
- Click "Forum" in the main navigation
- You must be logged in to access the forum

#### 2. **Browsing Discussions**
- View all categories on the main forum page
- Click on a category to see relevant threads
- Use the search bar to find specific topics
- Sort threads by Recent, Popular, or Most Replies

#### 3. **Creating a Thread**
- Click "New Thread" button
- Select a category
- Enter a descriptive title (10-200 characters)
- Write your content (minimum 20 characters)
- Click "Create Thread"

#### 4. **Participating in Discussions**
- Click on any thread to view full discussion
- Read the original post and all replies
- Post your reply in the text area at the bottom
- Like threads/posts you find helpful
- Bookmark threads to save for later

#### 5. **Managing Your Posts**
- Edit your own posts using the edit button
- Delete your posts if needed
- View your activity from your profile

### For Administrators

#### 1. **Managing Categories**
To add new categories, update the database:
```sql
INSERT INTO forum_categories (name, description, icon, color, display_order)
VALUES ('New Category', 'Description here', 'FaIcon', '#color', 7);
```

#### 2. **Moderating Threads**
To pin a thread:
```sql
UPDATE forum_threads SET is_pinned = true WHERE id = ?;
```

To lock a thread:
```sql
UPDATE forum_threads SET is_locked = true WHERE id = ?;
```

To mark as resolved:
```sql
UPDATE forum_threads SET is_resolved = true WHERE id = ?;
```

#### 3. **Monitoring Activity**
View forum statistics:
```sql
-- Total threads
SELECT COUNT(*) FROM forum_threads;

-- Total posts
SELECT COUNT(*) FROM forum_posts;

-- Most active users
SELECT user_id, COUNT(*) as thread_count
FROM forum_threads
GROUP BY user_id
ORDER BY thread_count DESC
LIMIT 10;
```

---

## Testing the Forum

### Test Steps:

1. **Login to the application**
   - Go to `/login`
   - Login with your credentials

2. **Access the forum**
   - Click "Forum" in the navigation
   - You should see 6 categories

3. **Create a test thread**
   - Click "New Thread"
   - Select "General Discussion"
   - Title: "Test Discussion Thread"
   - Content: "This is a test thread to verify forum functionality"
   - Submit

4. **Interact with the thread**
   - View your newly created thread
   - Post a reply
   - Like the thread
   - Bookmark it
   - Edit your post
   - Search for your thread

---

## Customization

### Adding More Icons

To add more category icons, update the icon map in `ForumOverview.js`:

```javascript
import { FaNewIcon } from 'react-icons/fa';

const iconMap = {
  FaComments, FaQuestionCircle, FaCode,
  FaBriefcase, FaLightbulb, FaUsers,
  FaNewIcon  // Add your new icon here
};
```

### Changing Colors

Category colors are defined in the database. Update them via SQL:

```sql
UPDATE forum_categories
SET color = '#NEW_COLOR'
WHERE id = ?;
```

### Adjusting Pagination

Change the default limit in `ForumOverview.js`:

```javascript
// Change from 20 to your preferred number
forumService.getAllThreads(1, 50, sortBy)
```

---

## Security Considerations

1. **Authentication**: All forum routes require user authentication
2. **Authorization**: Users can only edit/delete their own posts
3. **SQL Injection**: All queries use parameterized statements
4. **XSS Protection**: Content is properly escaped in React
5. **CORS**: Enabled for API access

---

## Troubleshooting

### Issue: Forum not showing
**Solution**: Ensure you're logged in. Forum requires authentication.

### Issue: Database error
**Solution**:
1. Check if MySQL is running
2. Verify database connection in `.env` file
3. Ensure forum schema was executed successfully

### Issue: Categories not loading
**Solution**: Run the forum schema SQL file to insert default categories

### Issue: Can't create threads
**Solution**:
1. Check if you're logged in
2. Verify user ID is being passed correctly
3. Check browser console for errors

### Issue: API errors
**Solution**:
1. Ensure backend server is running on port 8080
2. Check server console for error messages
3. Verify API_BASE_URL in `src/config.js`

---

## Future Enhancements

Potential features to add:

1. **Rich Text Editor** - Format posts with bold, italic, code blocks
2. **File Attachments** - Upload images and files
3. **Real-time Updates** - WebSocket for live notifications
4. **Advanced Search** - Filter by tags, date range, author
5. **Reputation System** - Points and rankings for active users
6. **Email Notifications** - Notify users of replies
7. **Moderation Tools** - Report posts, moderator dashboard
8. **Private Messaging** - Direct messages between users
9. **Thread Subscriptions** - Follow specific threads
10. **Mobile App** - Native mobile forum experience

---

## Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Check server logs in the terminal
4. Inspect browser console for frontend errors

---

## Database Schema Reference

### forum_categories
- `id` - Primary key
- `name` - Category name
- `description` - Category description
- `icon` - React icon name
- `color` - Hex color code
- `parent_id` - For subcategories (nullable)
- `display_order` - Sort order
- `is_active` - Active status
- `created_at`, `updated_at` - Timestamps

### forum_threads
- `id` - Primary key
- `category_id` - Foreign key to categories
- `user_id` - Foreign key to students
- `course_id` - Optional course association
- `title` - Thread title
- `content` - Thread content
- `is_pinned`, `is_locked`, `is_resolved` - Status flags
- `view_count`, `reply_count` - Statistics
- `last_activity_at` - Last activity timestamp
- `created_at`, `updated_at` - Timestamps

### forum_posts
- `id` - Primary key
- `thread_id` - Foreign key to threads
- `user_id` - Foreign key to students
- `parent_post_id` - For nested replies
- `content` - Post content
- `is_solution` - Marked as solution
- `is_edited` - Edit flag
- `edited_at` - Edit timestamp
- `created_at`, `updated_at` - Timestamps

### forum_likes
- `id` - Primary key
- `user_id` - Foreign key to students
- `post_id` - Foreign key to posts (nullable)
- `thread_id` - Foreign key to threads (nullable)
- `created_at` - Timestamp

### forum_bookmarks
- `id` - Primary key
- `user_id` - Foreign key to students
- `thread_id` - Foreign key to threads
- `created_at` - Timestamp

### forum_badges
- `id` - Primary key
- `user_id` - Foreign key to students
- `badge_type` - Badge type enum
- `earned_at` - Timestamp

---

## Success!

Your Discussion Forum is now ready to use! Students can now:
- Ask questions
- Share knowledge
- Connect with peers
- Get help with courses
- Showcase projects
- Network with alumni

Happy discussing! 🎉
