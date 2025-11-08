-- Discussion Forum Schema for DigiTMG 360 Academy LMS
-- Execute this after setup.sql

USE digitmg_360_academy;

-- Forum Categories Table
CREATE TABLE IF NOT EXISTS forum_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(20),
  parent_id INT DEFAULT NULL,
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES forum_categories(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Forum Threads Table
CREATE TABLE IF NOT EXISTS forum_threads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  user_id INT NOT NULL,
  course_id INT DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  is_resolved BOOLEAN DEFAULT FALSE,
  view_count INT DEFAULT 0,
  reply_count INT DEFAULT 0,
  last_activity_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES forum_categories(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE SET NULL,
  INDEX idx_category_activity (category_id, last_activity_at),
  INDEX idx_user_threads (user_id),
  INDEX idx_course_threads (course_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Forum Posts/Replies Table
CREATE TABLE IF NOT EXISTS forum_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  thread_id INT NOT NULL,
  user_id INT NOT NULL,
  parent_post_id INT DEFAULT NULL,
  content TEXT NOT NULL,
  is_solution BOOLEAN DEFAULT FALSE,
  is_edited BOOLEAN DEFAULT FALSE,
  edited_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
  INDEX idx_thread_posts (thread_id, created_at),
  INDEX idx_user_posts (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Forum Likes Table
CREATE TABLE IF NOT EXISTS forum_likes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  post_id INT DEFAULT NULL,
  thread_id INT DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (post_id) REFERENCES forum_posts(id) ON DELETE CASCADE,
  FOREIGN KEY (thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE,
  UNIQUE KEY unique_post_like (user_id, post_id),
  UNIQUE KEY unique_thread_like (user_id, thread_id),
  INDEX idx_post_likes (post_id),
  INDEX idx_thread_likes (thread_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Forum Bookmarks Table
CREATE TABLE IF NOT EXISTS forum_bookmarks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  thread_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (thread_id) REFERENCES forum_threads(id) ON DELETE CASCADE,
  UNIQUE KEY unique_bookmark (user_id, thread_id),
  INDEX idx_user_bookmarks (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Forum User Badges Table
CREATE TABLE IF NOT EXISTS forum_badges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  badge_type ENUM('top_contributor', 'helpful', 'problem_solver', 'active_member', 'mentor') NOT NULL,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE,
  INDEX idx_user_badges (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert Default Forum Categories
INSERT INTO forum_categories (name, description, icon, color, display_order) VALUES
('General Discussion', 'General topics and announcements', 'FaComments', '#4A90E2', 1),
('Course Help', 'Get help with course materials and assignments', 'FaQuestionCircle', '#E94B3C', 2),
('Technical Questions', 'Programming and technical problem solving', 'FaCode', '#50C878', 3),
('Career Guidance', 'Career advice and job opportunities', 'FaBriefcase', '#FF9500', 4),
('Project Showcase', 'Share your projects and get feedback', 'FaLightbulb', '#9B59B6', 5),
('Alumni Network', 'Connect with fellow alumni', 'FaUsers', '#3498DB', 6);

-- Insert Sample Thread (Optional - for testing)
INSERT INTO forum_threads (category_id, user_id, title, content, view_count) VALUES
(1, 1, 'Welcome to the Discussion Forum!', 'Welcome everyone! Feel free to ask questions, share knowledge, and connect with fellow learners. This is a space for collaboration and growth.', 0);

-- Create View for Thread List with User Info
CREATE OR REPLACE VIEW forum_threads_view AS
SELECT
  t.id,
  t.category_id,
  t.user_id,
  t.course_id,
  t.title,
  t.content,
  t.is_pinned,
  t.is_locked,
  t.is_resolved,
  t.view_count,
  t.reply_count,
  t.last_activity_at,
  t.created_at,
  t.updated_at,
  s.firstName,
  s.lastName,
  s.email,
  c.name AS category_name,
  c.color AS category_color,
  co.name AS course_name
FROM forum_threads t
JOIN students s ON t.user_id = s.id
JOIN forum_categories c ON t.category_id = c.id
LEFT JOIN courses co ON t.course_id = co.id;

-- Create View for Posts with User Info
CREATE OR REPLACE VIEW forum_posts_view AS
SELECT
  p.id,
  p.thread_id,
  p.user_id,
  p.parent_post_id,
  p.content,
  p.is_solution,
  p.is_edited,
  p.edited_at,
  p.created_at,
  p.updated_at,
  s.firstName,
  s.lastName,
  s.email,
  (SELECT COUNT(*) FROM forum_likes WHERE post_id = p.id) AS like_count
FROM forum_posts p
JOIN students s ON p.user_id = s.id;

-- Create Trigger to Update Thread Reply Count
DELIMITER $$
CREATE TRIGGER after_post_insert
AFTER INSERT ON forum_posts
FOR EACH ROW
BEGIN
  UPDATE forum_threads
  SET reply_count = reply_count + 1,
      last_activity_at = CURRENT_TIMESTAMP
  WHERE id = NEW.thread_id;
END$$

CREATE TRIGGER after_post_delete
AFTER DELETE ON forum_posts
FOR EACH ROW
BEGIN
  UPDATE forum_threads
  SET reply_count = GREATEST(reply_count - 1, 0)
  WHERE id = OLD.thread_id;
END$$
DELIMITER ;

-- Success Message
SELECT 'Forum schema created successfully!' AS status;
