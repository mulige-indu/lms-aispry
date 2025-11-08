# Forum Filters - Complete Guide

## 📊 Unified Filter System

The Discussion Forum now has a **unified, organized filter system** that combines all filtering and sorting options in one clear section.

---

## 🎯 Filter Structure

### **Row 1: Status & Sorting**

#### **Filter by Status** (Left Side)
Control which questions you see based on their answer status:

| Filter | Icon | Meaning | Shows |
|--------|------|---------|-------|
| **Latest** | 🕐 | All recent questions | All approved questions regardless of answer status |
| **Unanswered** | ❓ | Need help | Questions that have zero replies - great for helping others! |
| **Pending** | ⏳ | Awaiting review | Questions waiting for moderator approval (admin only) |

#### **Sort by** (Right Side)
Order the filtered results:

| Sort Option | Icon | Meaning | Orders By |
|-------------|------|---------|-----------|
| **Recent** | 🕐 | Most recently active | Questions with newest activity (posts/replies) at top |
| **Popular** | 🔥 | Most viewed | Questions with highest view count - trending topics |
| **Most Discussed** | 💬 | Most replies | Questions with most replies - hot discussions |

---

### **Row 2: Category Filter**

Filter questions by topic/subject area:

| Category | Purpose |
|----------|---------|
| **All Categories** | View all questions from every category |
| **General Discussion** | General topics and announcements |
| **Course Help** | Get help with course materials and assignments |
| **Technical Questions** | Programming and technical problem solving |
| **Career Guidance** | Career advice and job opportunities |
| **Project Showcase** | Share projects and get feedback |
| **Alumni Network** | Connect with fellow alumni |

---

### **Row 3: Search**

Search across all questions by title or content keywords.

---

## 💡 Understanding the Difference

### **Status Filters vs Sort Options**

People often confuse these, so here's the clear distinction:

#### **Status Filters** = WHAT questions to show
- **Filters the dataset**
- Includes/excludes questions based on criteria
- Changes which questions appear

**Examples:**
- "Latest" = Show all questions ✅
- "Unanswered" = Only show questions with 0 replies ✅
- "Pending" = Only show questions awaiting approval ✅

#### **Sort Options** = HOW to order those questions
- **Orders the results**
- Doesn't change which questions appear
- Only changes the display order

**Examples:**
- "Recent" = Order by newest activity first
- "Popular" = Order by view count descending
- "Most Discussed" = Order by reply count descending

---

## 🎨 Visual Design

### Layout Structure

```
┌─────────────────────────────────────────────────┐
│  Discussion Forum Header + Ask Question Button  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Unified Filter Section                         │
│                                                  │
│  ┌──────────────────┬───────────────────────┐  │
│  │ Filter by Status │ Sort by               │  │
│  ├──────────────────┼───────────────────────┤  │
│  │ [Latest]         │ [Recent]              │  │
│  │ [Unanswered]     │ [Popular]             │  │
│  │ [Pending]        │ [Most Discussed]      │  │
│  └──────────────────┴───────────────────────┘  │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ 📂 Category:                            │   │
│  ├─────────────────────────────────────────┤   │
│  │ [All] [General] [Course Help] [Tech]... │   │
│  └─────────────────────────────────────────┘   │
│                                                  │
│  ┌─────────────────────────────────────────┐   │
│  │ 🔍 Search questions...                  │   │
│  └─────────────────────────────────────────┘   │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  Questions List                                  │
│  [Question cards displayed here...]              │
└─────────────────────────────────────────────────┘
```

---

## 📱 How It Works

### Example Use Cases

#### **Scenario 1: I want to help answer questions**
1. Click **"Unanswered"** (Status Filter)
2. Select your expertise category (e.g., "Technical Questions")
3. Sort by **"Recent"** to help with newest questions
4. Start answering! 🎯

#### **Scenario 2: I want to see trending topics**
1. Click **"Latest"** (Status Filter) - show all questions
2. Keep **"All Categories"** selected
3. Sort by **"Popular"** to see most viewed
4. Browse trending discussions! 🔥

#### **Scenario 3: I'm looking for active discussions**
1. Click **"Latest"** (Status Filter)
2. Select a specific category of interest
3. Sort by **"Most Discussed"** to find hot topics
4. Join the conversation! 💬

#### **Scenario 4: I want to find specific content**
1. Keep **"Latest"** filter (or choose status)
2. Type keywords in search box
3. Press "Search"
4. Filter by category if needed

---

## 🔄 Filter Combinations

You can combine filters for powerful searches:

| Combination | Result |
|-------------|--------|
| **Unanswered** + **Technical Questions** + **Recent** | New technical questions that need help |
| **Latest** + **All Categories** + **Popular** | Trending questions across all topics |
| **Latest** + **Career Guidance** + **Most Discussed** | Hot career discussions |
| **Unanswered** + Search "React" | Unanswered React questions |

---

## 🎯 Filter Meanings in Detail

### **Latest** (Status Filter)
- **Shows:** All approved questions
- **Hides:** Pending/rejected questions
- **Use when:** You want to browse all available questions
- **Default:** This is the default filter when you open the forum

### **Unanswered** (Status Filter)
- **Shows:** Questions with 0 replies
- **Hides:** Questions that have at least 1 reply
- **Use when:** You want to help others by answering their questions
- **Perfect for:** Active community members looking to contribute

### **Pending** (Status Filter)
- **Shows:** Questions awaiting moderator approval
- **Hides:** Approved questions
- **Use when:** You're an admin reviewing new content
- **Note:** Regular users won't see pending questions

---

### **Recent** (Sort Option)
- **Orders by:** `last_activity_at` timestamp (descending)
- **Top results:** Questions with newest posts/activity
- **Use when:** You want to see what's happening now
- **Best for:** Staying up-to-date with latest discussions

### **Popular** (Sort Option)
- **Orders by:** `view_count` (descending)
- **Top results:** Most viewed questions
- **Use when:** You want to see trending topics
- **Best for:** Finding what the community is interested in

### **Most Discussed** (Sort Option)
- **Orders by:** `reply_count` (descending)
- **Top results:** Questions with most replies
- **Use when:** You want active, ongoing discussions
- **Best for:** Joining conversations and debates

---

## 🎨 Visual Indicators

### Active Filter/Sort
- **Gradient blue background** with white text
- **Shadow effect** for depth
- **Icon** + Text label
- **Tooltip** on hover

### Inactive Filter/Sort
- **Light gray background**
- **Dark gray text**
- **Hover effect** - lifts slightly
- **Border** shows on hover

### Category Pills
- **Custom colors** per category
- **Filled** when active
- **Outlined** when inactive
- **Smooth transitions**

---

## 💻 Technical Implementation

### State Management

```javascript
const [activeFilter, setActiveFilter] = useState('latest');
const [sortBy, setSortBy] = useState('recent');
const [selectedCategory, setSelectedCategory] = useState('');
const [searchQuery, setSearchQuery] = useState('');
```

### API Call

```javascript
const result = await forumService.getAllThreads(
  1,                    // page
  20,                   // limit
  sortBy,              // 'recent', 'popular', or 'replies'
  searchQuery,         // search term
  activeFilter,        // 'latest', 'unanswered', or 'pending'
  selectedCategory     // category ID or ''
);
```

### Backend Query

```sql
SELECT t.*, s.firstName, s.lastName, c.name as category_name,
  COUNT(p.id) as reply_count
FROM forum_threads t
WHERE t.status = 'approved'           -- Latest filter
  AND t.is_answered = FALSE           -- Unanswered filter (optional)
  AND t.category_id = ?               -- Category filter (optional)
  AND (t.title LIKE ? OR t.content LIKE ?)  -- Search (optional)
ORDER BY t.last_activity_at DESC      -- Recent sort
  -- OR t.view_count DESC             -- Popular sort
  -- OR reply_count DESC               -- Most Discussed sort
```

---

## 🚀 Benefits of Unified Design

### **1. Clarity**
- Clear labels: "Filter by Status" vs "Sort by"
- Users immediately understand the difference
- No confusion between filtering and sorting

### **2. Organization**
- Logical grouping in rows
- Related controls together
- Clean visual hierarchy

### **3. Flexibility**
- Combine any filter + sort + category
- Powerful search capabilities
- Works on mobile with stacked layout

### **4. Performance**
- Single API call with all parameters
- Efficient backend filtering
- Fast results

### **5. User Experience**
- Tooltips explain each option
- Visual feedback on selection
- Smooth transitions
- Responsive design

---

## 📱 Mobile Experience

On mobile devices (< 768px):
- Filters stack vertically
- Each row becomes full-width
- Buttons expand to full width
- Touch-friendly spacing
- Same functionality, optimized layout

---

## 🎓 Teaching Users

### Quick Tutorial for Students

**Finding Questions:**
1. **Status** = What questions? (All, Unanswered, Pending)
2. **Sort** = In what order? (Recent, Popular, Most Discussed)
3. **Category** = Which topic? (Course Help, Technical, etc.)
4. **Search** = Find specific keywords

**Example:**
> "I want to help answer new Python questions"
> - Filter: **Unanswered** ✅
> - Sort: **Recent** ✅
> - Category: **Technical Questions** ✅
> - Search: "Python" ✅

---

## 🎯 Summary

### What Changed
- ❌ Old: Separate sections for tabs, categories, and sorting
- ✅ New: One unified filter section with clear labels

### Key Improvements
1. **Clear distinction** between filtering and sorting
2. **Organized layout** with labeled groups
3. **All controls** in one place
4. **Tooltips** for guidance
5. **Better mobile** experience
6. **Logical flow** top to bottom

### Result
Users can now quickly and intuitively:
- ✅ Filter by status (what to show)
- ✅ Sort results (how to order)
- ✅ Filter by category (which topic)
- ✅ Search content (find specific)

All in one clean, organized interface! 🎉
