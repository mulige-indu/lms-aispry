# Enhanced Discussion Forum Setup Guide

## New Features Added ✨

### 1. **Filter Tabs**
- **Latest** - View most recent questions
- **Unanswered** - Questions without replies
- **Pending Approval** - Questions awaiting moderation (admin view)

### 2. **Category Filtering**
- Filter questions by specific categories
- Visual category chips with custom colors
- "All Categories" option to view everything

### 3. **Question Types**
- **General** - General discussions and questions
- **Doubt** - Clarification on specific topics
- **Interview** - Interview preparation questions

### 4. **File Attachments**
- Upload images, PDFs, text files, or ZIP files
- Maximum file size: 10MB
- Image preview functionality
- Supported formats: JPG, PNG, GIF, PDF, TXT, ZIP

### 5. **Enhanced Question Display**
- Question type badges (color-coded)
- Attachment indicators
- Better visual hierarchy
- Improved statistics display

---

## Setup Instructions

### Step 1: Update Database Schema

Run the new schema update file to add enhanced fields:

```bash
mysql -u root -p digitmg_360_academy < database/forum-schema-update.sql
```

Or execute manually:

```sql
USE digitmg_360_academy;

-- Add new columns
ALTER TABLE forum_threads
ADD COLUMN question_type ENUM('interview', 'general', 'doubt') DEFAULT 'general' AFTER content,
ADD COLUMN attachment_url VARCHAR(500) DEFAULT NULL AFTER question_type,
ADD COLUMN attachment_name VARCHAR(255) DEFAULT NULL AFTER attachment_url,
ADD COLUMN status ENUM('approved', 'pending', 'rejected') DEFAULT 'approved' AFTER attachment_name,
ADD COLUMN is_answered BOOLEAN DEFAULT FALSE AFTER status;

-- Add indexes
ALTER TABLE forum_threads
ADD INDEX idx_question_type (question_type),
ADD INDEX idx_status (status),
ADD INDEX idx_is_answered (is_answered);
```

### Step 2: Verify Backend Updates

The backend API has been updated to support:
- Question type filtering
- Status-based filtering (pending/approved)
- Unanswered questions filtering
- Category-based filtering
- File attachment metadata

No additional backend setup needed - changes are already in `server.js`.

### Step 3: Restart Application

```bash
# Stop the current server (Ctrl+C)

# Start again
npm run dev
```

---

## New Features Guide

### For Students

#### 1. **Filtering Questions**

**By Status:**
- Click "Latest" to see all recent questions
- Click "Unanswered" to find questions needing help
- Questions are auto-approved by default

**By Category:**
- Click any category chip to filter
- Click "All Categories" to reset filter
- Categories show custom colors

#### 2. **Asking a Question**

**Step-by-Step:**

1. **Click "Ask Question"** button

2. **Enter Your Question** (10-200 characters)
   - Be clear and specific
   - Use descriptive titles

3. **Select Category**
   - General Discussion
   - Course Help
   - Technical Questions
   - Career Guidance
   - Project Showcase
   - Alumni Network

4. **Choose Question Type**
   - **General** 💬 - Discussions, tips, recommendations
   - **Doubt** ❓ - Need clarification or problem-solving help
   - **Interview** 👔 - Interview preparation and practice

5. **Write Detailed Description** (minimum 20 characters)
   - Explain your problem clearly
   - Include what you've tried
   - Add error messages if relevant
   - Provide context

6. **Attach File** (Optional)
   - Click "Attach File" area
   - Select file (max 10MB)
   - Supported: Images, PDFs, text files, ZIP
   - Preview images before submitting

7. **Submit Question**

#### 3. **Visual Indicators**

Questions now display:
- **Category Badge** - Colored chip showing category
- **Type Badge** - Interview/General/Doubt indicator
- **Attachment Icon** 📎 - Shows if file is attached
- **Pinned Badge** 📌 - Important threads
- **Resolved Badge** ✓ - Questions with solutions

---

## API Updates

### Enhanced Endpoints

#### Get Threads with Filters
```
GET /api/forum/threads?filter=unanswered&categoryId=2&questionType=interview
```

**Query Parameters:**
- `filter` - 'all', 'unanswered', 'pending'
- `categoryId` - Filter by specific category
- `search` - Search term
- `sort` - 'recent', 'popular', 'replies'
- `page` - Page number
- `limit` - Results per page

#### Create Thread with Attachments
```javascript
POST /api/forum/thread
{
  "userId": 1,
  "categoryId": 2,
  "title": "How to deploy React app?",
  "content": "Detailed question here...",
  "questionType": "general",
  "attachmentUrl": "/uploads/screenshot.png",
  "attachmentName": "screenshot.png"
}
```

---

## Database Schema Changes

### New Columns in `forum_threads`:

| Column | Type | Description |
|--------|------|-------------|
| `question_type` | ENUM | 'interview', 'general', 'doubt' |
| `attachment_url` | VARCHAR(500) | File storage path/URL |
| `attachment_name` | VARCHAR(255) | Original filename |
| `status` | ENUM | 'approved', 'pending', 'rejected' |
| `is_answered` | BOOLEAN | Has received replies |

---

## File Upload Configuration

### Current Implementation

Files are currently handled client-side with metadata stored in database.

**For Production:** You should integrate with a cloud storage service:

### Option 1: AWS S3 Integration

```bash
npm install aws-sdk multer multer-s3
```

```javascript
// Add to server.js
const multer = require('multer');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-bucket-name',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + '-' + file.originalname);
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB
});

// Add upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    url: req.file.location,
    name: req.file.originalname
  });
});
```

### Option 2: Local File Storage

```javascript
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    url: `/uploads/${req.file.filename}`,
    name: req.file.originalname
  });
});

// Serve uploads folder
app.use('/uploads', express.static('uploads'));
```

---

## Component Files

### New Components Created:

```
src/components/forum/
├── ForumOverviewEnhanced.js       # Enhanced main forum page
├── ForumOverviewEnhanced.css
├── CreateThreadEnhanced.js        # Enhanced question form
└── CreateThreadEnhanced.css
```

### Updated Files:

```
src/App.js                          # Routes updated to use enhanced components
src/services/forumService.js       # API service with new parameters
server.js                           # Backend with enhanced filtering
database/forum-schema-update.sql    # New database fields
```

---

## Usage Examples

### Example 1: Filter by Unanswered Doubt Questions in Course Help

```javascript
const result = await forumService.getAllThreads(
  1,              // page
  20,             // limit
  'recent',       // sort
  '',             // search
  'unanswered',   // filter
  '2'             // categoryId (Course Help)
);
```

### Example 2: Create Interview Question with Attachment

```javascript
const result = await forumService.createThread(
  userId,
  categoryId,
  'Common React interview questions',
  'What are the most frequently asked React interview questions?',
  null,                              // courseId
  'interview',                       // questionType
  '/uploads/notes.pdf',              // attachmentUrl
  'interview-notes.pdf'              // attachmentName
);
```

---

## Styling Customization

### Question Type Colors

Edit in `ForumOverviewEnhanced.js`:

```javascript
const getQuestionTypeLabel = (type) => {
  const labels = {
    'interview': { text: 'Interview', color: '#9B59B6' },  // Purple
    'general': { text: 'General', color: '#3498DB' },      // Blue
    'doubt': { text: 'Doubt', color: '#E94B3C' }           // Red
  };
  return labels[type] || labels['general'];
};
```

### Category Colors

Update in database:

```sql
UPDATE forum_categories
SET color = '#YOUR_COLOR'
WHERE id = ?;
```

---

## Testing Checklist

- [ ] Run database schema update
- [ ] Restart backend server
- [ ] Restart frontend application
- [ ] Test filtering by "Latest"
- [ ] Test filtering by "Unanswered"
- [ ] Test category filtering
- [ ] Create question with type "General"
- [ ] Create question with type "Doubt"
- [ ] Create question with type "Interview"
- [ ] Attach image file to question
- [ ] Attach PDF file to question
- [ ] Verify file preview works
- [ ] Remove attached file
- [ ] Search questions
- [ ] Sort by popular/replies/recent

---

## Troubleshooting

### Issue: Columns don't exist error
**Solution:** Run the database update script `forum-schema-update.sql`

### Issue: File upload not working
**Solution:**
1. Files are currently stored as metadata only
2. For production, implement actual file upload (see File Upload Configuration section)
3. Ensure file size is under 10MB
4. Check file type is supported

### Issue: Filters not working
**Solution:**
1. Check browser console for errors
2. Verify backend is running
3. Check API response in Network tab
4. Ensure database update was successful

### Issue: Categories not showing
**Solution:**
1. Verify `forum_categories` table has data
2. Check backend API `/api/forum/categories` returns data
3. Look for JavaScript errors in console

---

## Future Enhancements

Potential additions:

1. **Advanced File Upload**
   - Cloud storage integration (AWS S3, Azure Blob)
   - Multiple file attachments
   - Drag-and-drop interface

2. **Rich Text Editor**
   - Markdown support
   - Code syntax highlighting
   - Image embedding

3. **Question Templates**
   - Pre-filled formats for different question types
   - Guided question creation

4. **Moderation Dashboard**
   - Admin panel for pending approvals
   - Bulk approval actions
   - User reputation management

5. **Notifications**
   - Email notifications for replies
   - Real-time updates with WebSocket
   - Push notifications

6. **Analytics**
   - Question statistics
   - Popular topics trending
   - User engagement metrics

---

## Success! 🎉

Your Enhanced Discussion Forum is now ready with:

✅ Category and status filtering
✅ Latest/Unanswered/Pending tabs
✅ Question types (Interview/General/Doubt)
✅ File attachment support
✅ Enhanced visual design
✅ Better user experience

Students can now:
- Ask detailed questions with context
- Attach files for better explanation
- Filter questions by multiple criteria
- Find unanswered questions to help with
- Categorize their questions properly

Happy learning! 📚
